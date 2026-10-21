# EuroSky Connect

Proyecto grupal de junio de 2026. Se conserva la arquitectura original: servidor HTTP C++ en Windows, datos CSV e interfaz HTML/CSS/JavaScript. Correcciones locales de octubre de 2026.

## Cambios

Se retiro la clave Maps incrustada. El servidor lee GOOGLE_MAPS_API_KEY del entorno de forma opcional; sin ella, el mapa no se carga pero los algoritmos funcionan. API_BASE usa el mismo origen. Las operaciones de gestion usan POST y una cabecera de la aplicacion; se rechazan entradas invalidas y solicitudes entre sitios. Se corrige el envio de respuestas parciales y el guardado CSV usa reemplazo atomico. Se validan parametros y se evita exceder 64 nodos en la mascara de programacion dinamica.

## Ejecutar

En Developer PowerShell: `cl /nologo /std:c++17 /EHsc /utf-8 programa/EuroSkyConnect/backend.cpp ws2_32.lib /Fe:programa/EuroSkyConnect/EuroSkyConnectWeb.exe`. Ejecutar ese archivo desde programa/EuroSkyConnect; puerto por defecto 8080. EUROSKY_PORT permite cambiarlo. La demostracion actual corre en http://127.0.0.1:4324. Solo escucha en la interfaz local. Se mantiene el lanzador original para el puerto 8080.

## Alcance

Datos academicos, sin horarios, tarifas o predicciones comerciales en vivo. Google Maps necesita configuracion propia. Bootstrap y el generador PDF del original cargan bibliotecas externas desde CDN. No se ejecuta la clave anterior ni se publica entre las fuentes. Este servidor HTTP es una demostracion de un solo proceso, sin autenticacion; no debe exponerse a Internet directamente.

## Verificacion

Se compilo y ejecuto. tests/algoritmos.cpp comprueba BFS, DFS, Dijkstra, Bellman-Ford, DP y parametros no finitos o malformados; compilar con ws2_32.lib. API comprobada para aeropuertos, calculo MAD, comparacion, Monte Carlo y peticiones invalidas. Evidencias en evidencia/. El mapa no se comprobo con una clave activa.

## Aprendizaje

Grafos, recorridos, caminos minimos, optimizacion con restricciones e integracion web/C++. Dificultad avanzada.
