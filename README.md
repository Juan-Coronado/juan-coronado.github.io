# Portafolio de Juan Antonio Coronado Palacios

Portafolio local con una introducción animada y cuatro bloques: presentación, proyectos, tecnologías y contacto. La identidad visual conserva los tonos originales del fondo de piedra en todas las pantallas. Los controles combinan negro y rojo sangre oscuro mate, con relieve de placa, grabado discreto y tipografía fraktur. El botón principal integra un sello de cinco hojas; las categorías usan pestañas más sobrias. La foto del propietario aparece en el retrato de partículas y en Sobre mí. No necesita un framework ni dependencias del navegador.

## Ejecutar

Desde esta carpeta:

```sh
python -m http.server 4321 --bind 127.0.0.1
```

Abrir http://127.0.0.1:4321. También se puede usar `npm start` si Node está instalado. Se necesita servir la carpeta por HTTP para cargar los módulos de JavaScript.

## Personalizar

- Identidad y etiquetas: `src/content.js`.
- Tiempos, densidad y aspecto de las partículas: `src/config/motion.js`.
- Sensibilidad de la rueda y tiempos de navegación: `motion.sectionScroll` en ese mismo archivo.
- Colores y tipografía: `src/styles/theme.css`.
- Botones de grimorio y sus variantes: `src/styles/controls.css`.
- Marcas laterales por pantalla: `src/ui/section-progress.js` y `src/styles/section-progress.css`; se generan desde `content.navigation`.
- Carrusel de proyectos: `src/sections/project-showcase.js`; catálogo: `src/sections/project-catalog.js`; estilos: `src/styles/projects.css`.
- Datos de proyectos y dificultad: `../proyectos/catalogo.json`. Regenerar fichas, descargas y `src/projects.js` con `python ../proyectos/preparar_portafolio.py`. Escala y etiquetas: `content.projects.difficultyLevels`.
- Retrato de Sobre mí: `src/styles/about.css`; usa la misma foto centralizada en contenido.
- Trébol de cinco hojas: `src/ui/emblems.js` y `src/styles/emblems.css`.
- Desgaste del título: `src/styles/aged-type.css` y máscara local `assets/ink-wear.svg`.
- Catálogo agrupado: `content.technologies.categories`; presentación e interacción en `src/sections/technologies.js` y `src/styles/technologies.css`.
- Distribución responsive y fondo: `styles.css`.
- Altura y composición de pantallas: `src/styles/screens.css`.
- Contratos y límites de cada módulo: `docs/ARCHITECTURE.md`.

La navegación se genera desde `content.navigation`. Los proyectos, tecnologías y canales de contacto son listas dentro del mismo archivo de contenido. Se pueden añadir elementos sin duplicar el HTML de sus tarjetas. El detalle de cada proyecto se abre en un diálogo nativo.

Una marca dentada sustituye visualmente la barra del documento por cada pantalla. Solo la sección activa se ilumina. Las marcas son anclas accesibles y comparten el estado con el menú; rueda, teclado y lectura de secciones largas siguen funcionando. Los diálogos conservan su desplazamiento y en colores forzados se recupera la barra nativa.

Proyectos usa un carrusel manual, con flechas, contador, teclado y desplazamiento horizontal nativo. Ver todos abre un catálogo ordenado por dificultad de menor a mayor; los empates conservan el orden configurado y lo no clasificado queda al final. La tarjeta es compartida y los diálogos mantienen foco y bloqueo cuando se abre un detalle sobre el catálogo. La lista contiene diez entregas del propietario, de 2022 a 2026; el portafolio no cuenta como proyecto. El carrusel conserva el orden cronológico y el catálogo muestra primero las dificultades iniciales. Nueve entregas se ejecutaron localmente; JImport aparece como caso documentado sin migración comprobada.

La presentación identifica a Juan Antonio como estudiante de Ingeniería de Software. El catálogo refleja las herramientas que declaró utilizar o explorar en su formación y proyectos, organizadas en seis categorías. Se navega con pestañas en escritorio y un selector nativo en móvil. Las descripciones están completas y no se asignan niveles de dominio.

GitHub, LinkedIn y correo utilizan los enlaces proporcionados por el propietario. Cada canal separa nombre, propósito, descripción y destino. Los perfiles abren en otra pestaña y el correo utiliza `mailto:`. Si un canal futuro tiene `href: null`, se mostrará como pendiente sin un enlace falso.

La secuencia dura aproximadamente tres segundos y comienza al abrir la página. Se puede omitir con el botón o con Escape. La cabecera no contiene botones de pausa ni repetición, siguiendo la referencia visual solicitada. Con movimiento reducido se muestra directamente la portada estática. El efecto se suspende mientras la pestaña está oculta.

El menú permite desplazarse por la página y adapta su presentación en móvil. Las entradas directas por un ancla de contenido omiten la introducción para conservar su destino. El retrato suspende la animación al salir de pantalla y la reanuda al regresar a la portada.

Cada gesto de rueda avanza o retrocede una pantalla y se detiene; la inercia no encadena varios saltos. Flechas, AvPág/RePág y espacio permiten avanzar, Mayús+espacio retrocede, e Inicio/Fin llevan a los extremos. En móvil se usa el ajuste táctil nativo. Si una sección crece, su contenido se recorre antes de pasar a la siguiente. El diálogo conserva su desplazamiento independiente. Contacto y el pie forman la última pantalla.

## Verificar

```sh
npm test
```

Las pruebas comprueban la máscara, el presupuesto de partículas y los destinos de desplazamiento, incluidos contenido alto, límites y cambios de viewport. La interacción y la composición también requieren comprobación en el navegador.

También se comprueba la ordenación por dificultad, empates, valores desconocidos y conservación de los datos originales. La página `tests/ui-fixture.html`, servida por el mismo servidor, permite comprobar los componentes con cero, uno y cinco proyectos sintéticos. Esos datos existen exclusivamente en las pruebas y no se cargan en el portafolio.

## Recursos

- Fondo proporcionado por el usuario, mejorado y optimizado previamente a WebP. El PNG inicial se conserva como fuente y no se descarga al abrir la página.
- Foto proporcionada por Juan Antonio Coronado Palacios, codificada a WebP. La silueta se obtiene al renderizar, sin enviar la foto a servicios externos.
- UnifrakturCook Bold, autoalojada bajo SIL Open Font License. Licencia en `assets/fonts/OFL-UnifrakturCook.txt`. Se eligió por sus formas de estilo fraktur, sin copiar el logotipo de Black Clover.
- EB Garamond, autoalojada en WOFF2 para los párrafos y frases de presentación. Licencia SIL OFL en `assets/fonts/OFL-EBGaramond.txt`. Archivo latino de 44336 bytes obtenido de Google Fonts; no se consulta ese servicio al abrir la página.
- Referencia de movimiento: https://www.instagram.com/reel/Deg70vPP7q9/. Esta implementación es una adaptación propia; no se utilizó código del autor del reel.
- Referencia de estructura: https://www.instagram.com/reel/DefRJrXPpBu/. Se aplican sus bloques de presentación breve, proyectos demostrables, tecnologías y contacto.
- Portadas de proyectos: diez imágenes referenciales generadas con apariencia fotográfica mediante la herramienta integrada image_gen, optimizadas a WebP. Los originales y prompts están en `assets/project-art/`; no son fotografías documentales del propietario ni capturas del programa. La evidencia real permanece en las fichas técnicas.

## GitHub Pages

Sitio público: https://juan-coronado.github.io/

Repositorio: https://github.com/Juan-Coronado/juan-coronado.github.io

GitHub Pages sirve la raíz de la rama `main`. `.nojekyll` conserva los archivos estáticos sin procesamiento adicional. Para publicar cambios desde esta carpeta, ejecutar `npm test`, `npm run build`, revisar `git diff`, crear un commit y hacer `git push origin main`.

La URL pública se configura en `content.site.url`; `PORTFOLIO_SITE_URL` permite sustituirla al generar otra publicación. Los originales PNG y las capturas internas de revisión permanecen locales; el sitio utiliza los recursos WebP optimizados. Las fichas incluyen las descargas de código y la evidencia de los proyectos. Las aplicaciones que necesitan C++, Java o ASP.NET siguen requiriendo su entorno de ejecución local.

## Proyectos recuperados en octubre de 2026

Cada detalle incluye periodo original, alcance, aprendizaje, correcciones y verificación. «Ver proyecto» abre una ficha con evidencia del programa real. El sitio es estático y compatible con GitHub Pages; no incluye compilador, lanzador de programas ni adaptaciones simuladas. JImport conserva su ficha documentada.

«Ver detalles» muestra la captura real, un extracto de consola real o el estado documental, según el material de cada proyecto. «Abrir ficha completa» lleva a la página independiente y «Descargar código» entrega fuentes y pruebas. Las aplicaciones reales de EuroSky y Metropolitano tienen un enlace en el detalle visible únicamente en localhost, cuando sus servidores locales están disponibles. GitHub Pages muestra las fichas y descargas sin intentar abrir los servicios privados del propietario. Los ZIP no contienen guías, ejecutables, App_Data ni claves. Cada programa y sus instrucciones están en `../proyectos/`.

## Pulido de presentación del 20 de octubre de 2026

La portada presenta especialidad, tecnologías y acceso a proyectos. La firma de Sobre mí se sustituye por «Mi magia es no rendirme», en cursiva y con atribución a Asta, Black Clover. La piedra conserva su color y recibe sombreado neutro localizado detrás de las zonas de lectura. Los botones secundarios utilizan tipografía de lectura; la acción principal conserva fraktur, rojo oscuro y cinco hojas.

El carrusel sitúa sus controles antes de las tarjetas y mide la altura de la tarjeta activa, también al redimensionar o cargar una imagen. La tarjeta comparte únicamente dos acciones principales: detalle y descarga. Los enlaces de tecnologías remiten a las fichas de los proyectos relacionados; las herramientas sin una referencia específica se identifican como exploradas en la formación. No se asignan porcentajes de dominio. Contacto permite copiar el correo y anuncia tanto el resultado como un error de acceso al portapapeles.

`npm run build` actualiza el HTML estático desde `src/content.js`: identidad, textos, navegación, listado básico de proyectos y contacto. También prepara título y metadatos sociales. El generador Python de proyectos ejecuta este paso automáticamente, por lo que requiere Node.js para regenerar, además de Python. El sitio generado sigue sin necesitar un servidor de aplicaciones.

El favicon contiene cinco hojas. `assets/social-preview.jpg` es una captura de la portada real a 1200 × 630. `npm run build` añade canonical, Open Graph e imagen social con la URL pública configurada, respetando la subcarpeta si la hubiera. Las vistas previas en redes sociales dependen de sus servicios externos.
