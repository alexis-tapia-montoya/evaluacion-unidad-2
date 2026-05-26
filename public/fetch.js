document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('form-registro');
    const btnCargar = document.getElementById('btn-cargar');
    const listaUsuarios = document.getElementById('lista-usuarios');
    const btnBuscar = document.getElementById('btn-buscar');
    const inputId = document.getElementById('buscar-id');
    const contenedorDetalle = document.getElementById('detalle-alumno');

    const HEADERS_ENVIO = {
        'Content-Type': 'application/json',
        'Authorization': 'admin-token-123'
    };

    if (formRegistro) {
        formRegistro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const datosFormulario = {
                rut: document.getElementById('rut').value.trim(),
                nombre: document.getElementById('nombre').value.trim(),
                apellido: document.getElementById('apellido').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                carrera: document.getElementById('carrera').value.trim()
            };

            try {
                const respuesta = await fetch('/api/items', {
                    method: 'POST',
                    headers: HEADERS_ENVIO,
                    body: JSON.stringify(datosFormulario)
                });

                if (respuesta.status === 201) {
                    alert('¡Éxito! Alumno guardado correctamente.');
                    formRegistro.reset();
                } else {
                    alert('Error al guardar datos.');
                }
            } catch (error) {
                alert('No se pudo conectar con el servidor.');
            }
        });
    }

    if (btnCargar) {
        btnCargar.addEventListener('click', async () => {
            try {
                const respuesta = await fetch('/api/items');
                const datos = await respuesta.json();

                listaUsuarios.innerHTML = '';
                datos.forEach(alumno => {
                    const li = document.createElement('li');
                    li.textContent = `[ID: ${alumno.id}] ${alumno.nombre} ${alumno.apellido} - ${alumno.carrera}`;
                    listaUsuarios.appendChild(li);
                });
            } catch (error) {
                console.error(error);
            }
        });
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', async () => {
            const id = inputId.value.trim();
            if (!id) return;

            try {
                const respuesta = await fetch(`/api/items/${id}`);
                if (respuesta.status === 404) {
                    contenedorDetalle.innerHTML = '<p style="color: red;">Alumno no encontrado.</p>';
                    return;
                }

                const alumno = await respuesta.json();
                contenedorDetalle.innerHTML = `
                    <div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; margin-top:10px;">
                        <p><strong>Nombre:</strong> ${alumno.nombre} ${alumno.apellido}</p>
                        <p><strong>Carrera:</strong> ${alumno.carrera}</p>
                    </div>
                `;
            } catch (error) {
                console.error(error);
            }
        });
    }
});