# Reservas turísticas

Una interfaz de escritorio para registrar viajeros y organizar sus reservas turísticas.

[Ficha y evidencia en el portafolio](https://juan-coronado.github.io/projects/reservas-viajes-java/)

| Periodo original | Dificultad académica | Estado de esta versión |
| --- | --- | --- |
| Noviembre de 2023 | Inicial | Comprobado localmente |

## Funcionalidades

- Datos del viajero, destino, origen, hotel, personas y días.
- Una fila por reserva y exportación del reporte.
- Validación de campos y guardado con reemplazo atómico.

## Ejecución

JDK 11 o superior, con entorno gráfico para Swing. Ejecutar desde la raíz del repositorio.

```powershell
javac -encoding UTF-8 -d build programa/programaPaquete/src/main/java/com/mycompany/programapaquete/*.java tests/ReservasTest.java
java -cp build com.mycompany.programapaquete.AplicacionPractica
```

La acción Reservar exporta las reservas de la sesión a reporte.txt. El formulario NetBeans y el archivo Maven se conservan dentro de programa/.

## Comprobación disponible

Compilado con Java 11. Probados modelo, validación, guardado y dos reservas distintas en la interfaz Swing real.

Ejecutar desde la raíz del repositorio.

```powershell
java -ea -cp build com.mycompany.programapaquete.ReservasTest evidencia/aplicacion.png
```

[Registro de pruebas](evidencia/pruebas.txt)

![Render de la interfaz Swing ejecutada con dos reservas de prueba.](evidencia/aplicacion.png)

Las comprobaciones anteriores corresponden a la recuperación de octubre de 2026; esta publicación conserva sus registros.

## Aprendizaje

- Modelar información con clases y trabajar con eventos Swing.
- Presentar colecciones y conservar datos en archivos.

## Revisión para el portafolio

- Corregido el intercambio de origen y hotel y la repetición de filas.
- Compatibilidad con Java 11 y errores visibles al guardar.

## Alcance

Se conserva el formulario original de 2023. El contador sustituye un precio que no tenía tarifa definida; no se inventaron importes.

## Contexto académico y procedencia

Este repositorio conserva el alcance académico y los créditos disponibles en el material original. La recuperación, las correcciones y las reconstrucciones de octubre de 2026 se realizaron con asistencia de Codex/IA y se distinguen del trabajo original. La contribución individual de cada integrante no está desglosada aquí.
