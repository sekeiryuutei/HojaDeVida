// Forzar descarga robusta (y fallback) para todos los botones con .js-download
(function () {
  const buttons = [...document.querySelectorAll('.js-download')];
  if (!buttons.length) return;

  const forceDownload = async (url) => {
    const res = await fetch(url, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('No se encontró el archivo (' + res.status + ')');
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Victor_Burbano_CV.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = btn.getAttribute('href') || './assets/cv.pdf';
      try {
        await forceDownload(url);
      } catch {
        window.open(url, '_blank');
      }
    });
  });
})();

// Scroll suave
document.documentElement.style.scrollBehavior = 'smooth';

// Language switching
const translations = {
  en: {
    download: "Download PDF",
    contact: "Contact",
    projects: "Projects",
    experience: "Experience",
    badge: "Multimedia Engineer • Cali",
    subtitle: "Web Development • QA • Multimedia Design/Editing",
    "profile-title": "Professional Profile",
    "profile-text": "Multimedia Engineer and Software Developer specialized in <strong>full-stack JavaScript development and enterprise backend systems</strong>. Experienced building <strong>scalable web applications</strong> using Node.js, Express, React, Angular, and REST API architectures, with implementation of JWT-based authentication, token login systems, and ORM solutions such as Sequelize.<br><br>Professional experience includes the design and development of <strong>enterprise platforms for the energy sector (Celsia)</strong>, warehouse management systems (WMS), operational management platforms, financial systems, and educational SaaS architectures. Complementary backend experience in PHP (Yii2) and Python (Django), with relational database modeling, Docker environments, and enterprise ERP integration (Siesa).<br><br>My profile combines <strong>backend development, system architecture, API design, and enterprise process optimization</strong> — delivering robust and scalable technological solutions.",
    "knowledge-title": "Knowledge and Frameworks",
    "contact-title": "Contact",
    email: "Email",
    phone: "Phone",
    city: "City",
    "city-value": "Cali • Colombia",
    linkedin: "LinkedIn",
    github: "GitHub",
    instagram: "Instagram",
    "education-title": "Education",
    "education-1": "<strong>Multimedia Engineering</strong> — Universidad San Buenaventura Cali (2021) <a href=\"https://drive.google.com/file/d/1N53zUvtVeZSyQRtCM3n5HyFe71KOCU1t/view\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "education-2": "<strong>Industrial Electronic Maintenance</strong> — SENA (2015) <a href=\"https://drive.google.com/file/d/1Xv7XEoY41XVSQtFZG1aqArbHTIEgxP6_/view\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "education-3": "<strong>Technical Baccalaureate (Electronics)</strong> — Institución Antonio José Camacho (2015)",
    "soft-skills-title": "Soft Skills",
    "soft-1": "Clear communication and idea transmission",
    "soft-2": "Teamwork and sense of belonging",
    "soft-3": "Constant research and continuous learning",
    "soft-4": "Adaptability and problem-solving under pressure",
    "soft-5": "Leadership and effective team coordination",
    "soft-6": "Time management and project organization",
    "certifications-title": "Certifications and Courses",
    "cert-1": "Google Ads — Next U (2020) · <a href=\"https://www.credential.net/29cb036b-2101-41da-89ec-3e7151015d6b#acc.sI92fw18\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "cert-2": "IT Support — Next U (2020) · <a href=\"https://www.credential.net/253bd14a-de18-405d-8e92-7f70947f1e5c#acc.TrHBRwLs\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "cert-3": "Web Development — Next U (2020) · <a href=\"https://www.credential.net/45580786-54f1-4c8f-b5db-5fa089366025#acc.VzKkHpOJ\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "cert-4": "Diploma in Design and Construction of Multimedia Projects — USB Cali (2020) · <a href=\"https://acortar.link/OXK51R\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "cert-5": "Training in Learning Environments — SENA (2021) · <a href=\"https://acortar.link/zm6are\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "cert-6": "Project Management — Politécnico de Colombia (2023) · <a href=\"https://acortar.link/hOAvzR\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "cert-7": "Scrum Foundations Professional Certificate — CertiProf (2023) · <a href=\"https://acortar.link/tGBiKX\" target=\"_blank\" rel=\"noopener\">View certificate</a>",
    "cert-8": "Software Testing Annual Report 2025 – Contribution Certificate — AICS (2025)",
    "experience-title": "Experience",
    "job-1-title": "GRUPO MAYORISTA HERPO S.A.S. — Development Analyst / Full Stack Developer",
    "job-1-when": "June 2025 – Present | Supervisor: Jorge Idarraga – Technology Manager",
    "job-1-desc": "• Requirements analysis with business and operational teams to design enterprise software solutions.<br>• Design of relational database architectures and enterprise data models.<br>• Development of backend services using PHP (Yii2) and SQL Server.<br>• Development and integration of REST APIs for interoperability with ERP (Siesa).<br>• Implementation of inventory, logistics, and warehouse automation systems (WMS).<br>• Technical coordination and definition of software architecture best practices.<br><br><strong>Key Projects</strong><br><em>Warehouse Management & Inventory Systems (WMS)</em><br>• Automation of inventory reconciliation processes between physical stock and ERP.<br>• Development of transfer and inventory auditing systems for warehouses.<br>• Implementation of SKU logical inventory models supporting multiple barcodes per product.<br>• SQL query optimization for large operational datasets.<br><br><em>Security Management Platform</em><br>• Guard shift scheduling, assignment, and auditing.<br>• Incident and event logging with traceability reporting.<br>• Operational reports for security supervisors.",
    "job-2-title": "GSC SOLUCIONES — Full Stack Developer",
    "job-2-when": "February 2024 – September 2024 | Supervisor: Gustavo Castaño Soto",
    "job-2-desc": "• Development of web applications using JavaScript, PHP, HTML and CSS.<br>• Backend service development and REST API implementation.<br>• Database modeling and relational structure design.<br>• Development of operational systems for business processes.<br><br><strong>Key Projects</strong><br><em>Gestión de Taxis – Financial Operations Platform</em><br>• Driver accounts, operational collections, and daily payments.<br>• Savings management for drivers and daily closing/reconciliation processes.<br><br><em>Zisko – Educational SaaS Platform</em><br>• Backend architecture using Django and Django REST Framework.<br>• Multi-tenant architecture using Django Tenants.<br>• Angular frontend integration with JWT authentication.<br>• Containerized environments using Docker.",
    "job-freelance-title": "INDEPENDENT SOFTWARE DEVELOPER / FREELANCE",
    "job-freelance-when": "Various Projects | 2023 – 2024",
    "job-freelance-desc": "<strong>Key Projects</strong><br><em>GES – Service Management System</em><br>• Creation and management of service orders with technician scheduling.<br>• Automatic email notifications to clients and operators.<br>• Status monitoring and service workflow automation.",
    "job-3-title": "Movi Software SAS — Full Stack Developer / Support",
    "job-3-when": "July 2022 – October 2023 | Supervisor: Juan Camilo Cardona",
    "job-3-desc": "• Development and maintenance of enterprise web systems.<br>• Backend and frontend development for corporate platforms.<br>• Database optimization and maintenance.<br>• Production system support and incident resolution.<br><br><strong>Key Projects</strong><br><em>Celsia Energy Sector Platforms</em><br>• Frontend development using React and Angular for operational dashboards.<br>• Integration of REST APIs with backend services.<br>• Implementation of user interfaces for energy management systems.<br>• Responsive design and cross-browser compatibility.",
    "job-4-title": "Q-Extreme / Aranda — QA Test Analyst (Remote)",
    "job-4-when": "Jan 2022 – Jan 2023",
    "job-4-desc": "Automation with Selenium, multimedia design.",
    "job-5-title": "Qubilo — Multimedia Engineer",
    "job-5-when": "Mar 2021 – Jun 2021",
    "job-5-desc": "Programming of applications and multimedia design.",
    "job-6-title": "Fundación Social y Deportiva Rubiery Buitrago Ocampo — Multimedia Teacher",
    "job-6-when": "Mar 2018 – Dec 2019",
    "job-6-desc": "Multimedia teaching.",
    "projects-title": "Featured Projects",
    "project-1": "<strong>Celsi One</strong>: Enterprise application for Celsia clients using Angular and Ionic; mobile and web interfaces for business operations; integration with corporate systems.",
    "project-2": "<strong>Gestión de Consignaciones Programadas (GCP)</strong>: Full-stack application using Node.js, Express, and React; management of scheduled consignments; backend API development and frontend user interfaces.",
    "project-3": "<strong>Warehouse Management & Inventory Systems (WMS)</strong>: Automation of inventory reconciliation processes between physical stock and ERP; development of transfer and inventory auditing systems; SKU logical inventory models with multiple barcodes; SQL query optimization.",
    "project-4": "<strong>Security Management Platform</strong>: Guard shift scheduling, assignment, and auditing; incident logging with traceability; operational reports for supervisors.",
    "project-5": "<strong>Gestión de Taxis – Financial Operations Platform</strong>: Driver accounts, collections, and payments; savings management and daily reconciliation processes.",
    "project-6": "<strong>Zisko – Educational SaaS Platform</strong>: Backend with Django and DRF, multi-tenant architecture, Angular frontend with JWT, Docker containers.",
    "references-title": "References",
    "ref-1": "<strong>Ana Cilia Rincón Beltrán</strong> — SENA Instructor. Tel: 315 852 6811.",
    "ref-2": "<strong>Luis Hernando Torres Osorio</strong> — HIMA Paul Hildebrandt GmbH. <a href=\"mailto:l.torres@hima.com\">l.torres@hima.com</a>",
    footer: "© <span id=\"y\"></span> Victor Daniel Burbano Rincón · Minimal CV site.",
    "nav-profile": "Profile",
    "nav-projects": "Projects",
    "nav-experience": "Experience",
    "nav-contact": "Contact",
    "nav-cv": "CV",
    "view-cert": "View certificate"
  },
  es: {
    download: "Descargar PDF",
    contact: "Contacto",
    projects: "Proyectos",
    experience: "Experiencia",
    badge: "Ingeniero Multimedia • Cali",
    subtitle: "Desarrollo Web • QA • Diseño/Edición Multimedia",
    "profile-title": "Perfil profesional",
    "profile-text": "Ingeniero Multimedia y Desarrollador de Software especializado en desarrollo full-stack JavaScript y sistemas backend empresariales. Experiencia en la construcción de aplicaciones web escalables utilizando Node.js, Express, React, Angular y arquitecturas REST API, con implementación de autenticación basada en JWT, sistemas de login con tokens y soluciones ORM como Sequelize.<br><br>Experiencia profesional incluye el diseño y desarrollo de plataformas empresariales para el sector energético (Celsia), sistemas de gestión de almacenes (WMS), plataformas de gestión operativa, sistemas financieros y arquitecturas SaaS educativas. Experiencia complementaria en backend con PHP (Yii2) y Python (Django), modelado de bases de datos relacionales, entornos Docker y integración ERP empresarial (Siesa).<br><br>Mi perfil combina desarrollo backend, arquitectura de sistemas, diseño de APIs y optimización de procesos empresariales — entregando soluciones tecnológicas robustas y escalables.",
    "knowledge-title": "Conocimientos y Frameworks",
    "contact-title": "Contacto",
    email: "Email",
    phone: "Teléfono",
    city: "Ciudad",
    "city-value": "Cali • Colombia",
    linkedin: "LinkedIn",
    github: "GitHub",
    instagram: "Instagram",
    "education-title": "Educación",
    "education-1": "<strong>Ingeniería Multimedia</strong> — Universidad San Buenaventura Cali (2021) <a href=\"https://drive.google.com/file/d/1N53zUvtVeZSyQRtCM3n5HyFe71KOCU1t/view\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "education-2": "<strong>Mantenimiento electrónico industrial</strong> — SENA (2015) <a href=\"https://drive.google.com/file/d/1Xv7XEoY41XVSQtFZG1aqArbHTIEgxP6_/view\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "education-3": "<strong>Bachiller técnico (electrónica)</strong> — Institución Antonio José Camacho (2015)",
    "soft-skills-title": "Habilidades blandas",
    "soft-1": "Comunicación clara y transmisión de ideas",
    "soft-2": "Trabajo en equipo y sentido de pertenencia",
    "soft-3": "Investigación constante y aprendizaje continuo",
    "soft-4": "Adaptabilidad y resolución de problemas bajo presión",
    "soft-5": "Liderazgo y coordinación efectiva de equipos",
    "soft-6": "Gestión del tiempo y organización de proyectos",
    "certifications-title": "Certificaciones y cursos",
    "cert-1": "Google Ads — Next U (2020) · <a href=\"https://www.credential.net/29cb036b-2101-41da-89ec-3e7151015d6b#acc.sI92fw18\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "cert-2": "Soporte técnico de IT — Next U (2020) · <a href=\"https://www.credential.net/253bd14a-de18-405d-8e92-7f70947f1e5c#acc.TrHBRwLs\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "cert-3": "Desarrollo Web — Next U (2020) · <a href=\"https://www.credential.net/45580786-54f1-4c8f-b5db-5fa089366025#acc.VzKkHpOJ\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "cert-4": "Diplomado Diseño y Construcción de Proyectos Multimedia — USB Cali (2020) · <a href=\"https://acortar.link/OXK51R\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "cert-5": "Formación en ambientes de aprendizaje — SENA (2021) · <a href=\"https://acortar.link/zm6are\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "cert-6": "Gerencia de Proyectos — Politécnico de Colombia (2023) · <a href=\"https://acortar.link/hOAvzR\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "cert-7": "Scrum Foundations Professional Certificate — CertiProf (2023) · <a href=\"https://acortar.link/tGBiKX\" target=\"_blank\" rel=\"noopener\">Ver certificado</a>",
    "cert-8": "Software Testing Annual Report 2025 – Contribution Certificate — AICS (2025)",
    "experience-title": "Experiencia",
    "job-1-title": "GRUPO MAYORISTA HERPO S.A.S. — Analista de Desarrollo / Desarrollador Full Stack",
    "job-1-when": "Junio 2025 – Presente | Supervisor: Jorge Idarraga – Gerente de Tecnología",
    "job-1-desc": "• Análisis de requerimientos con equipos comerciales y operativos para diseñar soluciones de software empresarial.<br>• Diseño de arquitecturas de bases de datos relacionales y modelos de datos empresariales.<br>• Desarrollo de servicios backend usando PHP (Yii2) y SQL Server.<br>• Desarrollo e integración de APIs REST para interoperabilidad con ERP (Siesa).<br>• Implementación de sistemas de automatización de inventario, logística y almacenes (WMS).<br>• Coordinación técnica y definición de mejores prácticas de arquitectura de software.<br><br><strong>Proyectos Clave</strong><br><em>Sistemas de Gestión de Almacenes e Inventario (WMS)</em><br>• Automatización de procesos de conciliación de inventario entre stock físico y ERP.<br>• Desarrollo de sistemas de traslados y auditoría de inventarios para almacenes.<br>• Implementación de modelos de inventario SKU lógicos soportando múltiples códigos de barras por producto.<br>• Optimización de consultas SQL para datasets operativos grandes.<br><br><em>Plataforma de Gestión de Seguridad</em><br>• Programación de turnos de guardias, asignación y auditoría.<br>• Registro de incidentes y eventos con reportes de trazabilidad.<br>• Reportes operativos para supervisores de seguridad.",
    "job-2-title": "GSC SOLUCIONES — Desarrollador Full Stack",
    "job-2-when": "Febrero 2024 – Septiembre 2024 | Supervisor: Gustavo Castaño Soto",
    "job-2-desc": "• Desarrollo de aplicaciones web usando JavaScript, PHP, HTML y CSS.<br>• Desarrollo de servicios backend e implementación de API REST.<br>• Modelado de bases de datos y diseño de estructuras relacionales.<br>• Desarrollo de sistemas operativos para procesos empresariales.<br><br><strong>Proyectos Clave</strong><br><em>Gestión de Taxis – Plataforma de Operaciones Financieras</em><br>• Cuentas de conductores, cobros operativos y pagos diarios.<br>• Gestión de ahorros para conductores y procesos de cierre/reconciliación diarios.<br><br><em>Zisko – Plataforma SaaS Educativa</em><br>• Arquitectura backend usando Django y Django REST Framework.<br>• Arquitectura multi-tenant usando Django Tenants.<br>• Integración de frontend Angular con autenticación JWT.<br>• Entornos contenerizados usando Docker.",
    "job-freelance-title": "DESARROLLADOR DE SOFTWARE INDEPENDIENTE / FREELANCE",
    "job-freelance-when": "Proyectos Varios | 2023 – 2024",
    "job-freelance-desc": "<strong>Proyectos Clave</strong><br><em>GES – Sistema de Gestión de Servicios</em><br>• Creación y gestión de órdenes de servicio con programación de técnicos.<br>• Notificaciones automáticas por email a clientes y operadores.<br>• Monitoreo de estado y automatización de flujo de servicios.",
    "job-3-title": "Movi Software SAS — Desarrollador Full Stack / Soporte",
    "job-3-when": "Julio 2022 – Octubre 2023 | Supervisor: Juan Camilo Cardona",
    "job-3-desc": "• Desarrollo y mantenimiento de sistemas web empresariales.<br>• Desarrollo backend y frontend para plataformas corporativas.<br>• Optimización y mantenimiento de bases de datos.<br>• Soporte a sistemas en producción y resolución de incidentes.<br><br><strong>Proyectos Clave</strong><br><em>Plataformas del Sector Energético Celsia</em><br>• Desarrollo frontend usando React y Angular para dashboards operativos.<br>• Integración de APIs REST con servicios backend.<br>• Implementación de interfaces de usuario para sistemas de gestión energética.<br>• Diseño responsivo y compatibilidad cross-browser.",
    "job-4-title": "Q-Extreme / Aranda — Analista de Pruebas QA (Remoto)",
    "job-4-when": "Ene 2022 – Ene 2023",
    "job-4-desc": "Automatización con Selenium, diseño multimedia.",
    "job-5-title": "Qubilo — Ingeniero Multimedia",
    "job-5-when": "Mar 2021 – Jun 2021",
    "job-5-desc": "Programación de aplicaciones y diseño multimedia.",
    "job-6-title": "Fundación Social y Deportiva Rubiery Buitrago Ocampo — Docente de Multimedia",
    "job-6-when": "Mar 2018 – Dic 2019",
    "job-6-desc": "Docencia en multimedia.",
    "projects-title": "Proyectos destacados",
    "project-1": "<strong>Celsi One</strong>: Aplicación empresarial para clientes de Celsia usando Angular e Ionic; interfaces móviles y web para operaciones comerciales; integración con sistemas corporativos.",
    "project-2": "<strong>Gestión de Consignaciones Programadas (GCP)</strong>: Aplicación full-stack usando Node.js, Express y React; gestión de consignaciones programadas; desarrollo de API backend e interfaces de usuario frontend.",
    "project-3": "<strong>Sistemas de Gestión de Almacenes e Inventario (WMS)</strong>: Automatización de procesos de conciliación de inventario entre stock físico y ERP; desarrollo de sistemas de traslados y auditoría de inventarios; modelos de inventario SKU lógicos con múltiples códigos de barras; optimización de consultas SQL.",
    "project-4": "<strong>Plataforma de Gestión de Seguridad</strong>: Programación de turnos de guardias, asignación y auditoría; registro de incidentes con trazabilidad; reportes operativos para supervisores.",
    "project-5": "<strong>Gestión de Taxis – Plataforma de Operaciones Financieras</strong>: Cuentas de conductores, cobros y pagos; gestión de ahorros y reconciliación diaria.",
    "project-6": "<strong>Zisko – Plataforma SaaS Educativa</strong>: Backend con Django y DRF, arquitectura multi-tenant, frontend Angular con JWT, contenedores Docker.",
    "references-title": "Referencias",
    "ref-1": "<strong>Ana Cilia Rincón Beltrán</strong> — Instructora SENA. Tel: 315 852 6811.",
    "ref-2": "<strong>Luis Hernando Torres Osorio</strong> — HIMA Paul Hildebrandt GmbH. <a href=\"mailto:l.torres@hima.com\">l.torres@hima.com</a>",
    footer: "© <span id=\"y\"></span> Victor Daniel Burbano Rincón · Sitio CV minimal.",
    "nav-profile": "Perfil",
    "nav-projects": "Proyectos",
    "nav-experience": "Experiencia",
    "nav-contact": "Contacto",
    "nav-cv": "CV",
    "view-cert": "Ver certificado"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  // Update button text
  document.getElementById('lang-toggle').textContent = lang === 'en' ? 'ES' : 'EN';
  // Update title and meta
  document.title = lang === 'en' ? 'Victor Daniel Burbano Rincón — Multimedia Engineer' : 'Victor Daniel Burbano Rincón — Ingeniero Multimedia';
  document.querySelector('meta[name="description"]').content = lang === 'en' ? 'Online CV of Victor Daniel Burbano Rincón — Web Development, QA, Multimedia.' : 'CV online de Victor Daniel Burbano Rincón — Desarrollo Web, QA, Multimedia.';
  // Update PDF download link
  const downloadBtn = document.querySelector('.js-download');
  downloadBtn.href = lang === 'en' ? './assets/cv-en.pdf' : './assets/cv.pdf';
  downloadBtn.download = lang === 'en' ? 'Victor_Burbano_CV_EN.pdf' : 'Victor_Burbano_CV.pdf';
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'es' : 'en');
});

// Set initial language
setLanguage('en');

// Scrollspy del menú móvil
(function () {
  const links = [...document.querySelectorAll('.mnav-link[data-section]')];
  if (!links.length) return;
  const map = Object.fromEntries(links.map(a => [a.dataset.section, a]));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const id = e.target.id;
      if (map[id] && e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        map[id].classList.add('active');
      }
    });
  });

  // Observe sections
  document.querySelectorAll('section[id], aside[id]').forEach(section => obs.observe(section));
})();

// Año dinámico
(function () {
  const span = document.getElementById('y');
  if (span) span.textContent = new Date().getFullYear();
  const span1 = document.getElementById('m');
  if (span1) {
    const mes = new Date().toLocaleString('es-ES', {
      month: 'long'
    });
    span1.textContent = mes.charAt(0).toUpperCase() + mes.slice(1);
  }
})();