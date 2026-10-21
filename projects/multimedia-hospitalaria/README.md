# Sistema multimedia hospitalario

Proyecto grupal de junio de 2026. Prototipo educativo C++17 para pacientes y multimedia, corregido y comprobado en octubre de 2026. Usar exclusivamente datos ficticios; no es un sistema clinico listo para produccion.

## Arquitectura

Se conservan las capas de presentacion, negocio, sistema de archivos y las estructuras propias: vector dinamico, arbol rojo-negro, hash por ID/nombre y trie. Se elimino la reserva inicial de millones de nodos vacios y se liberan nodos y tablas al cerrar. La eliminacion actualiza todos los indices. Se validan los campos y extensiones de archivos.

La persistencia se carga en un estado temporal y rechaza archivos corruptos; el guardado reemplaza de forma atomica. La interfaz no borra carpetas recursivamente ni inicia con un archivo invalido para luego sobrescribirlo. Los archivos multimedia se copian a un almacen local. El XOR hexadecimal del formato original es ofuscacion educativa, no cifrado seguro; los archivos binarios no se cifran. No hay autenticacion ni controles aptos para historias clinicas reales.

## Ejecutar

En Developer PowerShell para Visual Studio: `cl /nologo /std:c++17 /EHsc /utf-8 /D_HAS_STD_BYTE=0 programa/SistemaHospitalarioMultimedia/src/*.cpp shell32.lib /Fe:hospital.exe`. Tambien se conserva CMakeLists.txt del original. Ejecutar en una carpeta de datos propia. Enter continua; 0 guarda y sale. Las vistas previas se dejan en sala_reconstruccion_temporal, sin eliminar archivos de otras carpetas.

## Pruebas

Compilar tests/estructuras.cpp con BusinessLogic.cpp, FileSystem.cpp y MotorAlgoritmico.cpp, mismo estandar y definicion. Ejecutar en una carpeta de prueba pasando la ruta de un PNG. Comprobado: 300 pacientes ficticios, invariantes rojo-negro, duplicados, copia PNG, consultas hash/trie, eliminacion, recarga del archivo guardado y rechazo de un archivo corrupto sin perder el estado previo. Lotes sinteticos limitados a 10000 registros por operacion; sus archivos son marcadores de prueba, no estudios medicos reales. No se hizo una prueba de millones de elementos.

## Aprendizaje

Estructuras de datos, relaciones e indices, gestion de memoria y persistencia. Dificultad avanzada academica.
