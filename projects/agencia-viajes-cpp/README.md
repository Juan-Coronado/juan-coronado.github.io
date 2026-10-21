# Agencia de viajes

Mis primeros pasos con menús, decisiones y cotizaciones de servicios turísticos.

[Ficha y evidencia en el portafolio](https://juan-coronado.github.io/projects/agencia-viajes-cpp/)

| Periodo original | Dificultad académica | Estado de esta versión |
| --- | --- | --- |
| Noviembre de 2022 | Inicial | Comprobado localmente |

## Funcionalidades

- Destinos, hoteles, restaurantes y coches del catálogo original.
- Nombres completos, rangos válidos y cálculo por días.
- Tarifas académicas originales; sin reservas ni cobros reales.

## Ejecución

Windows con las herramientas C++ de Visual Studio. Abrir Developer PowerShell en la raíz del repositorio.

```powershell
cl /nologo /std:c++17 /EHsc /utf-8 programa/main.cpp /Fe:agencia.exe
.\agencia.exe
```

## Comprobación disponible

Compilado con MSVC C++17. Probados cálculo, límites, entradas inválidas y fin de entrada.

Ejecutar desde la raíz del repositorio.

```powershell
cl /nologo /std:c++17 /EHsc /utf-8 tests/cotizacion.cpp /Fe:pruebas.exe
.\pruebas.exe
```

[Registro de ejecución](evidencia/ejecucion.txt)

Las comprobaciones anteriores corresponden a la recuperación de octubre de 2026; esta publicación conserva sus registros.

## Aprendizaje

- Organizar decisiones en funciones y recorridos.
- Separar el catálogo de la interacción y validar antes de calcular.

## Revisión para el portafolio

- Corregidas las lecturas de nombres y las entradas fuera de rango.
- Añadidas pruebas de cotización y salida al cerrar la entrada.

## Alcance

Programa académico de 2022, corregido en octubre de 2026. Trabajo grupal; las tarifas no son precios comerciales actuales.

## Contexto académico y procedencia

Este repositorio conserva el alcance académico y los créditos disponibles en el material original. La recuperación, las correcciones y las reconstrucciones de octubre de 2026 se realizaron con asistencia de Codex/IA y se distinguen del trabajo original. La contribución individual de cada integrante no está desglosada aquí.
