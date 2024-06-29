

let palabra;
let intentos = 5; // Número de intentos
let mensajes = ["¡Sigue intentándolo!", "¡Tú puedes!", "¡No te rindas!"];

// Obtener palabras desde una API y seleccionar una aleatoriamente
async function obtenerPalabra() {
    try {
        const response = await fetch('https://random-word.ryanrk.com/api/en/word/random/?length=5'); // URL de la API
        const data = await response.json();
        console.log(data);
        palabra= data[0].toUpperCase();
        console.log(palabra);
    } catch (error) {
        console.error("Error al obtener la palabra desde la API:", error);
        // Fallback en caso de error en la API
        const diccionarioFallback = ['CIELO', 'VIAJE', 'PAPEL', 'KARMA'];
        palabra = diccionarioFallback[Math.floor(Math.random() * diccionarioFallback.length)];
    }
}

// Llamar a la función para obtener la palabra al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    await obtenerPalabra();
    document.getElementById("guess-button").addEventListener("click", intentar);
    document.getElementById("reset-button").addEventListener("click", reiniciar); 
    document.getElementById("guess-input").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            document.getElementById("guess-button").click();
        }
    });
});

function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO.length !== 5) {
        alert("La palabra debe tener 5 letras");
        return;
    }

    if (INTENTO === palabra) {
        terminar("<h1> GANASTE </h1>", true);
        return;
    }

    mostrarIntento(INTENTO);
    intentos--;
    mostrarMensaje();
console.log(intentos);
    if (intentos == 0)
         {
        terminar("<h1> PERDISTE </h1>", false);
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    return intento;
}

function mostrarIntento(INTENTO) {
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i = 0; i < palabra.length; i++) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { // VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) { // AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else { // GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
}

function terminar(mensaje, ganaste) {
    const INPUT = document.getElementById('guess-input');
    const BOTON = document.getElementById('guess-button');
    INPUT.disabled = true;
    BOTON.disabled = true;
    
    // Mostrar el mensaje final y la palabra correcta
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje + "<h2>La palabra correcta era: " + palabra + "</h2>";
    console.log("la palabra correcta era:"+palabra);
    contenedor.style.textAlign = "center";
    contenedor.style.marginTop = "20px";

    // Mostrar la palabra correcta en la cuadrícula si se perdió el juego
    if (!ganaste) {
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';

        for (let i = 0; i < palabra.length; i++) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            SPAN.innerHTML = palabra[i];
            SPAN.style.backgroundColor = 'red';
            ROW.appendChild(SPAN);
        }

        GRID.appendChild(ROW);
    }
}

function reiniciar() {
    // Restablecer variables y elementos de la interfaz
    intentos = 5;
    document.getElementById("grid").innerHTML = "";
    document.getElementById("guesses").innerHTML = "";
    document.getElementById("additional-messages").innerHTML = "";
    document.getElementById("guess-input").value = "";
    document.getElementById("guess-input").disabled = false;
    document.getElementById("guess-button").disabled = false;
    obtenerPalabra();
}

function mostrarMensaje() {
    const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
    document.getElementById("additional-messages").innerHTML = `<p>${mensajeAleatorio}</p>`;
}

// Función para crear partículas sakura
function crearSakura() {
    const sakura = document.createElement('div');
    sakura.className = 'sakura';
    sakura.style.left = Math.random() * window.innerWidth + 'px';
    sakura.style.animationDuration = Math.random() * 3 + 2 + 's';
    sakura.style.opacity = Math.random();
    document.getElementById('particles').appendChild(sakura);

    setTimeout(() => {
        sakura.remove();
    }, 5000);
}

// Crear partículas sakura cada cierto tiempo
setInterval(crearSakura, 500);
