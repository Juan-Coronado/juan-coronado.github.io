# Inventario agricola con listas enlazadas

Proyecto de noviembre de 2024, corregido en octubre de 2026. Mantiene registro, listado y persistencia del programa original.

## Arquitectura y cambios

El cpp original contiene la interfaz de consola. inventario.hpp gestiona una lista enlazada con liberacion de memoria y validacion de registros. Un archivo truncado no reemplaza la lista. La escritura usa un temporal y reemplazo atomico; se conserva el formato original de cuatro lineas por producto. Nombres con espacios, tipos Fruta/Verdura, fecha real y vida de 1 a 3650 dias.

## Ejecutar

En Developer PowerShell: `cl /nologo /std:c++17 /EHsc /utf-8 "programa/Coronado Palacios_Juan Antonio_2220366_Codigo.cpp" /Fe:inventario.exe`. Ejecutar en una carpeta de datos: lee/escribe productos.txt de esa carpeta. La opcion Guardar conserva los cambios; salir no guarda automaticamente. No se implementan las predicciones descritas como propuestas en el informe.

## Pruebas

Compilar tests/inventario.cpp y ejecutar en una carpeta temporal. Se comprobaron lectura, reemplazo, persistencia de nombres, archivos incompletos y fechas imposibles. Evidencia en evidencia/ejecucion.txt.

## Aprendizaje

Punteros, listas enlazadas, fechas, validacion y persistencia segura. Dificultad intermedia.
