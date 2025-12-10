# 🎭 Proyecto Artech — Orquestador Automatizado (n8n)

**Proyecto Artech** es un workflow avanzado construido en **n8n** que funciona como un **orquestador inteligente** para un sistema de ticketing teatral utilizando un agente SQL basado en IA.
Permite ejecutar consultas seguras, generar reportes, enviar correos, subir archivos a Google Drive y descargar Excel, todo desde un único webhook.

---

<img width="1314" height="654" alt="Captura de pantalla 2025-12-10 105539" src="https://github.com/user-attachments/assets/6ebe8efc-a619-4e25-baf8-f4da076f8a62" />

## 🚀 Funcionalidades Principales

### 1. 🤖 **Agente de IA (AI Agent)**

* Recibe prompts del usuario vía webhook.
* Interpreta consultas SQL para una base PostgreSQL (Supabase).
* Convierte texto natural en **SELECT seguros**, agregados y estadísticas.
* Detecta automáticamente cuándo el usuario quiere:

  * Generar un archivo interno
  * Descargar un Excel
  * Enviar un mail
  * Subir un archivo a Drive
* Produce exclusivamente JSON válido dependiendo de la herramienta requerida.

### 2. 🗄️ **Consultas SQL a Supabase**

* El agente usa el nodo **Execute a SQL query in Postgres**.
* Solo permite:

  * SELECT
  * COUNT / SUM / AVG
  * Lectura, nunca escritura.
* Rechaza campos o tablas inexistentes.

---

## 📁 Herramientas Integradas

### 📊 **SheetsGenerator (Crear archivo de Sheets)**

Genera una hoja de cálculo interna.
Incluye:

* `filename`
* `sheetname`
* `data`
* `data_summary`
* `download: no`

### 📥 **ExcelDownloader (Descargar Excel)**

Devuelve un archivo `.xlsx` directamente en la respuesta del webhook.
Incluye:

* `filename`
* `sheetname`
* `data`
* `data_summary`
* `download: yes`

### 🗂️ **DriveUploader (Subir archivo a Google Drive)**

Crea un archivo `.txt` en Google Drive con:

* `filename: nombre_fecha_hora.txt`
* `content: texto formateado`

### 📧 **EmailSender**

Envía un correo usando Gmail OAuth2.
Requiere:

* `mail`
* `subject`
* `message`

---

## 🧠 Lógica Interna del Orquestador

### 🔀 **Switch + Parsers**

El workflow distingue automáticamente entre:

* JSON de Email
* JSON de Sheets
* JSON de Drive
* JSON de Excel
* Errores o contenido no reconocido

Cada ruta tiene su parser correspondiente para:

* Normalizar datos
* Reconvertir contenido en formato n8n
* Preparar estructuras finales

### 📄 **Creación de archivos**

Incluye:

* Google Sheets (Create + Append)
* Google Drive (texto)
* Conversión a archivo Excel binario

### 🔁 **Respuestas estructuradas**

Cada herramienta retorna un mensaje final formateado para el usuario mediante modelos Gemini conectados a n8n.

---

## 🧩 Estructura del Proyecto

El workflow incluye los siguientes nodos:

* Webhook (entrada principal)
* AI Agent (lenguaje + SQL)
* Gemini Chat Models (4 instancias)
* Postgres Tool
* Switch / If / Merge
* Parsers (Sheets, Excel, Drive, Mail)
* Google Sheets (Create + Append)
* Google Drive (Create file)
* Gmail Sender
* Convert to File (Excel)
* Respond to Webhook (5 instancias)

---

## 🚀 Ejecución

### 1. **Enviar un POST al webhook**

Ruta del webhook:

```
/webhook/proyecto-artech-grupo2
```

El body debe incluir:

```json
{
  "prompt": "tu consulta aquí"
}
```

### 2. **El agente interpreta la intención**

* SQL → Ejecuta consulta
* “descargar excel” → ExcelDownloader
* “crear planilla” → SheetsGenerator
* “enviar mail a…” → EmailSender
* “subir archivo” → DriveUploader

### 3. **Respuesta limpia y formateada**

Dependiendo de la herramienta:

* JSON
* Archivo binario descargable
* Link a Google Drive
* Confirmación de envío de email

---

## 📚 Esquema de Base de Datos Compatible (Supabase)

Tablas soportadas:

* Obras
* Salas
* Funciones
* Ubicaciones
* Precios
* MediosPago
* Clientes
* Actores
* Obras_Actores
* Entradas

Reglas:

* No inventar campos
* No manipular datos
* Solo lectura

---

## 🛡️ Seguridad

* Autenticación BasicAuth en el webhook.
* Validación estricta de SQL.
* Generación de JSON sin texto adicional.
* Prohibición de inventar datos en resúmenes de archivos.
* Validación de email mediante regex.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**, por lo que puede ser usado y adaptado libremente con fines educativos o profesionales.

---

## ✨ Autor

**Proyecto desarrollado por:**  
**Artech Argentina – Fundación Pescar**  
*(Pasantía Técnica – 2025)*  

Integración y diseño del flujo por **Julián Duarte**.
