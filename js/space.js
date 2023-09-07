document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");

    btnBuscar.addEventListener("click", function () {
        const busqueda = inputBuscar.value.trim();
        if (busqueda === "") {
            alert("Por favor, ingrese un término de búsqueda válido.");
            return;
        }

        // Construir la URL de la API de la NASA con el término de búsqueda
        const apiUrl = `https://images-api.nasa.gov/search?q=${busqueda}`;

        // Realizar la solicitud a la API de la NASA
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Utilizar una plantilla de cadena para construir el contenido HTML
                const html = data.collection && data.collection.items.length > 0
                    ? data.collection.items.map((item) => {
                        const imageUrl = item.links[0].href;
                        const title = item.data[0].title;
                        const description = item.data[0].description || "No disponible";
                        const dateCreated = item.data[0].date_created || "No disponible";
                        return `
                        <div class="col-md-4">
                        <div class="card custom-card">
                          <img src="${imageUrl}" class="card-img-top card-image" alt="${title}">
                          <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text" style="max-height: 100px; overflow-y: auto;">${description}</p>
                            <p class="card-text">Fecha de creación: ${dateCreated}</p>
                          </div>
                        </div>
                      </div>
                    `;
                    }).join("")
                    : "<p>No se encontraron imágenes para esta búsqueda.</p>";

                // Asignar el contenido HTML generado al contenedor
                contenedor.innerHTML = `
            <div class="row">
              ${html}
            </div>
          `;
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud a la API:", error);
                contenedor.innerHTML = "Hubo un error al buscar imágenes. Por favor, inténtelo de nuevo más tarde.";
            });
    });
});

