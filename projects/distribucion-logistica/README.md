# Distribucion logistica con automatas

Proyecto grupal de Teoria de Computacion, ciclo 2025-I. Se conserva el programa C++, el automata editable JFLAP y su flujo de estados. Correcciones de octubre de 2026: lotes unicos, fechas reales, salida al terminar la entrada y estado correcto cuando quedan varias excepciones.

## Arquitectura

Lote registra mercaderia, fechas y estado. Un vector conserva los lotes y otro implementa la pila LIFO de excepciones. Flujo: Recepcion, Inspeccion, Procesamiento, Empaquetado, Despacho, Entregado; la inspeccion puede rechazar. El proceso no avanza mientras hay excepciones. Persistencia no incluida en el original: los registros duran la sesion.

## Ejecutar y verificar

En Developer PowerShell: `cl /nologo /std:c++17 /EHsc /utf-8 "programa/Codigo - Trabajo Final Grupo 5 (1).cpp" /Fe:logistica.exe`. Compilar tests/estados.cpp de igual forma para comprobar transiciones, duplicados, fechas, excepciones acumuladas y rechazo. Se ejecuto ademas un recorrido completo con pausa por excepcion y entrega final; evidencia/ejecucion.txt.

## Aprendizaje

Automatas finitos, pila LIFO, transiciones y trazabilidad de estados. Dificultad intermedia.
