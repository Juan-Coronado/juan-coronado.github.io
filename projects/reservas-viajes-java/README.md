# Reservas turisticas Java Swing

Proyecto de noviembre de 2023, corregido en octubre de 2026. Se conserva el formulario NetBeans y la separacion entre datos e interfaz. Compatible con Java 11.

## Correcciones

Origen y hotel ya no se intercambian. Cada reserva ocupa su propia fila. Se validan campos, DNI, cantidades y dias. El archivo se guarda mediante reemplazo atomico y se muestran errores. La etiqueta Precio Final no tenia tarifa ni calculo en el original: se sustituye por el contador de reservas, sin inventar un precio.

## Ejecutar

Desde programa/programaPaquete: `javac -encoding UTF-8 -d build src/main/java/com/mycompany/programapaquete/*.java` y `java -cp build com.mycompany.programapaquete.AplicacionPractica`. Reservar exporta todas las reservas de la sesion a reporte.txt. No es una reserva comercial ni cobra pagos.

## Verificacion

La prueba tests/ReservasTest.java se compila con las fuentes y se ejecuta con `java -ea -cp build com.mycompany.programapaquete.ReservasTest evidencia/aplicacion.png`. Valida modelo, archivo y dos filas distintas; renderiza la interfaz real Swing con datos de prueba.

## Aprendizaje

POO, eventos Swing, validacion y persistencia de archivos. Dificultad inicial.
