# Gestion inmobiliaria MVC

Trabajo POO 2 del ciclo 2024-I. Reconstruccion de octubre de 2026 a partir de las capturas del DOCX recibido; no es recuperacion de los archivos Java originales.

## Arquitectura

Se respeta el programa mostrado en las capturas: consola, Propiedad, Inquilino, Contrato, Vista y Controlador. Se separan validacion de relaciones y reglas en Gestion. Fechas ISO con LocalDate y alquiler exacto con BigDecimal. No se implementan el portal, el chat ni las integraciones propuestos en el texto porque las capturas muestran un programa de consola.

## Uso

Java 11 o superior. Desde esta carpeta: `javac -encoding UTF-8 -d build programa/Main.java programa/modelo/*.java programa/vista/*.java programa/controlador/*.java tests/GestionTest.java` y `java -cp build Main`. Los registros duran la sesion, como en el programa documentado.

## Comprobacion

`java -ea -cp build GestionTest`. Se comprobaron propiedades e inquilinos relacionados, rechazo de contratos superpuestos, contratos consecutivos y recorrido completo por consola (evidencia/ejecucion.txt). No tiene persistencia ni despliegue web.

## Aprendizaje

Clases, composicion, separacion MVC, relaciones entre entidades y validacion de reglas de negocio. Dificultad intermedia.
