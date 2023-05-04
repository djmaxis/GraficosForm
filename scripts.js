document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");
  const grafica = document.getElementById("grafica");
  const graficaLineas = document.getElementById("graficaLineas");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const nombreProducto = document.getElementById("nombre_producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);
    const tipo = document.getElementById("tipo").value;

    const item = {
      fecha,
      nombreProducto,
      cantidad,
      precio, 
	  tipo,
};

guardarEnLocalStorage(item);
actualizarGrafica();
	  
});

function guardarEnLocalStorage(item) {
let items = JSON.parse(localStorage.getItem("inventario")) || [];
items.push(item);
localStorage.setItem("inventario", JSON.stringify(items));
}

function obtenerDeLocalStorage() {
return JSON.parse(localStorage.getItem("inventario")) || [];
}

function actualizarGrafica() {
const items = obtenerDeLocalStorage();
	
entradas = items.filter((item) => item.tipo === "entrada");
salidas = items.filter((item) => item.tipo === "salida");

const entradaData = entradas.map((item) => ({ x: item.fecha, y: item.cantidad, text: item.nombreProducto }));
const salidaData = salidas.map((item) => ({ x: item.fecha, y: item.cantidad, text: item.nombreProducto }));

const traceEntradas = {
  x: entradaData.map((item) => item.x),
  y: entradaData.map((item) => item.y),
  text: entradaData.map((item) => item.text),
  name: "Entradas",
  type: "bar",
  marker: {
    color: "blue",
  },
  textposition: 'auto',
  hovertemplate: '%{text}<br>Cantidad: %{y}<extra></extra>'
};

const traceSalidas = {
  x: salidaData.map((item) => item.x),
  y: salidaData.map((item) => item.y),
  text: salidaData.map((item) => item.text),
  name: "Salidas",
  type: "bar",
  marker: {
    color: "red",
  },
  textposition: 'auto',
  hovertemplate: '%{text}<br>Cantidad: %{y}<extra></extra>'
};

const data = [traceEntradas, traceSalidas];

const layout = {
  title: "Entradas y Salidas de Mercancías",
  barmode: "group",
};

Plotly.newPlot(grafica, data, layout);

// Gráfico de líneas
const entradaValorTotal = entradas.map((item) => item.cantidad * item.precio);
const salidaValorTotal = salidas.map((item) => item.cantidad * item.precio);

const traceEntradasLinea = {
  x: entradas.map((item) => item.fecha),
  y: entradaValorTotal,
  text: entradas.map((item) => item.nombreProducto),
  name: "Valor total de entradas",
  type: "scatter",
  mode: "lines+markers",
  line: {
    color: "blue",
  },
  hovertemplate: '%{text}<br>Valor total: %{y}<extra></extra>'
};

const traceSalidasLinea = {
  x: salidas.map((item) => item.fecha),
  y: salidaValorTotal,
  text: salidas.map((item) => item.nombreProducto),
  name: "Valor total de salidas",
  type: "scatter",
  mode: "lines+markers",
  line: {
    color: "red",
  },
  hovertemplate: '%{text}<br>Valor total: %{y}<extra></extra>'
};

const dataLineas = [traceEntradasLinea, traceSalidasLinea];

const layoutLineas = {
  title: "Evolución del Valor Total de Entradas y Salidas",
  xaxis: {
    title: "Fecha",
  },
  yaxis: {
    title: "Valor total",
  },
};

	Plotly.newPlot(graficaLineas, dataLineas, layoutLineas);
}

actualizarGrafica();
});

// ... (código existente)

document.addEventListener("DOMContentLoaded", function () {
  // ... (código existente)

  const resetDBButton = document.getElementById("resetDB");
  resetDBButton.addEventListener("click", function () {
    eliminarDatosDeLocalStorage();
    actualizarGrafica();
  });

  // ... (código existente)
});

function eliminarDatosDeLocalStorage() {
  localStorage.removeItem("inventario");
}