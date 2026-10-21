# Portafolio personal

## Portadas y fichas estáticas — octubre de 2026

Las tarjetas consumen diez imágenes referenciales locales con apariencia fotográfica en WebP. El generador `../proyectos/preparar_portafolio.py` determina sus rutas y los enlaces a las fichas; conserva por separado las capturas y registros reales de los programas. Los prompts y originales se guardan en `assets/project-art/`. El texto alternativo procede del catálogo y las URLs incluyen una huella del archivo para actualizar las portadas almacenadas en caché al sustituirlas.

`ProjectDialog` reutiliza el diálogo nativo para presentar el alcance, las funciones, el aprendizaje y la verificación de cada proyecto, con enlaces a su ficha y a las fuentes descargables. Los programas compilados y sus datos permanecen separados del sitio estático.

Por indicación del propietario se retiraron las adaptaciones JavaScript y se descartó el compilador/lanzador que se estaba preparando: la publicación prevista utiliza GitHub Pages, sin backend de ejecución. EuroSky y Metropolitano conservan enlaces a sus aplicaciones reales solamente en localhost; las versiones públicas muestran evidencia y código. JImport continúa como caso documentado.

## Alcance
La portada conserva la secuencia visual del primer reel con el nombre y la fotografía de Juan Antonio Coronado Palacios. La estructura del segundo reel incorpora presentación, proyectos verificables, tecnologías y contacto. La identidad conserva el fondo de piedra con sus tonos originales, controles negros con bordes y resplandor rojo sangre, tipografía fraktur desgastada y acentos de marfil y oro antiguo. La presentación, el catálogo de herramientas y los canales de contacto usan los textos y destinos proporcionados por el propietario.

## Arquitectura definida antes de implementar

```text
index.html                    estructura semántica y alternativa sin JavaScript
src/content.js                identidad, textos y ruta del retrato
src/config/motion.js          tiempos, curvas, partículas y avance por pantallas
src/main.js                   arranque y conexión de componentes
src/ui/navigation.js          menú responsive y sección activa
src/ui/emblems.js             sello decorativo compartido de cinco hojas
src/ui/section-scroll.js      gestos de rueda, teclado y anclas
src/ui/scroll-target.js        destinos de lectura según geometría real
src/sections/render.js        presentación y listas desde contenido
src/sections/technologies.js  selección accesible del catálogo por categorías
src/sections/project-dialog.js detalle accesible del proyecto
src/animation/intro.js        secuencia tipográfica y cancelación
src/animation/portrait.js     muestreo de foto, máscara y dibujo de partículas
src/animation/particles.js    cálculo puro de máscara y puntos
styles.css                    fondo y composición de la portada
src/styles/theme.css          tokens, fuentes y controles compartidos
src/styles/controls.css       botones de grimorio y estados compartidos
src/styles/emblems.css        hojas y tallo del sello
src/styles/about.css          texto, fotografía y marco de Sobre mí
src/styles/aged-type.css      máscara de desgaste y alternativa de alto contraste
src/styles/intro.css          apariencia de letras y escenario inicial
src/styles/sections.css       composición de las secciones y navegación
src/styles/technologies.css   distribución del catálogo y selector móvil
src/styles/screens.css        pantallas completas y ajuste de desplazamiento
assets/                       fondo, fotografía y fuentes locales
```

El contenido no importa animaciones. La intro recibe elementos y tiempos. El retrato recibe imagen y configuración, sin conocer nombres ni textos. El arranque coordina ambas piezas. Cada módulo se ocupa de cancelar sus animaciones y liberar listeners.

## Ampliación definida antes de implementar

- La página tiene una sola portada y cuatro bloques: Sobre mí, Proyectos, Tecnologías y Contacto. El menú se genera desde los IDs y etiquetas centralizados en contenido.
- Las listas de proyectos, tecnologías y canales de contacto son datos. Sus renderizadores reciben esos datos, sin depender de su cantidad ni del nombre del propietario.
- El detalle de proyecto utiliza `dialog` nativo, cierre por Escape, foco y enlaces derivados de URLs configuradas.
- La muestra inicial es el portafolio que existe en esta carpeta. Su captura se obtiene de la página real. No se crean trabajos ficticios para llenar columnas.
- Los proyectos muestran su tecnología de implementación. El catálogo personal agrupa las herramientas declaradas por el propietario en su formación y proyectos, sin niveles de dominio inventados.
- Los contactos sin URL se representan como información pendiente, sin botones que aparenten enviar o abrir destinos inexistentes.
- La imagen de fondo pasa a una capa fija del viewport para no estirarse a medida que crece la página.
- El retrato se suspende cuando la portada sale de pantalla. Se respeta la preferencia de movimiento reducido y se mantiene retirada la pausa/repetición de la cabecera.

## Estado y navegación
La intro conserva su estado local. El menú solo controla su apertura móvil. IntersectionObserver identifica la sección visible y la visibilidad de la portada; no hay un listener de scroll ejecutándose en cada fotograma. Las anclas conservan sus destinos nativos; el controlador de pantallas coordina desplazamiento y foco. Los módulos liberan sus observadores, listeners y seguimiento temporal al abandonar la página.

## Secuencia
Un punto desciende, aparece la exclamación, los caracteres se reúnen formando el nombre completo y luego dejan paso a Portafolio. El retrato se forma a partir de partículas que conservan la luz y los detalles de la foto. Al terminar se muestran la identidad, la navegación y las secciones. Duraciones y densidad se ajustan en configuración; no dependen de índices o nombres personales incorporados al algoritmo.

## Accesibilidad y degradación
La animación es decorativa: el nombre y el título tienen equivalentes semánticos. Movimiento reducido muestra directamente el resultado estático. Omitir y Escape permiten terminar la intro. La cabecera no incluye controles de pausa ni repetición. Si falla el canvas se muestra la foto como alternativa. Si falla la carga del módulo, el HTML conserva una portada básica. El canvas limita resolución y partículas y se detiene con la pestaña oculta.

## Recursos y ejecución
Todos los recursos del navegador son locales. No se necesita instalar dependencias ni compilar. Servir la carpeta con `python -m http.server 4321 --bind 127.0.0.1`. La foto original se conserva fuera de la salida de producción y se usa una copia WebP para la página.

## Comprobación prevista
Revisar la secuencia en tiempos intermedios y estado final, omitir, Escape, movimiento reducido, pantallas móviles y de escritorio, fallos de recursos, ausencia de desbordamiento y legibilidad del rostro. Comprobar funciones de máscara/partículas con datos sintéticos, sin sustituir la inspección visual del resultado real.

## Ajuste tipográfico solicitado
UnifrakturCook Bold sustituye a Germania One mediante el token de tipografía y su peso. Los títulos usan caja mixta para conservar el dibujo caligráfico de las minúsculas. Se aplica marfil con contorno oscuro sutil. La intro reutiliza el mismo estilo que el título final y mide su geometría al ejecutarse, por lo que no necesita coordenadas nuevas asociadas al nombre o a la fuente.

## Controles con identidad de grimorio
Los botones y enlaces de acción comparten `grimoire-button` y variantes de jerarquía en `src/styles/controls.css`. Las secciones conservan únicamente sus reglas de composición. Colores y radios proceden de los tokens del tema; las etiquetas y destinos siguen en contenido. El trébol es un adorno CSS sin texto accesible ni recursos externos. Los estados de foco, pulsación y movimiento reducido forman parte del estilo compartido.

## Tipografía de lectura
Los párrafos comparten tokens de fuente, tamaño, peso, interlineado y color en el tema. EB Garamond acompaña a la fraktur con un carácter de libro antiguo y formas apropiadas para lectura continua. Se aloja una versión WOFF2 variable latina con licencia OFL dentro de assets/fonts. Los controles y etiquetas técnicas conservan sus familias propias; el contenido sigue siendo texto independiente del estilo.

## Navegación por pantallas definida antes de implementar
- Las secciones marcadas con `data-nav-section` son las pantallas; su altura mínima corresponde al viewport y pueden crecer con el contenido. Contacto incluye el pie para evitar una pantalla final vacía.
- `src/ui/section-scroll.js` coordina rueda, teclado y anclas, separado del estado visual del menú. Una ráfaga de eventos de rueda produce un solo avance; la inercia restante no encadena saltos.
- `src/ui/scroll-target.js` calcula destinos a partir de geometría real, sin índices ligados a nombres de secciones. Si una sección es alta, se avanza por su contenido antes de abandonarla.
- Los umbrales y tiempos viven en `motion.sectionScroll`; los estilos de pantalla y el ajuste táctil nativo viven en `src/styles/screens.css`.
- Se conserva el desplazamiento nativo de diálogos, campos editables, áreas con scroll y gestos de zoom. El movimiento reducido y las acciones de teclado usan cambios inmediatos; la rueda puede desplazarse suavemente.
- Se comprobarán avances y retrocesos, ráfagas e inercia, secciones altas, menú/anclas, foco, diálogo, tacto, movimiento reducido y tamaños de pantalla.

## Catálogo de tecnologías definido antes de implementar
El catálogo proporcionado por el propietario se modela como categorías con ID, título y lista de tecnologías con nombre y descripción. `src/sections/technologies.js` presenta una categoría activa, con pestañas en escritorio y un selector nativo en móvil. Ambos controles se generan desde los mismos datos y comparten selección. Las descripciones conservan su texto completo; no se añaden niveles de dominio ni experiencia estimada.

Las pestañas tienen relaciones ARIA, foco único y navegación con flechas, Inicio y Fin, independiente del avance general por pantallas. El selector móvil conserva su teclado nativo. Los paneles se superponen en una cuadrícula para reservar la altura del contenido más largo y evitar saltos al cambiar de grupo; los inactivos se ocultan visualmente y quedan inertes. Los listeners se liberan con el ciclo de vida del módulo. Los estilos específicos quedan en `src/styles/technologies.css`, usando los tokens existentes.

Se comprobarán las seis categorías y sus textos, selección por clic/teclado, sincronización al cambiar de tamaño, ausencia de desbordamiento, lectura completa en móvil y conservación de los tres enlaces de contacto ya configurados.

## Identidad roja, retrato y tinta antigua definidos antes de implementar
- El rojo oscuro pasa a ser la familia cromática dominante mediante tokens compartidos, superficies de controles y capas sobre la piedra original. El fondo permanece fijo y visible detrás de todas las secciones; las capas de lectura dejan de ocultarlo.
- Sobre mí recibe la misma foto del propietario desde la ruta centralizada, con marco, sello y disposición adaptable. `src/styles/about.css` concentra esa composición.
- Un componente decorativo en `src/ui/emblems.js` compone exactamente cinco hojas con CSS y se reutiliza en el botón principal y la foto. Queda fuera del nombre accesible del control.
- El título conserva el texto y la fuente: una textura de máscara local en SVG aporta desgaste a la tinta durante la intro y en el título final. El cuerpo de lectura conserva sus formas limpias.
- Se comprobarán la presencia y nitidez del retrato, la visibilidad de la piedra en las cinco pantallas, el trébol de cinco hojas, contraste, intro y navegación, legibilidad del desgaste y adaptación a móvil/escritorio.

### Corrección del fondo solicitada por el propietario
La capa roja del fondo se retira. El fondo fijo, las capas de lectura y la base del retrato usan sombreado neutro con tokens propios, separados del color rojo de los controles. Se conservan los archivos originales de piedra y su selección responsive. El rojo de botones y detalles, las cinco hojas, el retrato y el desgaste tipográfico permanecen.

### Referencias de negro y rojo sangre
Los colores muestreados de las imágenes del propietario orientan una escala de rojo sangre con sombras casi negras. Base, brillo, sombra y halos están centralizados en `theme.css`; botones, pestaña activa y marco fotográfico reutilizan esos tokens. El botón principal conserva una superficie oscura con textura local y concentra el rojo en los bordes. No se modifica el fondo de piedra ni se añaden animaciones continuas para representar el resplandor.

### Refinamiento mate tras inspección del navegador real
La escala de rojo se oscurece y el hover usa un token propio, sin reutilizar un rojo claro de texto. Las etiquetas informativas usan el color de lectura secundario y el foco de teclado conserva un contorno marfil visible. El componente compartido define relieve, grabado, esquinas y estados; el sello sigue siendo el componente existente de cinco hojas. Las pestañas de categorías reducen el marco interior y distinguen la selección con una marca lateral, sin adquirir la jerarquía del botón principal.

## Marcas de pantalla, carrusel y catálogo definidos antes de implementar
- `src/ui/section-progress.js` genera una marca dentada por entrada de navegación. `SectionNavigation` comunica su sección activa al componente; anclas, rueda y teclado siguen usando el controlador de pantallas existente. Ocultar la barra visual no desactiva el desplazamiento. Alto contraste conserva una alternativa visible.
- `src/sections/project-card.js` concentra la tarjeta antes duplicada por contexto; `project-elements.js` comparte etiquetas y enlaces con el detalle. Los prefijos de IDs evitan duplicados cuando carrusel y catálogo están presentes.
- `src/sections/project-showcase.js` coordina carrusel manual, flechas, teclado, desplazamiento horizontal, selección y estado accesible. No reproduce automáticamente ni fabrica proyectos. Una sola tarjeta mantiene sus flechas inactivas.
- `src/sections/project-catalog.js` presenta Ver todos en diálogo nativo. `project-order.js` ordena por la escala de dificultad configurada, conserva el orden de los empates y deja lo no clasificado al final. El campo no representa la experiencia profesional del propietario.
- `src/ui/dialog-state.js` coordina bloqueo de fondo y cierre de diálogos al navegar. El detalle puede abrirse sobre el catálogo y devolverle el foco.
- Comprobar cinco marcas y una activa, rueda/anclas/teclado, carrusel vacío/único/múltiple, orden, foco de diálogos, movimiento reducido y anchos móviles/escritorio. Los ejemplos múltiples existen exclusivamente en las pruebas.

## Integracion de proyectos recuperados

Los diez proyectos son independientes en outputs/proyectos. catalogo.json centraliza fechas, alcance, dificultad, aprendizaje y evidencia; preparar_portafolio.py genera src/projects.js, fichas y ZIP mediante una lista permitida de extensiones, excluyendo datos privados y guias. content.js consume los elementos y conserva la escala de dificultad. Se reutilizan ProjectShowcase, ProjectCatalog, ProjectDialog y projectLinks. No se ejecuta codigo de proyectos desde el sitio estatico; las demos locales son servicios separados.

## Presentación y evidencia del 20 de octubre de 2026

- `content.js` concentra metadatos, presentación, cita y relaciones `projectIds` entre tecnologías y proyectos. El perfil conserva la información proporcionada, sin atribuciones individuales ni niveles nuevos.
- `projectLinks` acepta opciones para omitir ficha y aplicación local en las tarjetas; los enlaces completos siguen disponibles en el detalle. No se duplica la lógica de descargas ni la restricción de localhost.
- El generador Python exporta `evidence` con tipo, leyenda y captura o extracto real del registro. `ProjectDialog` presenta esa evidencia; el caso Oracle permanece documental. No se añaden simulaciones.
- `ProjectShowcase` mantiene controles al principio y ajusta la altura del viewport a la tarjeta activa. Un ResizeObserver sigue cambios de tamaño e imágenes; se conservan desplazamiento horizontal, teclado, estados inertes y liberación de recursos.
- `copy-email.js` gestiona escritura al portapapeles, estado pendiente, anuncio y recuperación del botón en éxito o error. El listener pertenece al ciclo de vida de la página.
- `scripts/prepare-page.mjs` genera contenido estático escapado en bloques del HTML existente. Se ejecuta al regenerar proyectos o mediante `npm run build`; no es un proceso requerido para servir el resultado. El arranque de navegador mejora el HTML generado con los componentes interactivos.
- La URL pública es opcional al preparar: sin ella no se inventan direcciones canonical o de imagen social. Con `PORTFOLIO_SITE_URL`, los metadatos incluyen la ruta completa del repositorio.
- Las entradas por ancla se alinean después de cargar fuentes y montar componentes para conservar el destino aunque el contenido estático y el interactivo tengan alturas distintas.
