# Inventario agrícola

Registro de productos perecederos con una lista enlazada y conservación de datos entre sesiones.

[Ficha y evidencia en el portafolio](https://juan-coronado.github.io/projects/inventario-agricola/)

| Periodo original | Dificultad académica | Estado de esta versión |
| --- | --- | --- |
| Noviembre de 2024 | Intermedia | Comprobado localmente |

## Funcionalidades

- Productos con nombre, tipo, ingreso y vida útil.
- Listado y carga de archivos entre sesiones.
- Guardado atómico y rechazo de archivos incompletos.

## Ejecución

Windows con las herramientas C++ de Visual Studio. Abrir Developer PowerShell en la raíz del repositorio; los archivos de datos se crean en el directorio de ejecución.

```powershell
cl /nologo /std:c++17 /EHsc /utf-8 "programa/Coronado Palacios_Juan Antonio_2220366_Codigo.cpp" /Fe:inventario.exe
.\inventario.exe
```

## Comprobación disponible

Compilado con MSVC C++17. Probados guardado, reemplazo, recarga, nombres con espacios, fechas imposibles y archivo truncado.

Ejecutar desde la raíz del repositorio. Ejecutar en una copia de pruebas, porque se guardan archivos locales.

```powershell
cl /nologo /std:c++17 /EHsc /utf-8 tests/inventario.cpp /Fe:pruebas.exe
.\pruebas.exe
```

[Registro de ejecución](evidencia/ejecucion.txt)

Las comprobaciones anteriores corresponden a la recuperación de octubre de 2026; esta publicación conserva sus registros.

## Aprendizaje

- Gestionar nodos, punteros y memoria dinámica.
- Validar los datos antes de sustituir un archivo o una lista.

## Revisión para el portafolio

- Separadas las operaciones del inventario y la consola.
- Corregidas la liberación de memoria, las fechas y la lectura de archivos truncados.

## Alcance

Conserva las funciones del programa recibido: registrar, listar, cargar y guardar. No se presentan predicciones agrícolas propuestas como si estuvieran implementadas.

## Contexto académico y procedencia

Este repositorio conserva el alcance académico y los créditos disponibles en el material original. La recuperación, las correcciones y las reconstrucciones de octubre de 2026 se realizaron con asistencia de Codex/IA y se distinguen del trabajo original. La contribución individual de cada integrante no está desglosada aquí.
