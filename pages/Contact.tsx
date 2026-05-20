import React, { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Video,
} from "lucide-react";
import ScadaBar from "../components/ScadaBar";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import Modal from "../components/Modal";
import { submitLead } from "../lib/leads";
import { track } from "../lib/track";
import {
  AnimatePresence,
  MotionButton,
  MotionCard,
  Reveal,
  m,
} from "../components/Motion";
import { LEAD_INTERESTS, resolveLeadInterest } from "../lib/interests";

type Status = "idle" | "submitting" | "success" | "error";

const VALID_PREFIXES = ["412", "414", "416", "422", "424", "426"];

const Contact: React.FC = () => {
  const queryInterest = useMemo(
    () =>
      resolveLeadInterest(
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("interest")
          : null,
      ),
    [],
  );
  const [status, setStatus] = useState<Status>("idle");
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [meetingData, setMeetingData] = useState({
    name: "",
    email: "",
    date: "",
    franja: "Sin preferencia",
    notes: "",
  });

  const handleMeetingChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setMeetingData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingStatus("submitting");
    try {
      await submitLead({
        source: "meeting-request",
        name: meetingData.name,
        email: meetingData.email,
        interest: "Videollamada 15 min · evaluación",
        metadata: {
          date: meetingData.date,
          franja: meetingData.franja,
          notes: meetingData.notes,
        },
      });
      track("meeting_request", { franja: meetingData.franja });
      setMeetingStatus("success");
    } catch {
      setMeetingStatus("error");
    }
  };

  const closeMeeting = () => {
    setMeetingOpen(false);
    setTimeout(() => {
      setMeetingStatus("idle");
      setMeetingData({
        name: "",
        email: "",
        date: "",
        franja: "Sin preferencia",
        notes: "",
      });
    }, 300);
  };
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "+58 ",
    interest: queryInterest,
    message: "",
  });

  useEffect(() => {
    setFormData((prev) =>
      prev.interest === queryInterest
        ? prev
        : { ...prev, interest: queryInterest },
    );
  }, [queryInterest]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const PREFIX = "+58 ";
    let val = e.target.value;
    // Restaurar prefijo si lo borraron
    if (!val.startsWith(PREFIX)) {
      const digits = val.replace(/\D/g, "").replace(/^58/, "");
      val = PREFIX + digits;
    }
    // Auto-formato: XXX-XXX-XXXX (máx 10 dígitos locales)
    const raw = val.slice(PREFIX.length).replace(/\D/g, "").slice(0, 10);
    let formatted = PREFIX;
    if (raw.length > 0) formatted += raw.slice(0, 3);
    if (raw.length > 3) formatted += "-" + raw.slice(3, 6);
    if (raw.length > 6) formatted += "-" + raw.slice(6, 10);
    setFormData((p) => ({ ...p, phone: formatted }));
    // Validar prefijo en tiempo real tras 3 dígitos
    if (raw.length >= 3 && !VALID_PREFIXES.includes(raw.slice(0, 3))) {
      setErrors((p) => ({
        ...p,
        phone: "Prefijo inválido · válidos: 412 · 414 · 416 · 422 · 424 · 426",
      }));
    } else {
      setErrors((p) => ({ ...p, phone: "" }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Requerido";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      errs.email = "Email inválido";
    const phoneDigits = formData.phone.replace(/\D/g, "");
    const phonePrefix = phoneDigits.slice(2, 5);
    if (phoneDigits.length < 12 || !phoneDigits.startsWith("58")) {
      errs.phone = "Número incompleto · ej. +58 412-770-5451";
    } else if (!VALID_PREFIXES.includes(phonePrefix)) {
      errs.phone =
        "Prefijo inválido · válidos: 412 · 414 · 416 · 422 · 424 · 426";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    try {
      await submitLead({ ...formData, source: "contact-page" });
      track("lead_form_submit", {
        interest: formData.interest,
        source: "contact-page",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-surface-2 text-text-1 border border-DEFAULT rounded focus:border-copper focus:ring-1 focus:ring-copper/40 outline-none transition-colors placeholder:text-text-mute";
  const labelClass =
    "block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-1.5";

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Contacto · Castillo IT Systems · Barcelona, Anzoátegui"
        description="Hable directo con ingenieros de Castillo IT en Barcelona, Anzoátegui. WhatsApp +58 412-770-5451 · email · auditoría técnica gratuita."
        path="/contacto"
        keywords={[
          "contacto castillo it",
          "soporte ti anzoátegui",
          "whatsapp castillo it",
        ]}
      />
      <StructuredData
        breadcrumbs={[
          { name: "Inicio", url: "/" },
          { name: "Contacto", url: "/contacto" },
        ]}
      />
      <header className="relative bg-ink py-20 border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-50" />
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScadaBar
            label="Línea directa · ingeniería"
            leds={[{ state: "ok", blink: true }]}
            className="justify-center mb-6 reveal"
          />
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-text-1 reveal reveal-delay-100">
            Hablemos de negocios
          </h1>
          <p className="text-lg text-text-2 max-w-2xl mx-auto leading-relaxed reveal reveal-delay-200">
            Sin vendedores insistentes. Hable directamente con ingenieros que
            entienden su problema.
          </p>
        </Reveal>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <MotionCard className="bg-surface-1 border border-DEFAULT rounded-md p-8 reveal">
            <ScadaBar
              label="Solicitar auditoría · cotización"
              code="REQ · 01"
              className="mb-6 pb-4 border-b border-DEFAULT"
            />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <m.div
                  key="success"
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className="text-center py-10"
                  role="status"
                  aria-live="polite"
                >
                  <div className="inline-flex items-center justify-center size-12 rounded border border-emphasis text-scada-ok mb-4">
                    <CheckCircle2 size={24} />
                  </div>
                  <h2 className="text-xl font-semibold text-text-1 mb-2">
                    Solicitud registrada
                  </h2>
                  <p className="text-text-3 text-sm font-mono uppercase tracking-widest">
                    [●●●] Ingeniero asignado · respuesta &lt; 2 h
                  </p>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className={labelClass}>
                        Nombre completo
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "c-name-err" : undefined
                        }
                        className={inputClass}
                        placeholder="Ej. Juan Pérez"
                        required
                      />
                      {errors.name && (
                        <p
                          id="c-name-err"
                          className="text-scada-err text-xs mt-1 font-mono"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-company" className={labelClass}>
                        Empresa
                      </label>
                      <input
                        id="c-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ej. Industrias C.A."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-email" className={labelClass}>
                        Email corporativo
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "c-email-err" : undefined
                        }
                        className={inputClass}
                        placeholder="juan@empresa.com"
                        required
                      />
                      {errors.email && (
                        <p
                          id="c-email-err"
                          className="text-scada-err text-xs mt-1 font-mono"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-phone" className={labelClass}>
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "c-phone-err" : "c-phone-hint"
                        }
                        className={inputClass}
                        placeholder="+58 412-770-5451"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                      />
                      {errors.phone ? (
                        <p
                          id="c-phone-err"
                          className="text-scada-err text-xs mt-1 font-mono"
                        >
                          {errors.phone}
                        </p>
                      ) : (
                        <p
                          id="c-phone-hint"
                          className="text-text-mute text-[10px] mt-1 font-mono"
                        >
                          Movistar 414/424 · Digitel 412 · Movilnet 416/422/426
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-interest" className={labelClass}>
                      Interesado en
                    </label>
                    <select
                      id="c-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {LEAD_INTERESTS.map((interest) => (
                        <option key={interest.value} value={interest.value}>
                          {interest.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="c-message" className={labelClass}>
                      Detalles del proyecto
                    </label>
                    <textarea
                      id="c-message"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Describa brevemente su necesidad…"
                    />
                  </div>

                  <MotionButton
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="w-full bg-copper hover:bg-copper-hi text-ink font-semibold py-3 rounded disabled:opacity-40 inline-flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span className="font-mono uppercase tracking-widest text-xs">
                          Transmitiendo
                        </span>
                      </>
                    ) : (
                      "Enviar solicitud"
                    )}
                  </MotionButton>

                  {status === "error" && (
                    <p
                      className="flex items-center gap-2 text-scada-err text-xs font-mono"
                      role="alert"
                    >
                      <AlertTriangle size={14} /> Error de transmisión.
                      Reintente.
                    </p>
                  )}
                </m.form>
              )}
            </AnimatePresence>
          </MotionCard>

          <div className="space-y-6">
            <MotionCard className="bg-surface-1 border border-DEFAULT rounded-md p-8 reveal reveal-delay-100">
              <ScadaBar
                label="Información directa"
                code="HQ · 01"
                className="mb-6 pb-4 border-b border-DEFAULT"
              />
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="size-10 border border-emphasis rounded flex items-center justify-center text-copper shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-1 text-sm mb-1">
                      Oficina principal
                    </p>
                    <p className="text-text-3 text-sm leading-relaxed">
                      Av. Raúl Leoni, Urb. Fundación Barcelona, Barcelona 6001,
                      Anzoátegui.
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-mute mt-1">
                      10.1334°N · 64.6863°W
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="size-10 border border-emphasis rounded flex items-center justify-center text-copper shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-1 text-sm mb-1">
                      Teléfono
                    </p>
                    <a
                      href="tel:+584127705451"
                      className="text-text-2 font-mono tabular-nums hover:text-copper transition-colors"
                    >
                      +58 412-770-5451
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="size-10 border border-emphasis rounded flex items-center justify-center text-copper shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-1 text-sm mb-1">
                      Correo
                    </p>
                    <a
                      href="mailto:castilloitsystems@gmail.com"
                      className="text-text-2 hover:text-copper transition-colors"
                    >
                      castilloitsystems@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </MotionCard>

            <MotionCard className="bg-surface-1 border border-DEFAULT rounded-md p-8 reveal reveal-delay-200">
              <ScadaBar
                label="Agenda directa · videollamada"
                code="CAL · 02"
                leds={[
                  { state: "ok", blink: true },
                  { state: "idle" },
                  { state: "idle" },
                ]}
                className="mb-5"
              />
              <h3 className="text-lg font-semibold text-text-1 mb-2 inline-flex items-center gap-2">
                <Calendar size={18} className="text-copper" /> 15 min ·
                evaluación
              </h3>
              <p className="text-text-3 text-sm mb-5">
                ¿Prefiere agendar una videollamada para evaluar viabilidad?
                Hable con un ingeniero.
              </p>
              <MotionButton
                onClick={() => setMeetingOpen(true)}
                className="w-full border border-emphasis hover:border-copper hover:bg-surface-2 text-text-1 font-semibold py-3 rounded text-sm inline-flex items-center justify-center gap-2"
              >
                <Video size={15} className="text-copper" /> Ver disponibilidad
              </MotionButton>
            </MotionCard>
          </div>
        </div>
      </div>

      <Modal
        isOpen={meetingOpen}
        onClose={closeMeeting}
        title="Agendar videollamada · 15 min"
      >
        {meetingStatus === "success" ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center size-12 rounded border border-emphasis text-scada-ok mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="text-text-1 font-semibold mb-1">
              Solicitud recibida
            </h4>
            <p className="text-text-3 text-sm">
              Te contactamos para confirmar el enlace de Google Meet.
            </p>
          </div>
        ) : (
          <form onSubmit={handleMeetingSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={meetingData.name}
                  onChange={handleMeetingChange}
                  className={inputClass}
                  placeholder="Juan Pérez"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={meetingData.email}
                  onChange={handleMeetingChange}
                  className={inputClass}
                  placeholder="juan@empresa.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Fecha preferida</label>
                <input
                  type="date"
                  name="date"
                  value={meetingData.date}
                  onChange={handleMeetingChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Franja horaria</label>
                <select
                  name="franja"
                  value={meetingData.franja}
                  onChange={handleMeetingChange}
                  className={inputClass}
                >
                  <option>Mañana (8 am – 12 pm)</option>
                  <option>Tarde (1 pm – 6 pm)</option>
                  <option>Sin preferencia</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Notas adicionales (opcional)</label>
              <textarea
                name="notes"
                rows={3}
                value={meetingData.notes}
                onChange={handleMeetingChange}
                className={inputClass}
                placeholder="Tema específico a tratar…"
              />
            </div>
            <MotionButton
              type="submit"
              disabled={meetingStatus === "submitting"}
              className="w-full bg-copper hover:bg-copper-hi text-ink font-semibold py-3 rounded disabled:opacity-40 inline-flex items-center justify-center gap-2"
            >
              {meetingStatus === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span className="font-mono text-xs uppercase tracking-widest">
                    Enviando
                  </span>
                </>
              ) : (
                <>
                  <Video size={16} /> Solicitar videollamada
                </>
              )}
            </MotionButton>
            {meetingStatus === "error" && (
              <p
                className="flex items-center gap-2 text-scada-err text-xs font-mono"
                role="alert"
              >
                <AlertTriangle size={14} /> Error al enviar. Reintenta.
              </p>
            )}
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Contact;
