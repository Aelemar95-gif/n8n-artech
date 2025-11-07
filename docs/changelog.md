# 🧾 Changelog – Proyecto Artech

Todos los cambios relevantes del proyecto se documentan en este archivo.  
El formato sigue las convenciones de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)  
y las versiones respetan el esquema **SemVer (Semantic Versioning)**.

---

## [1.6.0] – 2025-11-07
### 🚀 Versión actual
**Proyecto Artech v1.6** integra las últimas mejoras de lógica, prompts y flujo en n8n para la gestión de consultas SQL, reportes y envíos automáticos de correo.

#### 🧠 General
- Revisión completa del **prompt maestro** del asistente SQL para el sistema teatral.  
- Corrección de errores ortográficos, redundancias y estructura lógica.  
- Homogeneización del formato JSON en todas las herramientas.  
- Inclusión de una cláusula de clarificación para consultas ambiguas.

#### ⚙️ n8n Workflow
- Consolidación de nodos **LangChain + Google Gemini**.  
- Nueva estructura modular: `Admin`, `EmailSender`, `ParserMail`, `ParserGoogleSheets`, `ArchivoExitoso`.  
- Implementación del flujo seguro de validación:  
  1. Detección → 2. Ejecución → 3. Validación → 4. Respuesta.  
- Ajuste de la ruta de ejecución (`executionOrder: v1`).  
- Validación de contenido JSON con Regex mejorado.

#### 📧 EmailSender
- Prioridad crítica agregada: uso obligatorio de `"Send a message in Gmail"` antes de cualquier acción.  
- Salida controlada en texto plano (sin JSON/Markdown).  
- Verificación de éxito o error en el envío con mensajes en español profesional.  
- Ejemplo de entrada y salida documentado.

#### 📊 FileGenerator y Google Sheets
- Integración del flujo de creación y completado automático de reportes.  
- Generación de archivos `.xlsx` con estructura consistente (`filename`, `sheetname`, `data_summary`, `data`).  
- Mensaje de confirmación en texto plano al finalizar el proceso.  
- Compatibilidad con `DriveUploader` para exportar a Google Drive.

#### 🔍 Seguridad y robustez
- Limitación estricta a operaciones de lectura SQL (`SELECT`, `COUNT`, `AVG`, `SUM`).  
- Control de errores y mensajes seguros en lenguaje natural.  
- Prevención de exposición de datos sensibles.

#### 💬 Estilo y personalidad del asistente
- Personalidad: profesional, cálida, expresiva y didáctica.  
- Tono natural con uso moderado de emojis.  
- Explicaciones en español claro con contexto cuando aplica.  
- Enfoque conversacional tipo *guía digital del teatro*.

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
Documentado y optimizado con asistencia técnica de **GPT-5**.

---
