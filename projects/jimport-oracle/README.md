# JImport: migración de datos

Estudio de una migración del esquema Sales, desde la planificación hasta la validación de integridad.

[Ficha y evidencia en el portafolio](https://juan-coronado.github.io/projects/jimport-oracle/)

| Periodo original | Dificultad académica | Estado de esta versión |
| --- | --- | --- |
| 2024-II | Avanzada | Documentado · sin ejecutar |

## Funcionalidades

- Caso de migración de SQL Server 2017 a Oracle 19c.
- Plan de inventario, respaldo, conversión y comparación.
- Alcance y evidencia disponible diferenciados de una ejecución real.

## Ejecución

Caso de estudio documental. No contiene un programa ejecutable ni afirma una migración completada.

## Comprobación disponible

Revisión del documento y del material recibido. No se ejecutó una migración: no se proporcionó el origen Sales y no hay entorno Oracle disponible.

Las comprobaciones anteriores corresponden a la recuperación de octubre de 2026; esta publicación conserva sus registros.

## Aprendizaje

- Analizar compatibilidad de motores y dependencias del esquema.
- Definir cómo verificar integridad y preparar una recuperación.

## Revisión para el portafolio

- Preparada la ficha técnica y la secuencia de validación a partir del documento recibido.

## Alcance

Se presenta como caso documentado, no como una migración terminada. La dificultad corresponde al caso propuesto; no equivale a una ejecución comprobada.

## Contexto académico y procedencia

Este repositorio conserva el alcance académico y los créditos disponibles en el material original. La recuperación, las correcciones y las reconstrucciones de octubre de 2026 se realizaron con asistencia de Codex/IA y se distinguen del trabajo original. La contribución individual de cada integrante no está desglosada aquí.

## Plan documentado

1. Inventariar tablas, claves, tipos, vistas, procedimientos y volumen del esquema Sales original.
2. Obtener y verificar un respaldo de origen y trabajar sobre una copia. Registrar conteos y huellas de los datos antes de transformar.
3. Configurar Oracle 19c en un entorno local separado y probar conectividad limitada a los puertos necesarios.
4. Revisar las diferencias de tipos, identidad/secuencias, fechas, Unicode y T-SQL frente a PL/SQL. Crear el esquema destino conforme al inventario real.
5. Migrar estructura y datos respetando dependencias. Comparar por tabla conteos, claves, nulos, sumas de importes y muestras deterministas.
6. Ejecutar consultas del negocio en ambos motores, documentar diferencias y ensayar restauracion antes de cambiar aplicaciones.
