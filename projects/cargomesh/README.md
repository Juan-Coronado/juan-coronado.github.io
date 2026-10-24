# CargoMesh 2

**Plataforma logística desarrollada en equipo · Septiembre–octubre de 2026**

Desarrollamos en grupo CargoMesh para conectar a clientes que necesitan transportar carga con empresas transportistas. La plataforma reúne solicitudes, ofertas, reservas y vistas de seguimiento, con asistencia conversacional, mapas y visualización logística 3D.

[Sitio del proyecto](https://cargomesh.vercel.app/) · [Repositorio original del equipo](https://github.com/Chujutak2024/cargomesh) · [Caso de portafolio](https://juan-coronado.github.io/projects/cargomesh/)

## Qué construimos

- Portal Cliente para preparar cargas, consultar solicitudes, comparar propuestas y revisar reservas e historial.
- Portal Carrier para oportunidades, cotizaciones, pedidos, flota, conductores, sedes y control operativo.
- Servicios compartidos, autenticación y separación de datos por organización.
- Asistente Nova, mapas e integración MCP autenticada.
- Catálogo compartido de 23 diseños visuales de camiones y 15 arquitecturas de sedes; escenarios de cinco camiones con continuidad de estado.

## Arquitectura y tecnologías del proyecto

La aplicación web utiliza **TypeScript, Next.js y React**, con CSS Modules y Tailwind CSS. **Hono y Zod** conectan los puntos de entrada REST con contratos compartidos. **Supabase Auth, PostgreSQL y RLS** aportan identidad, persistencia y autorización por organización.

Los mapas utilizan **Google Maps JavaScript, Routes y Geocoding**. La visualización se construye con **Three.js y React Three Fiber**. El gateway de voz emplea **Python, WebSocket, Strands y Amazon Bedrock Nova**. Un servidor **MCP autenticado** reutiliza los servicios de aplicación. El proyecto incluye despliegue web en Vercel e infraestructura de voz en AWS.

## Desarrollo colaborativo

El repositorio original conserva las contribuciones del equipo, documentación y entregas mediante PR. Juan Antonio Coronado Palacios participa en este desarrollo conjunto; esta ficha presenta el producto general y no atribuye todos sus componentes a una sola persona.

CargoMesh participa en **Build, Ship, Shape: Amazon Developer Hackathon 2026**. No se afirma un premio ni un resultado final.

## Evidencia

- [Mapa y workspace, PR #92](https://github.com/Chujutak2024/cargomesh/pull/92): integrado en una base histórica.
- [Escenario y catálogo 3D, PR #128](https://github.com/Chujutak2024/cargomesh/pull/128): integrado en una base histórica.
- [Portal Cliente, PR #154](https://github.com/Chujutak2024/cargomesh/pull/154): integrado en main.
- [Nueva carga, PR #164](https://github.com/Chujutak2024/cargomesh/pull/164): integrado en main.
- [Arquitectura](https://github.com/Chujutak2024/cargomesh/blob/main/docs/ARCHITECTURE.md) y [estado documentado](https://github.com/Chujutak2024/cargomesh/blob/main/docs/STATUS.md).

## Alcance

Proyecto en evolución. Las escenas y catálogos 3D son referencias visuales, no GPS ni activos reales. Las capturas del portafolio muestran escenarios de prueba identificados. Código integrado, preview local y despliegue publicado son evidencias distintas; no se certifica aquí un recorrido comercial completo en producción.

La ficha se preparó el **23 de octubre de 2026** a partir del documento de contexto, fuentes y entregas comprobadas. Los resultados de pruebas citados pertenecen a sus entregas; no son una batería nueva. El código y las instrucciones de ejecución se consultan en el repositorio original, sin duplicar el proyecto ni sus credenciales.
