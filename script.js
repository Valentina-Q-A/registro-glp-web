// Actualizar valores de sliders en tiempo real
const sliders = [
    {id: "nivelTanque", span: "nivelTanqueValue", unit: "%"},
    {id: "presionTanque", span: "presionTanqueValue", unit: "PSI"},
    {id: "tempTanque", span: "tempTanqueValue", unit: "°C"},
    {id: "nivelCisterna", span: "nivelCisternaValue", unit: "%"},
    {id: "presionBomba", span: "presionBombaValue", unit: "PSI"},
    {id: "tempVapor", span: "tempVaporValue", unit: "°C"},
    {id: "presionVapor", span: "presionVaporValue", unit: "PSI"},
    {id: "presionMezcla", span: "presionMezclaValue", unit: "PSI"},
];

sliders.forEach(s => {
    const slider = document.getElementById(s.id);
    const span = document.getElementById(s.span);
    slider.addEventListener('input', () => {
        span.textContent = slider.value + " " + s.unit;
    });
});

// Form submit
document.getElementById("glpForm").addEventListener("submit", async function(e){
    e.preventDefault();

    // Validar Encargado
    const encargado = document.getElementById("encargado").value.trim();
    if(!encargado){
        alert("El campo ENCARGADO es obligatorio");
        return;
    }

    // Crear objeto JSON
    const data = {
        Fecha: document.getElementById("fecha").value,
        Hora: document.getElementById("hora").value,
        NivelTanque: document.getElementById("nivelTanque").value,
        PresionTanque: document.getElementById("presionTanque").value,
        TempTanque: document.getElementById("tempTanque").value,
        NivelCisterna: document.getElementById("nivelCisterna").value,
        CapacidadCisterna: document.getElementById("capacidadCisterna").value,
        PlacaCisterna: document.getElementById("placaCisterna").value,
        PresionBomba: document.getElementById("presionBomba").value,
        TempVapor: document.getElementById("tempVapor").value,
        PresionVapor: document.getElementById("presionVapor").value,
        PresionMezcla: document.getElementById("presionMezcla").value,
        Observaciones: document.getElementById("observaciones").value,
        Encargado: encargado
    };

    try {
        const siteURL = "https://orgcorona-my.sharepoint.com/personal/mvquiroga_corona_com_co/Lists/RegistrosGLP";
        const listName = "RegistrosGLP"; // nombre exacto de la lista

        const response = await fetch(`${siteURL}/_api/web/lists/getbytitle('${listName}')/items`, {
            method: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "odata-version": ""
            },
            body: JSON.stringify({
                "__metadata": { "type": "SP.Data.RegistrosGLPListItem" },
                ...data
            })
        });

        if(response.ok){
            alert("Registro agregado con éxito");
            document.getElementById("glpForm").reset();
            sliders.forEach(s => {
                document.getElementById(s.span).textContent = document.getElementById(s.id).value + " " + s.unit;
            });
        } else {
            alert("Error al enviar el registro a SharePoint");
        }
    } catch(err) {
        console.error(err);
        alert("Error de conexión con SharePoint");
    }
});