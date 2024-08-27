
const textarea = document.getElementById('textatarea__Canvas');
const mostrarP = document.getElementById('p__ShowText');
const botonEncrip = document.getElementById('Btn__Encrip');
const botonDesemcrip = document.getElementById('Btn__Desemcrip');
const botonCopiar = document.getElementById('Btn__copiar');
const mesanjeError = document.getElementById('p__error');
const mesanjecopiado = document.getElementById('p__Copy');
const imgGrafica = document.getElementById('Img__No_Words');
const p__Titulo = document.getElementById('p__Titulo');

function textoValido(texto) {
    const regex = /^[a-z\s]+$/;
    return regex.test(texto);
}

const letras = ['e', 'i', 'a', 'o', 'u'];
const llaves = ['enter', 'imes', 'ai', 'ober', 'ufat'];

function encriptarTxt(texto) {
    if (textoValido(texto)) {
        let caracteres = texto.split('');
        // Función recursiva para encriptar
        function encriptarRecursivo(index, resultado) {
            if (index >= caracteres.length) {
                return resultado.join('');
            }
            
            let letra = caracteres[index];
            let idx = letras.indexOf(letra);
            if (idx !== -1) {
                resultado.push(llaves[idx]);
            } else {
                resultado.push(letra);
            }
            
            return encriptarRecursivo(index + 1, resultado);
        }
        botonCopiar.removeAttribute("hidden");
        imgGrafica.setAttribute("hidden","");
        p__Titulo.setAttribute("hidden","");
        return encriptarRecursivo(0, []);
      
    } else {
        // Mostrar el mensaje de error
        mesanjeError.hasAttribute("hidden") ? mesanjeError.removeAttribute("hidden") : mesanjeError.setAttribute("hidden", "");
        setTimeout(function() {
            mesanjeError.setAttribute("hidden", "");
        }, 2000);
}}

function desencriptarTxt(texto) {
    if (textoValido(texto)) {
        function desencriptarRecursivo(index, textoDesencriptado) {
            if (index >= llaves.length) {
                return textoDesencriptado;
            }
            
            let clave = llaves[index];
            let letra = letras[index];
            let regex = new RegExp(clave, 'g');
            textoDesencriptado = textoDesencriptado.replace(regex, letra);
            
            return desencriptarRecursivo(index + 1, textoDesencriptado);
        }
        botonCopiar.removeAttribute("hidden");
        imgGrafica.setAttribute("hidden","");
        p__Titulo.setAttribute("hidden","");
        return desencriptarRecursivo(0, texto);
        
    } else {
        // Mostrar el mensaje de error
        mesanjeError.hasAttribute("hidden") ? mesanjeError.removeAttribute("hidden") : mesanjeError.setAttribute("hidden", "");
        setTimeout(function() {
            mesanjeError.setAttribute("hidden", "");
        }, 2000);
}}

function isEmpty(textarea) {
    if(textarea.value.trim() === '') {
        botonCopiar.setAttribute("hidden", "");
        imgGrafica.removeAttribute("hidden");
        p__Titulo.removeAttribute("hidden");
        mostrarP.innerHTML = "Ingrese el texto que desea encriptar o<br> desencriptar";
    };

}

botonCopiar.addEventListener('click', function() {
    let textoCopiado = mostrarP.innerText;
    navigator.clipboard.writeText(textoCopiado)
        .then(function() {
            console.log('Texto copiado al portapapeles.');
            mesanjecopiado.hasAttribute("hidden") ? mesanjecopiado.removeAttribute("hidden") : mesanjecopiado.setAttribute("hidden", "");
            setTimeout(function() {
                mesanjecopiado.setAttribute("hidden", "");
            }, 2000);
        })
        .catch(function(err) {
            console.error('Error al copiar el texto: ', err);
        });
  });

botonEncrip.addEventListener("click", (e) => {
    e.preventDefault();
    let textoCodificado = textarea.value;
    mostrarP.innerHTML = encriptarTxt(textoCodificado);
    console.log("Texto encriptado: " + mostrarP);
    })

botonDesemcrip.addEventListener("click", (e) => {
    e.preventDefault();
    let textoAdeCodificar = textarea.value;
    mostrarP.innerHTML = desencriptarTxt(textoAdeCodificar);
    if (botonCopiar.hasAttribute("hidden")) {
        botonCopiar.removeAttribute("hidden");
    }
})

// Eventos para Movile
botonEncrip.addEventListener("touchstart", (e) => {
    e.preventDefault();
    let textoCodificado = textarea.value;
    mostrarP.innerHTML = encriptarTxt(textoCodificado);
    console.log("Texto encriptado: " + mostrarP.innerHTML);
});

botonDesemcrip.addEventListener("touchstart", (e) => {
    e.preventDefault();
    let textoAdeCodificar = textarea.value;
    mostrarP.innerHTML = desencriptarTxt(textoAdeCodificar);
    if (botonCopiar.hasAttribute("hidden")) {
        botonCopiar.removeAttribute("hidden");
    }
});


setInterval(function() {
    isEmpty(textarea);
},1000);
