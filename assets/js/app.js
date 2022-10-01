let color = '#FEFAE0';
let palabras = ["memoria", "juegos", "plata","java","alarma","fresa","limon","pecera","windows","ala","gamer","codigo","color","pieza","arbol","estacion","robot","pelea","cosmos","naranja", "oro"];
let wordsIncorrects = [];
let wordsCorrects = [];
let palabra = "";
let countglobal = 0;
let recibir = true;
let incorrecto = 1;

/**
 * This function clears the variables that are used in the game.
 */
function limpiarVariables(){
    palabra = "";
    letraspresionadaincorrecta = [];
    letraspresionadacorrecta = [];
    countglobal = 0;
    recibir = true;
    incorrecto=1;
    document.getElementById("btn-wf").value = "Rendirse";
}

/**
 * Generates a random number between the min and max values.
 * @param min - The minimum number (integer) to generate.
 * @param max - The maximum number you want to generate.
 * @returns A random number between the min and max values.
 */
function generarNumRamdom(min, max) {
    let minNum = Math.ceil(min);
    let maxNum = Math.floor(max);
    return  Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * It draws a hangman figure on a canvas element.
 * @param paso - the step of the drawing
 */
function dibujarMunheco(paso){
    let canvas = document.getElementById("canva-picture");
    let pincel = canvas.getContext("2d");

    switch (paso) {
        case 1:
            pincel.moveTo(187,20);
            pincel.lineTo(187,30);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 2:
            pincel.beginPath();
            pincel.arc(187,40,10,0,Math.PI*2,true); 
            pincel.closePath;
            pincel.stroke();
            break;
        case 3:
            pincel.moveTo(187,50);
            pincel.lineTo(187,90);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 4:
            pincel.moveTo(187,50);
            pincel.lineTo(170,75);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 5:
            pincel.moveTo(187,50);
            pincel.lineTo(204,75);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 6: 
            pincel.moveTo(187,90);
            pincel.lineTo(204,115);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke(); 
            break;
        case 7:
            pincel.moveTo(187,90);
            pincel.lineTo(170,115);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
        default:
            break;
    }
}

/**
 * The function dibujarOrca() draws a picture of an orca on the canvas element with the id of
 * 'canva-picture' using the color variable as the color of the orca.
 */
function dibujarOrca(){
    let canvas = document.getElementById("canva-picture");
    let pincel = canvas.getContext("2d");
    canvas.width = canvas.width;

    pincel.moveTo(75,130);
    pincel.lineTo(225,130);
    pincel.lineWidth = 5;
    pincel.strokeStyle = color;
    pincel.stroke();

    pincel.moveTo(112.5,130);
    pincel.lineTo(112.5,20);
    pincel.lineWidth = 5;
    pincel.strokeStyle = color;
    pincel.stroke();

    pincel.moveTo(132.5,20);
    pincel.lineTo(112.5,40);
    pincel.lineWidth = 5;
    pincel.strokeStyle = color;
    pincel.stroke();

    pincel.moveTo(111,20);
    pincel.lineTo(187.5,20);
    pincel.lineWidth = 5;
    pincel.strokeStyle = color;
    pincel.stroke();
}

/**
 * It draws lines on a canvas.
 * @param lineas - number of lines to draw
 */
function dibujarLineas(lineas){
    let canvas = document.getElementById("canva-word");
    let pincel = canvas.getContext("2d");
    canvas.width=canvas.width;

    let x = 0;
    let x2 = 37.5;

    for(let i=0; i < lineas; i++){

        pincel.moveTo(x+2,95);
        pincel.lineTo(x2-5,95);
        pincel.lineWidth = 7;
        pincel.strokeStyle = "white";
        pincel.stroke();

        x = x2;
        x2 = x2 + 37.5;
    }

}

function esperarLetras(){
    document.addEventListener('keyup', (event) => {
        let keyName = event.key;
        let llaveCodigo = event.keyCode; 
        const pattern = new RegExp('^[A-Z]+$', 'i');

        if(llaveCodigo >= 65 && llaveCodigo <=90){
            //Imprime la letra presionada
            //console.log(keyName);
            if(pattern.test(keyName)){
                if(recibir){
                    recibirLetras(keyName);
                }
            }
        }
    }, false);
}

function jugar(){

    limpiarVariables();
    //Imprimir la cantidad de palabras que hay para adivinar. 
    //console.log("la cantidad de palabras son: " + palabras.length);

    palabra = palabras[getRandomIntInclusive(0,palabras.length-1)];
    //Imprimir la palabra a adivinar.
    //console.log(palabra);
    
    dibujarLineas(palabra.length);
    dibujarOrca();
    esperarLetras(); 
}

function pantallaJugar(){
    let pantallaInicio = document.querySelector ("#start");
    let pantallaJuego = document.querySelector("#game");
    pantallaInicio.style.display = "none";
    pantallaJuego.style.display = "flex"

    document.getElementById('modal').classList.add('view-modal--scale');

    jugar();
}
