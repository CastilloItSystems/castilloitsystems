export interface ArticleSection {
  heading?: string;
  body: string;
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  category: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  relatedProduct?: 'nomisys' | 'autosys' | 'refinery' | 'gym' | 'infraestructura' | 'seguridad';
  intro: string;
  sections: ArticleSection[];
  conclusion: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'calculo-nomina-petrolera-7x7-ccp',
    title: 'Cómo calcular la nómina petrolera 7×7 bajo el CCP PDVSA',
    metaTitle: 'Cálculo nómina petrolera 7×7 CCP · Guía paso a paso · Castillo IT',
    description:
      'Guía práctica para calcular la nómina del sistema de trabajo 7×7 según el Contrato Colectivo Petrolero (CCP) PDVSA 2017-2019: salario base, primas, descansos compensatorios y prima dominical.',
    keywords: [
      'cálculo nómina 7x7',
      'sistema trabajo petrolero 7x7',
      'prima dominical ccp',
      'descanso compensatorio petrolero',
      'tabulador petrolero pdvsa',
    ],
    category: 'Nómina petrolera',
    readingTime: '8 min',
    publishedAt: '2026-04-12',
    updatedAt: '2026-05-15',
    relatedProduct: 'nomisys',
    intro:
      'El sistema de trabajo 7×7 es uno de los más usados en operaciones costa afuera y plantas remotas. Implica 7 días continuos de trabajo seguidos por 7 días de descanso. Bajo el CCP PDVSA, el cálculo requiere considerar elementos específicos que difieren del régimen 5×2 estándar.',
    sections: [
      {
        heading: 'Bases del sistema 7×7',
        body:
          'En el 7×7 cada ciclo cubre 14 días calendario. Durante los 7 días activos el trabajador presta servicio típicamente 12 horas diarias. Los 7 días siguientes son descanso compensatorio remunerado.',
        list: [
          'Total horas activas por ciclo: 84 horas (7 × 12).',
          'Días calendario por ciclo: 14.',
          'Promedio semanal estándar de referencia: 42 horas.',
          'Sobre-tiempo aparece cuando se exceden las 12 horas/día o cuando se trabaja en día programado de descanso.',
        ],
      },
      {
        heading: 'Componentes del cálculo',
        body:
          'Para una nómina mensual del trabajador 7×7 se suman los siguientes conceptos del CCP:',
        list: [
          'Salario básico mensual del tabulador petrolero correspondiente al cargo.',
          'Prima dominical: aplica a cada domingo dentro del ciclo activo.',
          'Bono nocturno: si las 12 horas cubren franja nocturna parcial o completa.',
          'Prima de campo: cuando aplica por ubicación operacional.',
          'Ayuda vacacional prorrateada.',
          'Aporte para prestaciones sociales (Art. 142 LOTTT).',
        ],
      },
      {
        heading: 'Ejemplo numérico simplificado',
        body:
          'Para un trabajador con salario básico mensual de Bs. 35.000 en sistema 7×7 con un domingo activo y 3 noches dentro del ciclo, el desglose aproximado mensual sería:',
        list: [
          'Salario base: Bs. 35.000,00',
          'Prima dominical (1 dom): ~Bs. 1.166,67',
          'Bono nocturno (3 noches × 30% del valor/hora nocturna): ~Bs. 1.260,00',
          'Ayuda vacacional prorrateada: ~Bs. 1.458,33',
          'Aporte prestaciones (5 días/mes × salario integral): ~Bs. 6.150,00',
          'Total aproximado mes: Bs. 45.035,00',
        ],
      },
      {
        heading: 'Errores comunes',
        body: 'En auditorías hemos visto repetidamente:',
        list: [
          'No aplicar prima dominical cuando el domingo cae dentro del ciclo activo.',
          'Calcular bono nocturno sobre salario básico en vez del valor hora.',
          'Omitir incidencia de prima dominical y bono nocturno en el cálculo de prestaciones.',
          'No registrar los descansos compensatorios como tiempo remunerado, generando inconsistencias con FUTPV.',
        ],
      },
    ],
    conclusion:
      'El cálculo manual del 7×7 es propenso a errores y consume días por nómina. NomiSys automatiza estos cálculos siguiendo cláusula por cláusula el CCP 2017-2019 y deja un audit log de cada operación para auditorías SUNDDE o FUTPV.',
  },
  {
    slug: 'guia-futpv-contratistas-2026',
    title: 'Guía FUTPV: régimen de contratistas petroleros 2026',
    metaTitle: 'Guía FUTPV contratistas petroleros 2026 · Castillo IT',
    description:
      'Todo lo que una empresa contratista debe saber para cumplir con FUTPV en 2026: registro, beneficios CCP aplicables, retenciones, prestaciones, reportes obligatorios.',
    keywords: [
      'futpv contratistas',
      'régimen contratistas petroleros',
      'beneficios ccp contratistas',
      'reportes futpv',
      'nómina contratista petrolero venezuela',
    ],
    category: 'Cumplimiento',
    readingTime: '10 min',
    publishedAt: '2026-04-25',
    updatedAt: '2026-05-10',
    relatedProduct: 'nomisys',
    intro:
      'Las empresas contratistas que prestan servicios al sector hidrocarburos en Venezuela operan bajo un régimen específico vinculado al Contrato Colectivo Petrolero (CCP). El cumplimiento ante FUTPV (Federación Unitaria de Trabajadores Petroleros de Venezuela) y SUNDDE es revisado activamente. Esta guía resume lo esencial.',
    sections: [
      {
        heading: '¿Qué empresas aplican como contratistas?',
        body:
          'Toda empresa que ejecute servicios para PDVSA, sus filiales o empresas mixtas del sector hidrocarburos. Incluye: ingeniería, construcción, mantenimiento, perforación, transporte de combustible, alimentación de campamentos, vigilancia operacional, taller especializado.',
      },
      {
        heading: 'Beneficios CCP aplicables al personal',
        body:
          'No todos los beneficios del CCP aplican igual al contratista. Los más relevantes son:',
        list: [
          'Tabulador petrolero (sí, salarios mínimos por cargo).',
          'Sistemas de trabajo (5×2, 7×7, 4×4, STOB) según convenio.',
          'Bono nocturno y prima dominical.',
          'Ayuda vacacional petrolera.',
          'Prestaciones según LOTTT con cláusulas CCP.',
          'Útiles escolares y bonos de regreso a clases (cuando aplique).',
          'Tiempo de viaje y traslados a sitio operacional.',
          'Primas de campo, altura, buceo, kilometraje (en operaciones específicas).',
        ],
      },
      {
        heading: 'Reportes obligatorios',
        body:
          'La contratista debe llevar registro auditable y entregable bajo requerimiento:',
        list: [
          'Nómina detallada mensual con conceptos del CCP.',
          'Registro de horas trabajadas por empleado/día.',
          'Comprobantes de pago al trabajador (firma o validación).',
          'Aportes parafiscales (FAOV, IVSS, INCES) al día.',
          'Pago de prestaciones y vacaciones en fecha.',
          'Histórico de cargos y movimientos por trabajador.',
        ],
      },
      {
        heading: 'Riesgos comunes',
        body:
          'Las multas y suspensiones de operación más frecuentes provienen de:',
        list: [
          'No aplicar el tabulador correcto al cargo.',
          'Cálculo manual con errores recurrentes en prestaciones.',
          'Atrasos en pago de aportes parafiscales.',
          'Falta de soportes auditables ante FUTPV o SUNDDE.',
          'Aplicar sistema de trabajo inadecuado al puesto operacional.',
        ],
      },
    ],
    conclusion:
      'NomiSys incluye el régimen contratistas completo bajo CCP/FUTPV. Cada cálculo deja un audit log y los reportes obligatorios se generan en un click. Si tu operación maneja más de 30 empleados contratistas, el ROI del sistema es típicamente menor a 3 meses.',
  },
  {
    slug: 'comparativa-software-talleres-venezuela',
    title: 'Comparativa: software para talleres mecánicos en Venezuela',
    metaTitle: 'Comparativa software talleres mecánicos Venezuela 2026 · Castillo IT',
    description:
      'Análisis honesto de las opciones para gestionar un taller mecánico en Venezuela: Excel manual, sistemas genéricos importados y software local. Criterios reales de decisión.',
    keywords: [
      'software taller mecánico venezuela',
      'gestión taller automotriz',
      'orden de trabajo software',
      'inventario repuestos taller',
      'comparativa erp taller',
    ],
    category: 'Operaciones',
    readingTime: '7 min',
    publishedAt: '2026-05-02',
    updatedAt: '2026-05-12',
    relatedProduct: 'autosys',
    intro:
      'La decisión de qué sistema usar para un taller mecánico en Venezuela suele tomarse en frío entre tres opciones: seguir con Excel y papel, comprar un software genérico extranjero, o usar uno local. Cada una tiene tradeoffs reales que importan según la operación.',
    sections: [
      {
        heading: 'Excel + papel (la base actual de la mayoría)',
        body:
          'Pros: cero costo de licencias, todos saben usar Excel, control total del formato. Contras: cero trazabilidad, errores manuales en facturación, pérdida de inventario invisible, productividad por mecánico imposible de medir, riesgo total ante fallo de PC.',
      },
      {
        heading: 'Software genérico (típicamente importado)',
        body:
          'Pros: catálogo de features amplio, multi-usuario, reportes empaquetados. Contras: no integran impresoras fiscales SENIAT venezolanas, soporte en otro huso horario, suscripciones en dólares mensuales, customización limitada, requieren internet permanente.',
      },
      {
        heading: 'Software local (como Autosys)',
        body:
          'Pros: facturación fiscal SENIAT integrada, soporte local en español, on-premise sin dependencia de internet, customización por cláusula del cliente, ingeniero en sitio si pasa algo. Contras: catálogo de features más enfocado, no ofrece módulos genéricos que el taller no necesita.',
      },
      {
        heading: 'Criterios reales de decisión',
        body:
          'En base a 20+ implementaciones, los criterios que terminan moviendo la decisión son:',
        list: [
          '¿Tu taller maneja más de 50 vehículos/mes? El Excel deja de escalar.',
          '¿Necesitas facturar fiscal? Solo el software local cubre SENIAT sin trucos.',
          '¿Te paran si se cae internet? Si sí, exige on-premise.',
          '¿Quién te atiende cuando falla algo? El SLA local en sitio < 2 h es de Castillo IT.',
          '¿Cuánto del costo es licencia vs implementación? Las licencias mensuales suman 5-10× la implementación inicial en 3 años.',
        ],
      },
    ],
    conclusion:
      'No hay una respuesta universal. Pero si tu operación es mediana, factura fiscal y opera en Venezuela, el caso para un software local on-premise con soporte presencial es difícil de contrarrestar. Autosys está optimizado exactamente para este escenario.',
  },
  {
    slug: 'stob-sobretiempo-ccp-petrolero',
    title: 'STOB explicado: sobre-tiempo en el CCP petrolero',
    metaTitle: 'STOB · sobre-tiempo CCP petrolero · Cálculo y cumplimiento',
    description:
      'El sobre-tiempo (STOB) es uno de los conceptos más malinterpretados del CCP petrolero. Explicación clara con ejemplos numéricos y errores comunes en su cálculo.',
    keywords: [
      'stob sobre tiempo petrolero',
      'sobretiempo ccp pdvsa',
      'cálculo horas extras petroleras',
      'recargo horas extras petrolero',
      'jornada petrolera 12 horas',
    ],
    category: 'Nómina petrolera',
    readingTime: '6 min',
    publishedAt: '2026-05-05',
    updatedAt: '2026-05-14',
    relatedProduct: 'nomisys',
    intro:
      'STOB (sobre-tiempo en operaciones de planta) es el concepto que regula las horas trabajadas más allá de la jornada estándar bajo el CCP. Mal calculado, genera diferencias significativas que las inspecciones detectan rápido.',
    sections: [
      {
        heading: 'Qué cuenta como sobre-tiempo',
        body:
          'En jornada petrolera de 12 horas (sistema 7×7 o 4×4), el sobre-tiempo aplica cuando:',
        list: [
          'El trabajador excede las 12 horas continuas en un turno.',
          'Trabaja en día programado de descanso compensatorio sin autorización previa.',
          'Realiza guardia activa fuera de horario.',
          'Es llamado en su período de descanso al campamento.',
        ],
      },
      {
        heading: 'Cálculo del recargo',
        body:
          'El CCP establece recargos sobre el valor hora normal:',
        list: [
          'Sobre-tiempo diurno: 50% sobre valor hora ordinaria.',
          'Sobre-tiempo nocturno: 100% sobre valor hora ordinaria.',
          'Sobre-tiempo en día de descanso: 150% sobre valor hora.',
          'Si coincide nocturno + descanso: se acumulan recargos.',
        ],
      },
      {
        heading: 'Ejemplo',
        body:
          'Trabajador con salario hora ordinaria de Bs. 200. Trabaja 3 horas adicionales en día de descanso, todas nocturnas:',
        list: [
          'Recargo descanso: Bs. 200 × 150% = Bs. 300/h adicional',
          'Recargo nocturno: Bs. 200 × 100% = Bs. 200/h adicional',
          'Total adicional por hora: Bs. 500',
          'Pago de 3 horas STOB: 3 × (200 + 500) = Bs. 2.100',
        ],
      },
      {
        heading: 'Inciden en prestaciones',
        body:
          'El STOB regular forma parte del salario integral y debe incluirse en el cálculo de:',
        list: [
          'Prestaciones sociales (Art. 142 LOTTT).',
          'Vacaciones y ayuda vacacional.',
          'Utilidades.',
          'Aportes IVSS y FAOV cuando aplican.',
        ],
      },
    ],
    conclusion:
      'El control manual del STOB se vuelve impracticable con más de 20-30 trabajadores. NomiSys clasifica automáticamente cada hora extra por su origen (diurno, nocturno, descanso) y aplica el recargo correcto del CCP.',
  },
  {
    slug: 'cableado-estructurado-ansi-tia-anzoategui',
    title: 'Cableado estructurado ANSI/TIA: qué exigir a tu proveedor en Anzoátegui',
    metaTitle: 'Cableado estructurado ANSI/TIA Anzoátegui · Guía técnica',
    description:
      'Criterios técnicos para evaluar un proyecto de cableado estructurado bajo normas ANSI/TIA en Anzoátegui: certificación Cat6/Cat6A, fibra, racks, garantía Panduit.',
    keywords: [
      'cableado estructurado anzoátegui',
      'ansi tia 568',
      'panduit certificación',
      'cat6 cat6a fibra óptica',
      'rack peinado cableado',
    ],
    category: 'Infraestructura',
    readingTime: '7 min',
    publishedAt: '2026-04-18',
    updatedAt: '2026-05-08',
    relatedProduct: 'infraestructura',
    intro:
      'Un buen cableado dura 25 años; uno malo te genera tickets toda la vida operativa de la oficina. La diferencia está en exigir lo correcto al proveedor antes de empezar.',
    sections: [
      {
        heading: 'Norma de referencia',
        body:
          'ANSI/TIA-568 (actualmente revisión D) es el estándar internacional que define rendimiento, instalación y certificación. Cualquier proyecto serio se rige por esta norma.',
      },
      {
        heading: 'Categoría a elegir',
        body:
          'Para nuevas instalaciones en 2026 las opciones razonables son:',
        list: [
          'Cat6 UTP: 1 Gbps a 100 m. Aceptable para oficinas pequeñas si el presupuesto es ajustado.',
          'Cat6A: 10 Gbps a 100 m. La opción equilibrada para nuevas oficinas con vista de 10+ años.',
          'Fibra óptica: requerida para enlaces verticales entre pisos, troncales o distancias > 100 m.',
        ],
      },
      {
        heading: 'Certificación al cierre',
        body:
          'Exige al proveedor entregar pruebas certificadas de cada punto con equipo Fluke o equivalente:',
        list: [
          'Wire map (mapeo de pares).',
          'Longitud por par.',
          'Atenuación / Insertion loss.',
          'NEXT / Crosstalk.',
          'Return loss.',
          'Cada punto debe pasar todos los parámetros para la categoría declarada.',
        ],
      },
      {
        heading: 'Rack y peinado',
        body:
          'Estética del rack = calidad del trabajo. Un rack desordenado predice problemas a futuro:',
        list: [
          'Cables clasificados por color por VLAN o piso.',
          'Etiquetado en ambos extremos siguiendo ANSI/TIA-606.',
          'Organizadores horizontales y verticales adecuados.',
          'Pareo de cables de patch con peinado profesional.',
          'Documentación final: planos, etiquetado, lista de puntos.',
        ],
      },
      {
        heading: 'Garantía de fabricante',
        body:
          'Si el proveedor es partner certificado Panduit, Belden o equivalente puede entregar garantía de fabricante de 25 años sobre el sistema completo. Sin partner, la garantía es solo del instalador (típicamente 1-2 años).',
      },
    ],
    conclusion:
      'En Castillo IT somos partner certificado Panduit. Cada proyecto se entrega con certificación Fluke completa, documentación ANSI/TIA-606 y garantía de fabricante. Casos como Maroil Trading Torre BVC los entregamos en 5 semanas.',
  },
];

export const findArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
