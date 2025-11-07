// 1. Acceder y extraer la información de la Hoja/Pestaña (Ítem 0)
const sheetData = items[0].json;
// El array de datos anidados se encuentra en el segundo ítem (índice 1)
// bajo la estructura: items[1].json.data
const nestedDataArray = items[1].json.data;

// Mapea el array anidado para extraer el objeto JSON plano de cada elemento.
// Cada elemento de 'nestedDataArray' tiene la forma { json: { data_plana } }.
const flatItems = nestedDataArray.map(item => ({
    // El 'json: item.json' toma el objeto plano y lo convierte en el 'json' 
    // del ítem de salida de n8n.
    json: item.json
}));

// Devuelve el array final de ítems planos.
// Ejemplo de salida: [ { json: { Nombre: 'Celeste', Apellido: 'Cid', Rol: '...' } }, ... ]
return flatItems;
