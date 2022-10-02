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
    wordsIncorrects = [];
    wordsCorrects = [];
    countglobal = 0;
    recibir = true;
    incorrecto = 1;
    document.getElementById("btn-rendirse").value = "Rendirse";
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

/**
 * It draws a letter on a canvas.
 * @param letra - the letter to be drawn
 * @param posicion - the position of the letter in the word
 * @param enlinea - boolean, if true, the letter will be drawn in the line, if false, it will be drawn
 * in the bottom.
 * @param color - the color of the letter
 * @returns the value of the variable countglobal.
 */
function dibujarLetras(letra, posicion, enlinea, color){
    var canvas = document.getElementById("canva-word");
    var pincel = canvas.getContext("2d");

    if(enlinea){
        pincel.font="bold 70px Rubik, serif";
        pincel.fillStyle = color;
        if(letra != "i"){
            pincel.fillText(letra.toUpperCase(),(37.5*posicion)+3,80,25);
            return;
        }
        else{
            pincel.fillText(letra.toUpperCase(),(37.5*posicion)+10,80,10);
            return;
        }
    }
    else{
        pincel.font="bold 25px Rubik, serif";
        pincel.fillStyle = "white";      
        pincel.fillText(letra.toUpperCase(),(15*countglobal),148,10);
        countglobal++;
        return
    }
}

/**
 * It receives a letter, checks if it's correct or not, and if it's correct, it draws it on the canvas,
 * if it's incorrect, it draws the letter on the canvas and draws a part of the hangman.
 * @param letra - the letter that the user has typed
 * @returns the value of the variable recibir.
 */
function recibirLetras(letra){      
    let teclaincorrecta = false;
    let teclacorrecta = false;

    if(wordsCorrects.length!=0){
        for(var i = 0;i < wordsCorrects.length; i++){
            if(letra == wordsCorrects[i]){
                teclacorrecta = true;
            }
        }
    }
    if(teclacorrecta === true){return;}
    if(teclacorrecta === false){
        for(var i = 0; i<palabra.length; i++){
            if(letra == palabra[i]){
                teclaincorrecta = true;
                wordsCorrects.push(letra);
                dibujarLetras(letra,i,true,"white");
                if(wordsCorrects.length == palabra.length){
                    for(var i = 0; i<palabra.length; i++){
                        dibujarLetras(palabra[i],i,true,"white");
                    }
                    MensajePantalla("Ganaste, la palabra era: ",palabra);
                    recibir = false;
                    return;
                }
            }
        }
    }
    if(teclaincorrecta  === false){
        let countaux = false;
        if(wordsIncorrects.length!=0){
            for(let i = 0; i < wordsIncorrects.length; i++){
                if(letra==wordsIncorrects[i]){
                    countaux = true;
                }
            }
            if(countaux === false){
                dibujarLetras(letra,i,false,"white");
                wordsIncorrects.push(letra);
                dibujarMunheco(incorrecto);
                incorrecto++;
                if(wordsIncorrects.length>6){
                    for(let i = 0; i<palabra.length; i++){
                        dibujarLetras(palabra[i],i,true,"red");  
                    }
                    MensajePantalla("Perdiste, la palabra era: ",palabra);
                    recibir = false;
                    return;
                } 
            }
        }
        else{
            wordsIncorrects.push(letra);
            dibujarLetras(letra,i,false,"white");
            dibujarMunheco(incorrecto);
            incorrecto++;
        }
    }

    teclaincorrecta = false;
    teclacorrecta = false;
}

/**
 * When the user clicks the button with the id of 'start', the function will hide the element with the
 * id of 'game' and show the element with the id of 'start'.
 */
function pantallaInicio(){
    let btnlogin = document.querySelector("#start");
    let btnadd = document.querySelector("#menu-add-words");
    let pantallaJuego = document.querySelector("#game");
    pantallaJuego.style.display = "none"
    btnlogin.style.display = "flex";
    btnadd.style.display = "none"

    document.getElementById('modal').classList.remove('view-modal--scale');
}

/**
 * It takes the value of the input field, checks if it's a letter, and if it is, it sends it to another
 * function.
 */
function enviarLetraMovil(){
    let letramobile = String(document.querySelector(".game__text-mobile").value);
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if(pattern.test(letramobile)){
        if(recibir){
            recibirLetras(letramobile.toLowerCase());
        }
    }else{
        MensajePantalla("Por favor ingrese letras",""); 
        document.querySelector(".game__text-mobile").focus();
        }
    document.querySelector(".game__text-mobile").value = "";

}

/**
 * The function esperarLetras() listens for keyup events, and if the keyCode is between 65 and 90, it
 * calls the function recibirLetras() with the keyName as an argument.
 */
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

/**
 * The function takes the value of the input field, checks if it's a word, and if it is, it checks if
 * it's between 3 and 8 characters long, and if it is, it adds it to the array.
 */
function agregarPalabra(){
    let palabranueva = document.getElementById("add-word").value;
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if(pattern.test(palabranueva)){
        if((palabranueva.length>=3) && (palabranueva.length<=8)){
            palabras.push(palabranueva);
            MensajePantalla("La palabra: '" + palabranueva + "' se agregó","");
            //alert("La palabra se agregó.");
        }else{
            MensajePantalla("La palabra no puede ser agregada. ","Lee las condiciones");
            //alert("La palabra no puede ser agregada. lee las condiciones");
        }
    }else{
        MensajePantalla("La palabra no puede ser agregada. ","Lee las condiciones");
        //alert("La palabra no puede ser agregada.");
        }
    
    document.getElementById("add-word").value = "";

}

/**
 * It displays a modal window with a message.
 * @param texto - The text that will be displayed in the modal.
 * @param textoespecial - The text that will be displayed in the span element.
 */
function MensajePantalla(texto,textoespecial){
    let mensajePantalla = document.querySelector(".view-modal");
    mensajePantalla.style.display = "flex";

    document.querySelector("#modal-message").textContent = texto;
    document.getElementById("modal-message__span").textContent = textoespecial;
    document.querySelector(".view-modal__message").focus();
}

/**
 * When the user clicks on the button, the modal will disappear.
 */
function MensajeOcultoPantalla(){
    let mensajePantalla = document.querySelector(".view-modal");
    mensajePantalla.style.display = "none";
}

/**
 * The function jugar() is called when the user clicks the "Jugar" button. It clears the variables,
 * generates a random number, and then uses that number to select a word from the array of words. It
 * then draws the lines for the letters in the word, draws the orca, and waits for the user to enter a
 * letter.
 */
function jugar(){

    limpiarVariables();
    //Imprimir la cantidad de palabras que hay para adivinar. 
    //console.log("la cantidad de palabras son: " + palabras.length);

    palabra = palabras[generarNumRamdom(0,palabras.length-1)];
    //Imprimir la palabra a adivinar.
    //console.log(palabra);
    
    dibujarLineas(palabra.length);
    dibujarOrca();
    esperarLetras(); 
}

/**
 * When the user clicks the button with the id of start, the button with the id of menu-add-words will
 * be displayed.
 */
function pantallaAgregarPalabra(){
    let btnlogin = document.querySelector("#start");
    let btnadd = document.querySelector("#menu-add-words");
    btnlogin.style.display = "none";
    btnadd.style.display = "flex";
}

/**
 * If the user has not yet won or lost, then the function will display the word and change the button
 * text to 'Salir' (exit). Otherwise, it will return to the start screen.
 */
function rendirse(){
    if(recibir){    
        for(var i = 0; i<palabra.length; i++){
            dibujarLetras(palabra[i],i,true,"Yellow");
        }
        MensajePantalla("Te rendiste, la palabra era: ",palabra);
        //alert("Te rendiste, la palabra era: " + palabra);
        document.getElementById("btn-rendirse").textContent = "Salir";
        recibir = false;
    }
    else{
        pantallaInicio();       
    }
}

/**
 * When the user clicks the button, hide the start screen and show the game screen, then call the
 * jugar() function.
 */
function pantallaJugar(){
    let pantallaInicio = document.querySelector ("#start");
    let pantallaJuego = document.querySelector("#game");
    pantallaInicio.style.display = "none";
    pantallaJuego.style.display = "flex"

    document.getElementById('modal').classList.add('view-modal--scale');

    jugar();
}
