# Metropolitano web

Proyecto de Gestion de Procesos, ciclo 2024-II. Reconstruccion funcional de octubre de 2026 desde el PDF recibido; no se disponia de la solucion ASP.NET original.

## Arquitectura

ASP.NET MVC: modelos y reglas en Store.cs, controladores de acceso/tarjetas y vistas Razor. Misma funcionalidad documentada: registro, ingreso, solicitud, saldo, recarga simulada y reporte de robo. Se usa almacenamiento JSON local atomico en vez del servicio Excel incompleto del informe; no requiere paquetes externos. Se guardan hashes de contrasena, cookies cifradas y tokens antifalsificacion. App_Data no se sirve por HTTP.

## Ejecutar

Con .NET SDK 7 disponible: `dotnet run --project programa --urls http://127.0.0.1:4323`. Crear cuenta desde la web; no existen credenciales predeterminadas. Los datos se guardan en programa/App_Data, excluido de las descargas y del control de versiones.

Este entorno es una demostracion local, sin operador de transporte, correos ni cobros reales. El limite de una recarga de prueba es S/1000. La persistencia JSON es para un solo proceso; antes de un despliegue multiusuario debe usarse almacenamiento transaccional y un runtime soportado.

## Verificacion

Con el servidor iniciado: `python tests/http_test.py`. Comprueba autenticacion, CSRF, solicitud, recarga, rechazo de monto negativo, bloqueo, persistencia y que los archivos privados no se publiquen. La prueba crea una cuenta ficticia aislada.

## Aprendizaje

MVC web, formularios, autenticacion, estados de una tarjeta y persistencia. Dificultad intermedia.
