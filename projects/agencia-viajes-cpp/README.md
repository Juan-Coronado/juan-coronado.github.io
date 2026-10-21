# Agencia de viajes en C++

Ejercicio original de noviembre de 2022, recuperado y corregido en octubre de 2026. Trabajo académico grupal; estas correcciones se realizaron para el portafolio de Juan Antonio Coronado Palacios.

## Arquitectura y alcance

programa/main.cpp contiene la interacción; catalogo.hpp centraliza el catálogo y el cálculo. Permite cotizar destinos, hoteles, restaurantes y coches. Tarifas académicas del original, sin conexión a proveedores ni reservas reales.

Se corrigieron lecturas de nombres, rangos, cantidades negativas, salida al cerrar la entrada y repetición de menús. No se conservan datos personales.

## Ejecutar

En Developer PowerShell para Visual Studio: `cl /nologo /std:c++17 /EHsc /utf-8 programa/main.cpp /Fe:agencia.exe` y `./agencia.exe`.

## Verificación

`cl /nologo /std:c++17 /EHsc /utf-8 tests/cotizacion.cpp /Fe:tests.exe` y `./tests.exe`. Comprobación ejecutada adicionalmente: hotel Met Hotel × 3 días = S/966; entradas inválidas y fin de entrada. Registro real en evidencia/ejecucion.txt.

## Aprendizaje

Condicionales, recorridos, funciones, validación de entradas y separación entre datos e interfaz. Dificultad inicial.
