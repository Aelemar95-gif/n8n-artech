let fullOutput = $input.first().json.output;

// Expresión regular para encontrar el contenido dentro del primer bloque ```json...```
const jsonMatch = fullOutput.match(/```json\s*([\s\S]*?)\s*```/);

if (!jsonMatch || jsonMatch.length < 2) {
    throw new Error("No se pudo encontrar o extraer el bloque JSON esperado.");
}

// jsonMatch[1] contendrá el JSON limpio
const jsonString = jsonMatch[1].trim();

// Parsear la cadena de texto limpia a un objeto JSON
const data = JSON.parse(jsonString);

//Retornar los campos específicos
return {
    filename: data.filename,
    sheetname: data.sheetname,
    data_summary: data.data_summary,
    data: data.data
};
