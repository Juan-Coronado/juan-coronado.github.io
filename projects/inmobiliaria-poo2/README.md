# Gestión inmobiliaria

Propiedades, inquilinos y contratos conectados mediante reglas de negocio y una estructura MVC.

[Ficha y evidencia en el portafolio](https://juan-coronado.github.io/projects/inmobiliaria-poo2/)

| Periodo original | Dificultad académica | Estado de esta versión |
| --- | --- | --- |
| 2024-I | Intermedia | Reconstruido y comprobado |

## Funcionalidades

- Registro y consulta de propiedades e inquilinos.
- Contratos con fechas y alquiler preciso.
- Relaciones válidas y rechazo de periodos superpuestos.

## Ejecución

JDK 11 o superior. Ejecutar desde la raíz del repositorio.

```powershell
javac -encoding UTF-8 -d build programa/Main.java programa/modelo/*.java programa/vista/*.java programa/controlador/*.java tests/GestionTest.java
java -cp build Main
```

## Comprobación disponible

Compilado y ejecutado con Java 11. Probados vínculos, periodos superpuestos, contratos consecutivos y el flujo de consola.

Ejecutar desde la raíz del repositorio.

```powershell
java -ea -cp build GestionTest
```

[Registro de ejecución](evidencia/ejecucion.txt)

Las comprobaciones anteriores corresponden a la recuperación de octubre de 2026; esta publicación conserva sus registros.

## Aprendizaje

- Separar modelo, vista y controlador.
- Expresar relaciones y reglas de negocio entre objetos.

## Revisión para el portafolio

- Reconstruido desde las capturas de código del informe, sin fuentes Java independientes.
- Fechas con LocalDate y alquiler con BigDecimal.

## Alcance

Reconstrucción de octubre de 2026 del programa de consola mostrado en el informe de 2024-I. Registros en memoria durante la sesión.

## Contexto académico y procedencia

Este repositorio conserva el alcance académico y los créditos disponibles en el material original. La recuperación, las correcciones y las reconstrucciones de octubre de 2026 se realizaron con asistencia de Codex/IA y se distinguen del trabajo original. La contribución individual de cada integrante no está desglosada aquí.
