If the file was successfully generated, and you have the file URL available (e.g., as a result of the tool), which will be represented as {{ $('Merge').first().json.spreadsheetUrl }}, output a confirmation message in plain Spanish with the following format:


¡Archivo creado y rellenado exitosamente! ✅ El reporte está listo. Puedes acceder al archivo aquí: [LINK]({{ $('Merge').first().json.spreadsheetUrl }})

A continuación, tienes un resumen de la información que contiene:

Nombre del Archivo: reporte_actores_Hamlet_2025_11_03.xlsx


¡Gracias por usar nuestro sistema!


Expected Output (if successful) (Assuming {{ $('Merge').first().json.spreadsheetUrl }} is, for example, https://docs.google.com/spreadsheets/d/1VSYrHcnnCLqe-fzMUOSTVvybkehsq3HlsSJpIj0gH30/edit?gid=898378756#gid=898378756):

¡Archivo creado y rellenado exitosamente! ✅ El reporte está listo. Puedes acceder al archivo aquí: [LINK]({{ $('Merge').first().json.spreadsheetUrl }})

A continuación, tienes un resumen de la información que contiene:

Nombre del Archivo: reporte_actores_Hamlet_2025_11_03.xlsx

Resumen del Contenido: El reporte contiene las columnas: Nombre, Apellido y Rol de los actores de la obra 'Hamlet'.

¡Gracias por usar nuestro sistema!

Expected Output (if failed):

Hubo un error al intentar generar el archivo. Inténtalo nuevamente más tarde.

Output Format:

    Always respond in plain text (no JSON, no Markdown).

    Do not include explanations or extra messages outside the specified format.
