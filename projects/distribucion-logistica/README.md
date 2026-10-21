# Logística con autómatas

Seguimiento de lotes desde la recepción hasta su entrega, con una pila para resolver incidencias.

[Ficha y evidencia en el portafolio](https://juan-coronado.github.io/projects/distribucion-logistica/)

| Periodo original | Dificultad académica | Estado de esta versión |
| --- | --- | --- |
| 2025-I | Intermedia | Comprobado localmente |

## Funcionalidades

- Recepción, inspección, procesamiento, empaquetado y despacho.
- Pila LIFO de excepciones y reanudación del proceso.
- Modelo JFLAP editable del flujo principal.

## Ejecución

Windows con las herramientas C++ de Visual Studio. Abrir Developer PowerShell en la raíz del repositorio. El archivo .jff puede abrirse por separado en JFLAP.

```powershell
cl /nologo /std:c++17 /EHsc /utf-8 "programa/Codigo - Trabajo Final Grupo 5 (1).cpp" /Fe:logistica.exe
.\logistica.exe
```

## Comprobación disponible

Compilado y ejecutado. Probados registro único, fechas, rechazo, pila LIFO, bloqueo y un recorrido completo hasta Entregado.

Ejecutar desde la raíz del repositorio.

```powershell
cl /nologo /std:c++17 /EHsc /utf-8 tests/estados.cpp /Fe:pruebas.exe
.\pruebas.exe
```

[Registro de ejecución](evidencia/ejecucion.txt)

Las comprobaciones anteriores corresponden a la recuperación de octubre de 2026; esta publicación conserva sus registros.

## Aprendizaje

- Representar procesos mediante estados y transiciones.
- Controlar excepciones acumuladas y su orden de resolución.

## Revisión para el portafolio

- Validación de números únicos y fechas de cada lote.
- Corregido el estado cuando quedan incidencias pendientes y la salida ante entradas inválidas.

## Alcance

Trabajo académico grupal de 2025-I. Los datos permanecen en memoria durante la sesión, como en el programa recibido.

## Contexto académico y procedencia

Este repositorio conserva el alcance académico y los créditos disponibles en el material original. La recuperación, las correcciones y las reconstrucciones de octubre de 2026 se realizaron con asistencia de Codex/IA y se distinguen del trabajo original. La contribución individual de cada integrante no está desglosada aquí.
