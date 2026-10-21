# Metropolitano: mi tarjeta

Una aplicación para consultar el saldo, solicitar una tarjeta y simular recargas desde una cuenta personal.

[Ficha y evidencia en el portafolio](https://juan-coronado.github.io/projects/metropolitano-web/)

| Periodo original | Dificultad académica | Estado de esta versión |
| --- | --- | --- |
| 2024-II | Intermedia | Reconstruido y comprobado |

## Funcionalidades

- Registro, acceso y cierre de sesión.
- Solicitud de tarjeta y recarga simulada.
- Reporte de pérdida o robo y bloqueo persistente.

## Ejecución

El proyecto recuperado utiliza .NET SDK 7. Ejecutar desde la raíz del repositorio. Antes de exponerlo en producción requiere actualizar el runtime y sustituir el almacenamiento local por una solución transaccional.

```powershell
dotnet run --project programa --urls http://127.0.0.1:4323
```

Crear una cuenta desde la interfaz; no existen credenciales predeterminadas. App_Data contiene los datos de cada instalación y está excluido del repositorio. Las recargas son simuladas y no mueven dinero.

## Comprobación disponible

Compilado con .NET 7. Probados registro, acceso, CSRF, saldo, recargas inválidas, bloqueo y persistencia. Interfaz comprobada en navegador.

Ejecutar desde la raíz del repositorio. Iniciar primero el servidor; la prueba crea una cuenta ficticia.

```powershell
python tests/http_test.py
```

[Registro de pruebas](evidencia/pruebas.txt)

![Captura real del panel después de una recarga simulada de S/25.](evidencia/aplicacion.jpg)

Las comprobaciones anteriores corresponden a la recuperación de octubre de 2026; esta publicación conserva sus registros.

## Aprendizaje

- Conectar formularios, modelos y vistas MVC.
- Gestionar autenticación, validación y estados persistentes.

## Revisión para el portafolio

- Reconstruida la solución desde el PDF recibido.
- Persistencia JSON local, hashes de contraseña y protección antifalsificación.

## Alcance

Demostración local sin operador de transporte ni dinero real. El JSON sustituye el servicio Excel incompleto del informe; para un despliegue real necesita almacenamiento transaccional y un runtime soportado.

## Contexto académico y procedencia

Este repositorio conserva el alcance académico y los créditos disponibles en el material original. La recuperación, las correcciones y las reconstrucciones de octubre de 2026 se realizaron con asistencia de Codex/IA y se distinguen del trabajo original. La contribución individual de cada integrante no está desglosada aquí.
