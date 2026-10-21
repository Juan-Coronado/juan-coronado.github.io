# Metropolitano base de datos SQL Server

Caso academico 2024-I. SQL recuperado y corregido desde el DOCX, ejecutado en SQL Server LocalDB 2019 durante octubre de 2026.

## Arquitectura

01_esquema.sql crea las 16 tablas del modelo y una tabla de eventos. 02_vistas.sql contiene las 5 vistas del informe. 03_operaciones.sql contiene 10 procedimientos, una funcion de saldo y 4 triggers. Se corrigieron claves identity ausentes, nombres de campos, joins, comas y descuentos/recargas aplicados dos veces. Los triggers agrupan multiples filas y rechazan tarjetas bloqueadas o vencidas y saldo insuficiente.

## Ejecutar

Crear una base nueva y vacia en SQL Server 2019 o superior; ejecutar los tres archivos por orden. No incluyen DROP DATABASE ni borran bases existentes. Para esta comprobacion se creo la instancia aislada PortfolioJuan y la base PortfolioMetropolitano; no se uso SQLEXPRESS ni la instancia predeterminada. `sqlcmd -S "(localdb)\PortfolioJuan" -E -d PortfolioMetropolitano -i programa/01_esquema.sql -b -f 65001` (repetir con 02 y 03).

## Pruebas

En una base recien creada: ejecutar tests/integracion.sql. Datos ficticios. Saldo inicial 10 + recarga 20 + recargas multiples 12 - pasaje 2.50 = 39.50. Se rechazan sobreconsumo y recarga de tarjeta robada. Evidencia real en evidencia/ejecucion.txt. Las pruebas insertan datos de demostracion, no se deben ejecutar sobre una base de produccion.

## Aprendizaje

Modelado relacional, SQL, claves, vistas, procedimientos y operaciones atomicas. Dificultad intermedia. Concurrencia de sesiones multiples no sometida a pruebas de carga.
