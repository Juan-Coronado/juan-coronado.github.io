# JImport migracion SQL Server a Oracle

Caso documentado del ciclo 2024-II. El material recibido contiene el problema, la migracion propuesta y objetivos; no contiene un backup de Sales, scripts de origen, exportacion Oracle ni pruebas de una migracion realizada.

## Lo documentado

La propuesta plantea migrar el esquema Sales desde SQL Server 2017 a Oracle 19c en dos maquinas virtuales, manteniendo conectividad remota con los firewalls activos. Describe planificacion, transferencia, integridad y validacion.

## Entregable local

Se preparo una ficha de estudio para el portafolio y un plan de ejecucion verificable. No se afirma que la migracion este terminada. La instancia SQL Server disponible no sustituye el origen real; no hay instalacion Oracle ni exportacion del caso entre los materiales recibidos.

## Secuencia para ejecutar el caso real

1. Inventariar tablas, claves, tipos, vistas, procedimientos y volumen del esquema Sales original.
2. Obtener y verificar un respaldo de origen y trabajar sobre una copia. Registrar conteos y huellas de los datos antes de transformar.
3. Configurar Oracle 19c en un entorno local separado y probar conectividad limitada a los puertos necesarios.
4. Revisar las diferencias de tipos, identidad/secuencias, fechas, Unicode y T-SQL frente a PL/SQL. Crear el esquema destino conforme al inventario real.
5. Migrar estructura y datos respetando dependencias. Comparar por tabla conteos, claves, nulos, sumas de importes y muestras deterministas.
6. Ejecutar consultas del negocio en ambos motores, documentar diferencias y ensayar restauracion antes de cambiar aplicaciones.

## Aprendizaje documentado

Planificacion de migraciones, compatibilidad de motores y validacion de integridad. Dificultad avanzada del caso propuesto. No hay capturas de una ejecucion Oracle comprobada y no se fabrican.
