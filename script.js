// Crea un json que contendrá un listado de objetos película, dónde cada película
// tiene un nombre y un precio

// Deberás generar automáticamente:
// - Importar el json creado (usando fetch) y usar sus valores para crear las opciones y modificar los precios
// - La creación de las filas y asientos: <div class="seat"></div>    ./
// - Algunos asientos de manera aleatoria estarán ocupados			./

// Ampliación: Crear un input para crear filas de asientos dinámicas
// Ampliación: Posicionar en la pantalla del cine, una imágen de la película seleccionada
document.addEventListener('DOMContentLoaded', function () {

	let contador;
	let main = document.getElementById('main');
	let precioTotal = document.getElementById('total');
	let butacasTotal = document.getElementById('count');
	let e = document.getElementById("movie");

	async function listadoPeliculas() {
		const response = await fetch(`./peliculones.json`);
		const data = await response.json();
		return data;
	}

	async function calcularAsientosSeleccionados() {
		let seats = document.querySelectorAll('.selected');
		contador = seats.length;
		contador--;
		let value = e.options[e.selectedIndex].value;
		let text = e.options[e.selectedIndex].text;
		const data = await listadoPeliculas();
		let precioPeliculaElegida = data[text][0].precio;
		butacasTotal.innerHTML = contador;
		precioTotal.innerHTML = contador * precioPeliculaElegida;
	}

	function crearContenedor() {
		let contenedor = document.createElement("div");
		contenedor.classList.add('container');
		let pantalla = document.createElement("div");
		pantalla.classList.add('screen');
		contenedor.appendChild(pantalla)
		let ocupada = Math.floor(Math.random() * 7);
		for (let i = 0; i < 6; i++) {
			let row = document.createElement("div");
			row.classList.add("row");
			for (let j = 0; j < 7; j++) {
				let butaca = document.createElement("div");
				butaca.id = j;
				butaca.classList.add("seat");
				if (butaca.id == ocupada) {
					butaca.classList.add("occupied");
				}
				butaca.addEventListener("click", function () {
					if (!butaca.classList.contains("occupied")) {
						butaca.classList.toggle("selected");//si esta selected lo quita , sino lo pone eso lo hace el toggle
					}
					calcularAsientosSeleccionados();
				});
				row.appendChild(butaca);
			}
			contenedor.appendChild(row);
		};
		return contenedor;
	}
	main.appendChild(crearContenedor());
});