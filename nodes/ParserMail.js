let fullOutput = $input.first().json.output;

// Expresión regular para encontrar el contenido dentro del primer bloque ```json...```
const jsonMatch = fullOutput.match(/```json\s*([\s\S]*?)\s*```/);

if (!jsonMatch || jsonMatch.length < 2) {
    throw new Error("No se pudo encontrar o extraer el bloque JSON esperado.");
}

// jsonMatch[1] contendrá el JSON limpio
const jsonString = jsonMatch[1].trim();

// 2. Parsear la cadena de texto limpia a un objeto JSON
const data = JSON.parse(jsonString);

// 3. Retornar los campos específicos
return {
    mail: data.mail,
    subject: data.subject,
    message: data.message,
};
