// Generated from outputs/proyectos/catalogo.json by preparar_portafolio.py.
const data = [
  {
    "id": "agencia-viajes-cpp",
    "title": "Agencia de viajes",
    "category": "Consola · 2022",
    "difficulty": "initial",
    "status": "Comprobado localmente",
    "technologies": [
      "C++",
      "Funciones",
      "Validación"
    ],
    "description": "Mis primeros pasos con menús, decisiones y cotizaciones de servicios turísticos.",
    "period": "Noviembre de 2022",
    "image": "../assets/project-art/agencia-viajes-cpp.webp?v=4fca8bd4f71b",
    "imageAlt": "Imagen referencial generada: equipaje y un avión en un aeropuerto contemporáneo.",
    "demo": null,
    "demoLabel": null,
    "localDemo": null,
    "source": "https://github.com/Juan-Coronado/agencia-viajes-cpp",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/agencia-viajes-cpp/",
    "download": "../projects/agencia-viajes-cpp/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Programa académico de 2022, corregido en octubre de 2026. Trabajo grupal; las tarifas no son precios comerciales actuales.",
      "features": [
        "Destinos, hoteles, restaurantes y coches del catálogo original.",
        "Nombres completos, rangos válidos y cálculo por días.",
        "Tarifas académicas originales; sin reservas ni cobros reales."
      ],
      "learning": [
        "Organizar decisiones en funciones y recorridos.",
        "Separar el catálogo de la interacción y validar antes de calcular."
      ],
      "changes": [
        "Corregidas las lecturas de nombres y las entradas fuera de rango.",
        "Añadidas pruebas de cotización y salida al cerrar la entrada."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Compilado con MSVC C++17. Probados cálculo, límites, entradas inválidas y fin de entrada."
    },
    "evidence": {
      "type": "console",
      "caption": "Extracto de la salida real de consola durante una prueba de cotización.",
      "text": "COTIZACION\n\nCliente: Juan Antonio Coronado Palacios\n\nServicio: Met Hotel / 3 dias\n\nTotal: S/ 966.00"
    }
  },
  {
    "id": "reservas-viajes-java",
    "title": "Reservas turísticas",
    "category": "Escritorio · 2023",
    "difficulty": "initial",
    "status": "Comprobado localmente",
    "technologies": [
      "Java",
      "Swing",
      "Archivos"
    ],
    "description": "Una interfaz de escritorio para registrar viajeros y organizar sus reservas turísticas.",
    "period": "Noviembre de 2023",
    "image": "../assets/project-art/reservas-viajes-java.webp?v=2945bdc78562",
    "imageAlt": "Imagen referencial generada: mostrador de recepción de un hotel y una tarjeta de habitación.",
    "demo": null,
    "demoLabel": null,
    "localDemo": null,
    "source": "https://github.com/Juan-Coronado/reservas-viajes-java",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/reservas-viajes-java/",
    "download": "../projects/reservas-viajes-java/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Se conserva el formulario original de 2023. El contador sustituye un precio que no tenía tarifa definida; no se inventaron importes.",
      "features": [
        "Datos del viajero, destino, origen, hotel, personas y días.",
        "Una fila por reserva y exportación del reporte.",
        "Validación de campos y guardado con reemplazo atómico."
      ],
      "learning": [
        "Modelar información con clases y trabajar con eventos Swing.",
        "Presentar colecciones y conservar datos en archivos."
      ],
      "changes": [
        "Corregido el intercambio de origen y hotel y la repetición de filas.",
        "Compatibilidad con Java 11 y errores visibles al guardar."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Compilado con Java 11. Probados modelo, validación, guardado y dos reservas distintas en la interfaz Swing real."
    },
    "evidence": {
      "type": "image",
      "caption": "Render de la interfaz Swing ejecutada con dos reservas de prueba.",
      "src": "../projects/reservas-viajes-java/captura.png"
    }
  },
  {
    "id": "inmobiliaria-poo2",
    "title": "Gestión inmobiliaria",
    "category": "Java MVC · 2024",
    "difficulty": "intermediate",
    "status": "Reconstruido y comprobado",
    "technologies": [
      "Java",
      "MVC",
      "POO"
    ],
    "description": "Propiedades, inquilinos y contratos conectados mediante reglas de negocio y una estructura MVC.",
    "period": "2024-I",
    "image": "../assets/project-art/inmobiliaria-poo2.webp?v=b337ab331f43",
    "imageAlt": "Imagen referencial generada: llaves de una vivienda en un departamento moderno.",
    "demo": null,
    "demoLabel": null,
    "localDemo": null,
    "source": "https://github.com/Juan-Coronado/inmobiliaria-poo2",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/inmobiliaria-poo2/",
    "download": "../projects/inmobiliaria-poo2/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Reconstrucción de octubre de 2026 del programa de consola mostrado en el informe de 2024-I. Registros en memoria durante la sesión.",
      "features": [
        "Registro y consulta de propiedades e inquilinos.",
        "Contratos con fechas y alquiler preciso.",
        "Relaciones válidas y rechazo de periodos superpuestos."
      ],
      "learning": [
        "Separar modelo, vista y controlador.",
        "Expresar relaciones y reglas de negocio entre objetos."
      ],
      "changes": [
        "Reconstruido desde las capturas de código del informe, sin fuentes Java independientes.",
        "Fechas con LocalDate y alquiler con BigDecimal."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Compilado y ejecutado con Java 11. Probados vínculos, periodos superpuestos, contratos consecutivos y el flujo de consola."
    },
    "evidence": {
      "type": "console",
      "caption": "Salida real de la consola al crear y consultar un contrato de prueba.",
      "text": "Opcion: 1 | propiedad 1 | inquilino 1 | 2026-01-01 a 2026-12-31 | S/ 800.00"
    }
  },
  {
    "id": "metropolitano-datos",
    "title": "Metropolitano: datos",
    "category": "Base de datos · 2024",
    "difficulty": "intermediate",
    "status": "Comprobado en SQL Server",
    "technologies": [
      "SQL Server",
      "SQL",
      "Modelado"
    ],
    "description": "El modelo relacional detrás de usuarios, tarjetas, recargas y pagos del Metropolitano.",
    "period": "2024-I",
    "image": "../assets/project-art/metropolitano-datos.webp?v=488256fcb5b0",
    "imageAlt": "Imagen referencial generada: bus articulado en una estación de transporte urbano.",
    "demo": null,
    "demoLabel": null,
    "localDemo": null,
    "source": "https://github.com/Juan-Coronado/metropolitano-datos",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/metropolitano-datos/",
    "download": "../projects/metropolitano-datos/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Datos de prueba. Se conservaron el modelo conceptual y el alcance del trabajo de 2024-I. No se hizo una prueba de carga concurrente.",
      "features": [
        "16 tablas del modelo, cinco vistas y diez procedimientos.",
        "Función de saldo y cuatro triggers.",
        "Recargas, pagos y bloqueo con integridad de saldo."
      ],
      "learning": [
        "Convertir un caso de negocio en entidades y relaciones.",
        "Utilizar SQL, restricciones y operaciones atómicas."
      ],
      "changes": [
        "Recuperado el SQL del informe y corregidos campos, claves y joins.",
        "Eliminada la doble aplicación de recargas y pagos; triggers para múltiples filas."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Ejecutado en SQL Server LocalDB 2019 aislado. Saldo comprobado: 10 + 20 + 12 − 2,50 = 39,50; rechazo de sobreconsumo y tarjeta robada."
    },
    "evidence": {
      "type": "console",
      "caption": "Resultado real de las pruebas de integración ejecutadas en SQL Server LocalDB.",
      "text": "Resultado\n\n---------\n\nSQL Server LocalDB: pruebas correctas\n\nNombre_Usuario Tipo_Tarjeta Saldo EstadoTarjeta ReporteRobo\n\n-------------- ------------ ----- ------------- -----------\n\nUsuario Normal 39.50 0 1\n\nNumeroRecargas\n\n--------------\n\n3"
    }
  },
  {
    "id": "jimport-oracle",
    "title": "JImport: migración de datos",
    "category": "Caso documentado · 2024",
    "difficulty": "advanced",
    "status": "Documentado · sin ejecutar",
    "technologies": [
      "SQL Server",
      "Oracle 19c",
      "Migración"
    ],
    "description": "Estudio de una migración del esquema Sales, desde la planificación hasta la validación de integridad.",
    "period": "2024-II",
    "image": "../assets/project-art/jimport-oracle.webp?v=b899df20da82",
    "imageAlt": "Imagen referencial generada: racks y cableado en una sala de servidores.",
    "demo": null,
    "demoLabel": null,
    "localDemo": null,
    "source": "https://github.com/Juan-Coronado/jimport-oracle",
    "sourceLabel": "Ver documentación en GitHub",
    "caseStudy": "../projects/jimport-oracle/",
    "download": "../projects/jimport-oracle/codigo.zip",
    "downloadLabel": "Descargar ficha",
    "details": {
      "summary": "Se presenta como caso documentado, no como una migración terminada. La dificultad corresponde al caso propuesto; no equivale a una ejecución comprobada.",
      "features": [
        "Caso de migración de SQL Server 2017 a Oracle 19c.",
        "Plan de inventario, respaldo, conversión y comparación.",
        "Alcance y evidencia disponible diferenciados de una ejecución real."
      ],
      "learning": [
        "Analizar compatibilidad de motores y dependencias del esquema.",
        "Definir cómo verificar integridad y preparar una recuperación."
      ],
      "changes": [
        "Preparada la ficha técnica y la secuencia de validación a partir del documento recibido."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Revisión del documento y del material recibido. No se ejecutó una migración: no se proporcionó el origen Sales y no hay entorno Oracle disponible."
    },
    "evidence": {
      "type": "document",
      "caption": "Ficha del caso documentado. No es una captura de ejecución de Oracle.",
      "text": "Revisión del documento y del material recibido. No se ejecutó una migración: no se proporcionó el origen Sales y no hay entorno Oracle disponible."
    }
  },
  {
    "id": "metropolitano-web",
    "title": "Metropolitano: mi tarjeta",
    "category": "Aplicación web · 2024",
    "difficulty": "intermediate",
    "status": "Reconstruido y comprobado",
    "technologies": [
      "C#",
      "ASP.NET MVC",
      "Razor"
    ],
    "description": "Una aplicación para consultar el saldo, solicitar una tarjeta y simular recargas desde una cuenta personal.",
    "period": "2024-II",
    "image": "../assets/project-art/metropolitano-web.webp?v=2d447aac451e",
    "imageAlt": "Imagen referencial generada: tarjeta de transporte junto a un validador de bus.",
    "demo": null,
    "demoLabel": null,
    "localDemo": "http://127.0.0.1:4323/",
    "source": "https://github.com/Juan-Coronado/metropolitano-web",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/metropolitano-web/",
    "download": "../projects/metropolitano-web/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Demostración local sin operador de transporte ni dinero real. El JSON sustituye el servicio Excel incompleto del informe; para un despliegue real necesita almacenamiento transaccional y un runtime soportado.",
      "features": [
        "Registro, acceso y cierre de sesión.",
        "Solicitud de tarjeta y recarga simulada.",
        "Reporte de pérdida o robo y bloqueo persistente."
      ],
      "learning": [
        "Conectar formularios, modelos y vistas MVC.",
        "Gestionar autenticación, validación y estados persistentes."
      ],
      "changes": [
        "Reconstruida la solución desde el PDF recibido.",
        "Persistencia JSON local, hashes de contraseña y protección antifalsificación."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Compilado con .NET 7. Probados registro, acceso, CSRF, saldo, recargas inválidas, bloqueo y persistencia. Interfaz comprobada en navegador."
    },
    "evidence": {
      "type": "image",
      "caption": "Captura real del panel después de una recarga simulada de S/25.",
      "src": "../projects/metropolitano-web/captura.jpg"
    }
  },
  {
    "id": "inventario-agricola",
    "title": "Inventario agrícola",
    "category": "Estructuras de datos · 2024",
    "difficulty": "intermediate",
    "status": "Comprobado localmente",
    "technologies": [
      "C++",
      "Listas enlazadas",
      "Persistencia"
    ],
    "description": "Registro de productos perecederos con una lista enlazada y conservación de datos entre sesiones.",
    "period": "Noviembre de 2024",
    "image": "../assets/project-art/inventario-agricola.webp?v=8a6b038d67f4",
    "imageAlt": "Imagen referencial generada: productos agrícolas en cajas de un almacén.",
    "demo": null,
    "demoLabel": null,
    "localDemo": null,
    "source": "https://github.com/Juan-Coronado/inventario-agricola",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/inventario-agricola/",
    "download": "../projects/inventario-agricola/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Conserva las funciones del programa recibido: registrar, listar, cargar y guardar. No se presentan predicciones agrícolas propuestas como si estuvieran implementadas.",
      "features": [
        "Productos con nombre, tipo, ingreso y vida útil.",
        "Listado y carga de archivos entre sesiones.",
        "Guardado atómico y rechazo de archivos incompletos."
      ],
      "learning": [
        "Gestionar nodos, punteros y memoria dinámica.",
        "Validar los datos antes de sustituir un archivo o una lista."
      ],
      "changes": [
        "Separadas las operaciones del inventario y la consola.",
        "Corregidas la liberación de memoria, las fechas y la lectura de archivos truncados."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Compilado con MSVC C++17. Probados guardado, reemplazo, recarga, nombres con espacios, fechas imposibles y archivo truncado."
    },
    "evidence": {
      "type": "console",
      "caption": "Salida real al recuperar desde disco dos productos de prueba.",
      "text": "INVENTARIO AGRICOLA\n\n1. Registrar  2. Listar  3. Guardar  4. Salir\n\nOpcion: Zanahoria | Verdura | ingreso 2026-10-19 | vida 7 dias\n\nManzana roja | Fruta | ingreso 2026-10-19 | vida 12 dias\n\n\n\nINVENTARIO AGRICOLA\n\n1. Registrar  2. Listar  3. Guardar  4. Salir\n\nOpcion: Sesion finalizada."
    }
  },
  {
    "id": "distribucion-logistica",
    "title": "Logística con autómatas",
    "category": "Teoría de computación · 2025",
    "difficulty": "intermediate",
    "status": "Comprobado localmente",
    "technologies": [
      "C++",
      "Autómatas",
      "JFLAP"
    ],
    "description": "Seguimiento de lotes desde la recepción hasta su entrega, con una pila para resolver incidencias.",
    "period": "2025-I",
    "image": "../assets/project-art/distribucion-logistica.webp?v=a9b4dd64e44c",
    "imageAlt": "Imagen referencial generada: paquetes y transportador en un almacén logístico.",
    "demo": null,
    "demoLabel": null,
    "localDemo": null,
    "source": "https://github.com/Juan-Coronado/distribucion-logistica",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/distribucion-logistica/",
    "download": "../projects/distribucion-logistica/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Trabajo académico grupal de 2025-I. Los datos permanecen en memoria durante la sesión, como en el programa recibido.",
      "features": [
        "Recepción, inspección, procesamiento, empaquetado y despacho.",
        "Pila LIFO de excepciones y reanudación del proceso.",
        "Modelo JFLAP editable del flujo principal."
      ],
      "learning": [
        "Representar procesos mediante estados y transiciones.",
        "Controlar excepciones acumuladas y su orden de resolución."
      ],
      "changes": [
        "Validación de números únicos y fechas de cada lote.",
        "Corregido el estado cuando quedan incidencias pendientes y la salida ante entradas inválidas."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Compilado y ejecutado. Probados registro único, fechas, rechazo, pila LIFO, bloqueo y un recorrido completo hasta Entregado."
    },
    "evidence": {
      "type": "console",
      "caption": "Estado real de un lote de prueba después de resolver una excepción y completar su entrega.",
      "text": "--- Lote: L001 ---\n\nMercaderia: Producto de prueba\n\nRecepcion: 2026-10-19\n\nVencimiento: 2026-10-25\n\nEstado actual: Entregado\n\nEstatus: Entregado | Excepciones activas: 0"
    }
  },
  {
    "id": "eurosky-connect",
    "title": "EuroSky Connect",
    "category": "Grafos e integración web · 2026",
    "difficulty": "advanced",
    "status": "Comprobado localmente",
    "technologies": [
      "C++",
      "JavaScript",
      "Grafos"
    ],
    "description": "Comparación de rutas aéreas con algoritmos de grafos, restricciones operativas y una interfaz web.",
    "period": "Junio de 2026",
    "image": "../assets/project-art/eurosky-connect.webp?v=9a36a842e983",
    "imageAlt": "Imagen referencial generada: avión comercial en la pista de un aeropuerto.",
    "demo": null,
    "demoLabel": null,
    "localDemo": "http://127.0.0.1:4324/",
    "source": "https://github.com/Juan-Coronado/eurosky-connect",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/eurosky-connect/",
    "download": "../projects/eurosky-connect/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Datos académicos sin tarifas comerciales en vivo. El mapa Google es opcional y no se comprobó con una clave activa. Servidor local educativo, sin autenticación de producción.",
      "features": [
        "BFS, DFS, Dijkstra, Bellman-Ford y programación dinámica.",
        "Comparación de rutas y simulación Monte Carlo.",
        "Servidor HTTP C++, datos CSV y gestión de aeronaves."
      ],
      "learning": [
        "Comparar estrategias de exploración y optimización.",
        "Integrar un motor algorítmico C++ con una interfaz web."
      ],
      "changes": [
        "Retirada la clave Maps incrustada y separada la configuración del código.",
        "Validación de entradas, POST para cambios y guardado CSV atómico."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Compilado y ejecutado en Windows. Pruebas de algoritmos y de API; resultados reales visibles en el navegador."
    },
    "evidence": {
      "type": "image",
      "caption": "Captura real de EuroSky calculando rutas con el mapa opcional sin configurar.",
      "src": "../projects/eurosky-connect/captura.jpg"
    }
  },
  {
    "id": "multimedia-hospitalaria",
    "title": "Multimedia hospitalaria",
    "category": "Estructuras avanzadas · 2026",
    "difficulty": "advanced",
    "status": "Prototipo comprobado",
    "technologies": [
      "C++17",
      "Hash y trie",
      "Árbol rojo-negro"
    ],
    "description": "Prototipo de organización y búsqueda de archivos multimedia mediante estructuras de datos propias.",
    "period": "Junio de 2026",
    "image": "../assets/project-art/multimedia-hospitalaria.webp?v=ecee27e49454",
    "imageAlt": "Imagen referencial generada: estación de revisión de imágenes y archivos médicos.",
    "demo": null,
    "demoLabel": null,
    "localDemo": null,
    "source": "https://github.com/Juan-Coronado/multimedia-hospitalaria",
    "sourceLabel": "Ver código en GitHub",
    "caseStudy": "../projects/multimedia-hospitalaria/",
    "download": "../projects/multimedia-hospitalaria/codigo.zip",
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Prototipo educativo: usar solo datos ficticios. La ofuscación original no es cifrado seguro y los binarios no se cifran. No se hicieron pruebas con millones de registros ni una validación para uso clínico.",
      "features": [
        "Registro y consulta de pacientes ficticios.",
        "Índices hash, trie y árbol rojo-negro.",
        "Copia de multimedia y persistencia del estado."
      ],
      "learning": [
        "Combinar estructuras de datos e índices relacionados.",
        "Gestionar memoria y conservar la integridad al guardar o eliminar registros."
      ],
      "changes": [
        "Eliminada la reserva inicial excesiva de memoria.",
        "Corregidos índices al eliminar, lectura de archivos corruptos y guardado atómico."
      ],
      "changesTitle": "Trabajo de recuperación",
      "verification": "Compilado con MSVC C++17. Pruebas con 300 pacientes ficticios, invariantes del árbol, PNG real, hash, trie y persistencia."
    },
    "evidence": {
      "type": "console",
      "caption": "Salida real de una sesión de prueba del prototipo, con datos ficticios.",
      "text": "=== SISTEMA MEDICO MULTIMEDIA ===\n=== SISTEMA MEDICO MULTIMEDIA ===\nIngrese DNI (8 digitos) [0 para cancelar]: >> Paciente encontrado: Paciente de prueba - Tel: 000000000\n=== SISTEMA MEDICO MULTIMEDIA ===\n>> Datos guardados exitosamente. Cerrando sistema..."
    }
  },
  {
    "id": "cargomesh",
    "title": "CargoMesh 2",
    "category": "Plataforma logística · En equipo",
    "difficulty": "advanced",
    "status": "En evolución",
    "technologies": [
      "Next.js",
      "TypeScript",
      "Three.js"
    ],
    "description": "Desarrollamos en equipo una plataforma para coordinar cargas, transportistas y operaciones, con asistencia conversacional, mapas y visualización 3D.",
    "period": "Septiembre – octubre de 2026",
    "image": "../assets/project-art/cargomesh.webp?v=2c4ad2b631ba",
    "imageAlt": "Captura real de CargoMesh: una sede logística 3D con cinco camiones en un escenario de muestra.",
    "demo": "https://cargomesh.vercel.app/",
    "demoLabel": "Visitar CargoMesh",
    "localDemo": null,
    "source": "https://github.com/Chujutak2024/cargomesh",
    "sourceLabel": "Repositorio del equipo",
    "caseStudy": "../projects/cargomesh/",
    "download": null,
    "downloadLabel": "Descargar código",
    "details": {
      "summary": "Proyecto desarrollado en grupo. Esta presentación describe el producto completo y reconoce el trabajo compartido; no atribuye todos sus componentes a una sola persona. Los modelos y animaciones 3D son referencias visuales, no GPS ni flota real. Código integrado, demostración local y despliegue publicado se verifican por separado.",
      "features": [
        "Portales Cliente y Carrier para solicitudes, ofertas, reservas y vistas de seguimiento.",
        "Backend compartido, autenticación y acceso a datos por organización.",
        "Asistente Nova, mapas de carretera e integración MCP autenticada.",
        "23 diseños visuales de camiones y 15 arquitecturas de sedes, con escenarios logísticos 3D."
      ],
      "learning": [
        "Construir un producto en equipo, integrando interfaz, servicios, datos e inteligencia artificial.",
        "Coordinar contratos, permisos y validaciones entre módulos y portales.",
        "Entregar incrementos mediante ramas, PR, pruebas y evidencia reproducible."
      ],
      "changes": [
        "Evolución de CargoMesh desde su primera versión hacia una plataforma con múltiples transportistas.",
        "Desarrollo e integración de portales, servicios comerciales, persistencia, mapas y asistencia conversacional.",
        "Catálogos 3D compartidos, escenarios de cinco camiones y continuidad de estado entre vistas.",
        "Revisión de flujos, responsive, estados de recuperación y documentación de cada entrega."
      ],
      "changesTitle": "Desarrollo en equipo",
      "verification": "Se comprobaron el repositorio público, las entregas #92, #128, #154 y #164 y los catálogos de 23 diseños de camiones y 15 sedes en la copia documentada. Los PR #154 y #164 están integrados en main; los otros corresponden a bases históricas. Las capturas son de escenarios de muestra. Los resultados de pruebas de los informes pertenecen a sus respectivas entregas; no se ejecutó una nueva batería de CargoMesh para esta ficha."
    },
    "evidence": {
      "type": "image",
      "caption": "Captura real del escenario visual de cinco camiones, del 18 de octubre de 2026. Muestra una versión histórica del catálogo; no representa vehículos ni posiciones reales.",
      "src": "../projects/cargomesh/captura.webp"
    }
  }
];
export const projectItems = data.map(project => ({...project, image: new URL(project.image, import.meta.url).href, evidence: {...project.evidence, ...(project.evidence.src ? {src: new URL(project.evidence.src, import.meta.url).href} : {})}, demo: project.demo ? new URL(project.demo, import.meta.url).href : null, caseStudy: new URL(project.caseStudy, import.meta.url).href, download: project.download ? new URL(project.download, import.meta.url).href : null}));
