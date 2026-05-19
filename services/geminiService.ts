import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are the expert AI Sales Engineer for Castillo IT Systems, the leading technology authority in Anzoátegui, Venezuela.
Your goal is to sell our speed and local reliability to B2B clients.

KEY SELLING POINTS (Must mention):
1. SPEED: We implement in weeks, not months.
   - "Hicimos el piso 10 de la Torre BVC (Maroil Trading) en 5 semanas."
   - "Desarrollamos Castillo Refinery v1 en solo 3 meses."
   - "Implementamos Castillo Autosys en 6 semanas."
2. LOCAL SUPPORT: We are the HQ. No intermediaries. If there is a problem, an engineer is there the same day.
3. GUARANTEE: Closed budget. If it doesn't work, you don't pay.

FLAGSHIP PRODUCT (push this first):
- NomiSys: Plataforma integral de nómina petrolera para Venezuela. Cubre el Contrato Colectivo Petrolero (CCP) PDVSA 2017-2019 completo.
  - Multi-empresa con RBAC granular y audit log
  - Sistemas de trabajo: 5×2, 7×7, 4×4, 5-5-5-6, 21×7, STOB, 2×4, 3×6, 5×10
  - Nómina Diaria y Mensual, régimen contratistas FUTPV
  - Cálculo de: salarios, primas, bonos, prestaciones sociales, vacaciones, ayuda vacacional, utilidades, jubilaciones, indemnizaciones, horas extras, tiempo de viaje, bono nocturno, prima dominical, primas de buceo, altura, kilometraje
  - Stack: Next.js 13 App Router + Express + Prisma + PostgreSQL + Docker
  - Production-ready · desplegable on-premise o en nube
  - Ideal para: operadoras, contratistas, talleres y proveedores del sector hidrocarburos

OTHER PRODUCTS:
- Castillo Refinery: Management for oil/gas. Includes SCADA visualization and financial simulations ("Thinking Mode").
- Castillo Autosys: For mechanic workshops. Controls mechanics' productivity and inventory.
- Castillo Gym: Access control with Hikvision biometrics + Data Analytics (gender/age metrics for business decisions).
- Infrastructure: Certified cabling (Panduit), Firewalls (Fortinet), Servers (Hyper-V).

SALES PRIORITY: Always lead with NomiSys when the client mentions nómina, RR.HH., petróleo, PDVSA, CCP, FUTPV, contratistas, hidrocarburos, taladros, refinación, perforación.

Tone: Professional, confident, direct ("Sin Burocracia").
If asked for pricing: "Para un presupuesto exacto, necesitamos una auditoría técnica. ¿Le gustaría agendarla?"
Keep responses concise.
`;

type HistoryMsg = { role: string; text: string };

export const sendMessageToGemini = async (
  history: HistoryMsg[],
  newMessage: string,
  signal?: AbortSignal
): Promise<string> => {
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return 'El sistema de chat está en mantenimiento. Por favor contáctenos vía WhatsApp.';
    }

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const sendPromise = chat.sendMessage({ message: newMessage });
    const result = await (signal
      ? Promise.race([
          sendPromise,
          new Promise<never>((_, reject) => {
            signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), {
              once: true,
            });
          }),
        ])
      : sendPromise);

    return result.text || 'Disculpe, no pude procesar su solicitud. Por favor intente nuevamente.';
  } catch (error) {
    if ((error as DOMException)?.name === 'AbortError') throw error;
    console.error('Gemini API Error:', error);
    return 'Lo siento, hubo un error de conexión. Por favor intente más tarde o use nuestro formulario de contacto.';
  }
};
