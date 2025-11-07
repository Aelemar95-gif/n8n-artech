# 🎭 Proyecto Artech — Asistente Inteligente de Ticketing Teatral (n8n + Google Gemini + Supabase)

## 📘 Descripción General

**Proyecto Artech** es un flujo automatizado desarrollado en **n8n** que integra inteligencia artificial, bases de datos y herramientas de Google para gestionar de manera inteligente las consultas, reportes y comunicaciones de un **sistema de boletería teatral**.  

El sistema permite interactuar en lenguaje natural con una IA especializada en datos teatrales, la cual:
- Interpreta consultas sobre funciones, actores, obras o ventas.  
- Genera y ejecuta consultas SQL seguras en una base de datos PostgreSQL (Supabase).  
- Crea reportes en hojas de cálculo de Google Sheets.  
- Envía correos automáticos con los resultados o informes solicitados.  

Todo esto ocurre dentro del ecosistema **n8n**, utilizando **Google Gemini (PaLM)** como modelo de lenguaje principal.

---

## 🧩 Arquitectura del Flujo

El flujo está compuesto por varios módulos conectados entre sí para procesar diferentes tipos de solicitudes:

### 1. **Entrada de Chat**
- **Nodo:** `When chat message received`
- **Función:** Activa el flujo al recibir un mensaje del usuario (desde un chat o interfaz conectada).  
- **Salida:** Redirige el mensaje al agente principal (`Admin`).

---

### 2. **Agente Principal (Admin)**
- **Nodo:** `@n8n/n8n-nodes-langchain.agent`
- **Rol:** Orquesta toda la lógica del sistema.  
- **Personalidad:** Amigable, profesional y expresiva (usa emojis de forma natural).  
- **Funciones:**
  - Recibir las preguntas del usuario.
  - Convertirlas en consultas SQL seguras (solo lectura: `SELECT`, `COUNT`, `SUM`, etc.).
  - Ejecutar esas consultas usando el **PostgresTool**.
  - Responder en lenguaje natural con el resumen de resultados.
  - Detectar si el usuario desea un **reporte** o un **envío por email**, y redirigir a los módulos correspondientes.

---

### 3. **Módulo de Base de Datos**
- **Nodo:** `Execute a SQL query in Postgres`
- **Conexión:** Supabase (PostgreSQL)
- **Función:** Ejecuta las consultas SQL generadas por la IA para extraer información en tiempo real.

#### 🗄️ Estructura de Base de Datos

El sistema maneja entidades teatrales interrelacionadas:
- **Obras** (Título, Género, Descripción)
- **Funciones** (Obra, Sala, Fecha, Hora)
- **Salas / Ubicaciones**
- **Precios / Entradas / Medios de Pago**
- **Clientes y Actores**
- **Relaciones:** `Obras_Actores` vincula actores con obras y roles.

---

### 4. **Módulo de Envío de Correos (EmailSender)**
- **Nodo:** `EmailSender`  
- **IA:** Google Gemini (modelo `gemini-2.0-flash`)  
- **Integración:** Gmail (OAuth2)  
- **Función:**  
  - Recibe un JSON con los campos `mail`, `subject`, `message`.  
  - **PRIORIDAD:** Ejecuta la herramienta **"Send a message in Gmail"** antes de cualquier otra acción.  
  - Verifica si el envío fue exitoso e informa el resultado al usuario.

**Ejemplo de salida exitosa:**

```
Tu mail se envió exitosamente!!! Esta es una copia del mail que envié; debería estar en tu casilla de correo.
No olvides revisar spam o correo no deseado. ¡Gracias!

Email: ejemplo@mail.com  
Subject: Request: Actores y horarios de Hamlet  
Message:  
Estimado/a,  

En respuesta a su solicitud, le enviamos la información sobre la obra Hamlet...
```

---

### 5. **Módulo de Reportes (Sheets)**
*(Actual versión deshabilitada, pero diseñada para futuras extensiones)*

- **Objetivo:** Generar automáticamente hojas de cálculo en Google Sheets con reportes solicitados por el usuario.
- **Formato esperado:**
```json
{
  "filename": "reporte_actores_Hamlet_2025_11_03.xlsx",
  "sheetname": "reporte_actores_Hamlet",
  "data_summary": "Resumen del contenido del reporte",
  "data": [ ... ]
}
```
- **Resultado:** Crea el archivo, lo guarda en Google Drive y devuelve un mensaje de confirmación amigable.

---

### 6. **Lógica Condicional**
- **Nodo:** `Switch`  
- **Función:** Decide el flujo según el tipo de salida:
  - Si contiene `"mail":` → Dirige al módulo de correo.  
  - Si contiene `"data": [` → Dirige al módulo de reporte.  
  - Si no coincide → Devuelve la respuesta del agente principal.

---

### 7. **Módulos de Parsing (Código)**
Para limpiar y transformar los datos JSON entre herramientas:
- **`Parse Mail`** → Extrae `mail`, `subject`, `message` desde la salida JSON de Gemini.  
- **`ParseSheet`** → Limpia los datos del generador de reportes antes de enviarlos a Google Sheets.  
- **`ParseNombre`** y **`ParseDatos`** → Vinculan identificadores de hoja y contenido antes de la inserción.

---

## 🧠 Modelo de IA

El sistema usa **Google Gemini (PaLM API)** con integración nativa en n8n a través de los nodos `@n8n/n8n-nodes-langchain`.  
Se emplea en tres niveles:
1. **Comprensión del lenguaje natural y generación de SQL.**
2. **Creación de respuestas conversacionales.**
3. **Automatización de mensajes de correo electrónico.**

---

## 🔐 Conexiones y Credenciales

> ⚠️ Ninguna credencial sensible está incluida en este repositorio.

El proyecto requiere configurar las siguientes integraciones dentro de n8n:

| Servicio | Nodo | Descripción |
|-----------|------|-------------|
| **Google Gemini (PaLM)** | `lmChatGoogleGemini` | Procesamiento de lenguaje natural |
| **Supabase (Postgres)** | `postgresTool` | Base de datos principal |
| **Gmail OAuth2** | `gmailTool` | Envío de correos automatizados |
| **Google Sheets OAuth2** | `googleSheets` | Creación y actualización de reportes |

---

## 🚀 Ejemplo de Flujo Conversacional

**Usuario:**  
> “Mostrame los actores de Hamlet y mandalos por mail a ejemplo@mail.com”

**IA (Admin):**
1. Interpreta la intención del usuario.  
2. Genera una consulta SQL segura para obtener los actores de la obra.  
3. Ejecuta la consulta en Supabase.  
4. Construye un JSON con los datos y la dirección de correo.  
5. Envía el correo a través de Gmail.  
6. Devuelve un mensaje confirmando el envío exitoso.

---

## 🧱 Tecnologías y Herramientas

- **n8n** – Automatización visual de flujos de trabajo.  
- **LangChain (n8n integration)** – Manejo de agentes de IA.  
- **Google Gemini (PaLM)** – Procesamiento de lenguaje natural.  
- **PostgreSQL (Supabase)** – Base de datos transaccional.  
- **Gmail API** – Envío de correos.  
- **Google Sheets API** – Creación de reportes dinámicos.  

---

## ⚙️ Requisitos Previos

- Tener instalado **n8n** (v1.8 o superior).  
- Contar con claves de acceso y credenciales OAuth2 para:
  - Google Gemini / PaLM API  
  - Supabase (PostgreSQL)  
  - Gmail  
  - Google Sheets  
- Importar el flujo `Proyecto Artech.json` desde la interfaz de n8n.  

---

## 🧭 Futuras Extensiones

- Habilitar el módulo de **reportes automáticos** con exportación a Drive.  
- Agregar soporte para **descarga directa de archivos** (XLSX/CSV).  
- Integrar métricas y dashboards para el área administrativa del teatro.  
- Permitir consultas analíticas (ej. ventas mensuales, ocupación, etc.).

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**, por lo que puede ser usado y adaptado libremente con fines educativos o profesionales.

---

## ✨ Autor

**Proyecto desarrollado por:**  
**Artech Argentina – Fundación Pescar**  
*(Pasantía Técnica – 2025)*  

Integración y diseño del flujo por **Julián Duarte**.
