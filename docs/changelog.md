# 🧾 Changelog – Proyecto Artech

Todos los cambios relevantes del proyecto se documentan en este archivo.  
El formato sigue las convenciones de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)  
y las versiones respetan el esquema **SemVer (Semantic Versioning)**.

---

### [1.8.0] – 2025-12-03 🚀 Versión actual

[Versión 1.8.0](https://www.google.com/search?q=%23version-180--2025-12-03)

Proyecto Artech v1.8
Refactorización completa del flujo para implementar una arquitectura de Orquestación con el Agente de IA, separando las ramas de funcionalidad (SQL, Sheets, Excel, Drive, Email) y asegurando la respuesta correcta en cada caso (Webhook, Descarga Binaria).

🧠 General

  * **Refactorización del Flujo:** Migración de una estructura secuencial a una arquitectura de ruteo avanzada (`Switch` anidado) para mejorar la escalabilidad y claridad del *workflow*.
  * **Simplificación de Prompts:** Consolidación de todos los *system prompts* de confirmación de éxito/error en nodos *Agent* dedicados, eliminando lógica de confirmación del `AI Agent` principal.
  * **Separación de Parsers:** Creación de *parsers* dedicados para cada herramienta de salida (`ParserMail`, `ParserGoogleSheets`, `ParserDriveUploader`), garantizando la correcta extracción de datos JSON para cada rama.

⚙️ n8n Workflow

  * **Nodos de Respuesta Específicos:** Se añadieron nodos `Respond to Webhook` dedicados para cada rama para garantizar que la respuesta del servidor se adapte al resultado de la tarea (texto, binario, URL).
  * **Sticky Notes para Documentación:** Adición de *Sticky Notes* para mejorar la legibilidad y documentación del flujo principal y las ramas funcionales.

📧 EmailSender

  * **Separación de Lógica:** El envío del email y el mensaje de confirmación de éxito se han desacoplado en nodos separados (`Send a message` y `EmailSender` Agent).
  * **Nuevo Prompt de Éxito:** El `EmailSender` Agent ahora utiliza un *system prompt* detallado para generar un mensaje de confirmación que incluye una copia del contenido enviado.

📊 FileGenerator: Google Sheets (SheetsGenerator) y Excel (ExcelDownloader)

  * **División por Tipo de Output:** El flujo de generación de archivos se dividió en dos ramas utilizando un nodo `If` (`79470aaf-cdd3-4c99-8962-9bbdb54698ed`) basado en el campo `"download": "no" / "yes"`.
      * **Sheets Generator (`download: no`):** Flujo de creación de hoja de cálculo en Google Sheets, generación de URL y confirmación de `SheetSuccess`.
      * **Excel Downloader (`download: yes`):** Flujo de conversión a binario (`Convert to File`) y respuesta directa para descarga (`Respond to Webhook5`).
  * **Post-Procesamiento de Datos:** Introducción de nodos `ParserDatosSheets` y `ParserDatosExcel` para mapear los datos del array JSON en ítems individuales para el correcto manejo por los nodos `Google Sheets` y `Convert to File`.

☁️ DriveUploader

  * **Integración y Confirmación:** Uso del nodo `Create file from text` para cargar el archivo y del `DriveUploader` Agent para generar el mensaje de éxito con el link de acceso.

-----

### [1.6.0] – 2025-11-07

[Versión 1.6.0](https://www.google.com/search?q=%23version-160--2025-11-07)
Proyecto Artech v1.6
integra las últimas mejoras de lógica, prompts y flujo en n8n para la
gestión de consultas SQL, reportes y envíos automáticos de correo.

🧠 General

  * Revisión completa del prompt maestro del asistente SQL para el sistema teatral.
  * Corrección de errores ortográficos, redundancias y estructura lógica.
  * Homogeneización del formato JSON en todas las herramientas.
  * Inclusión de una cláusula de clarificación para consultas ambiguas.
    ⚙️ n8n Workflow
  * Consolidación de nodos LangChain + Google Gemini.
  * Nueva estructura modular: Admin, EmailSender, ParserMail, ParserGoogleSheets, ArchivoExitoso.
  * Implementación del flujo seguro de validación:Detección → 2. Ejecución → 3. Validación → 4. Respuesta.
  * Ajuste de la ruta de ejecución (executionOrder: v1).
  * Validación de contenido JSON con Regex mejorado.
    📧 EmailSender
  * Prioridad crítica agregada: uso obligatorio de "Send a message in Gmail" antes de cualquier acción.
  * Salida controlada en texto plano (sin JSON/Markdown).
  * Verificación de éxito o error en el envío con mensajes en español profesional.
  * Ejemplo de entrada y salida documentado.
    📊 FileGenerator y Google Sheets
  * Integración del flujo de creación y completado automático de reportes.
  * Generación de archivos .xlsx con estructura consistente (filename, sheetname, data\_summary, data).
  * Mensaje de confirmación en texto plano al finalizar el proceso.
  * Compatibilidad con DriveUploader para exportar a Google Drive.
    🔍 Seguridad y robustez
  * Limitación estricta a operaciones de lectura SQL (SELECT, COUNT, AVG, SUM).
  * Control de errores y mensajes seguros en lenguaje natural.
  * Prevención de exposición de datos sensibles.
    💬 Estilo y personalidad del asistente
  * Personalidad: profesional, cálida, expresiva y didáctica.
  * Tono natural con uso moderado de emojis.
  * Explicaciones en español claro con contexto cuando aplica.
  * Enfoque conversacional tipo guía digital del teatro.

---

## [1.5.0] – 2025-10-21
- Implementación inicial del flujo de consultas SQL con Supabase.
- Integración del modelo Google Gemini (PaLM) como LLM principal.
- Creación del módulo **EmailSender** básico.
- Estructura inicial del prompt SQL Assistant.

---

## [1.0.0] – 2025-09-24
- Primera versión funcional del flujo “Proyecto Artech”.
- Conexión base entre n8n, Supabase y Gmail.
- Ejecución simple de consultas SQL y respuestas textuales.
- Documentación técnica preliminar.

---

### 🧩 Créditos
Desarrollado por **Julián (Jota)**  
para **Artech Argentina – Fundación Pescar**.  

---
