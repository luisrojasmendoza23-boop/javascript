const entradaCuenta = document.getElementById('entrada-cuenta');
const entradaPersonas = document.getElementById('entrada-personas');
const botonesPropina = document.querySelectorAll('.opcion-propina');
const propinaPersonalizada = document.getElementById('propina-personalizada');
const montoPropinaHTML = document.getElementById('monto-propina');
const montoTotalHTML = document.getElementById('monto-total');
const botonReinicio = document.getElementById('boton-reinicio');
const mensajeError = document.getElementById('mensaje-error');

let valorCuenta = 0.0;
let porcentajePropina = 0.0;
let numeroPersonas = 0;

function calcular() {
    if (numeroPersonas > 0) {
        let totalPropina = (valorCuenta * porcentajePropina) / 100;
        let propinaPorPersona = totalPropina / numeroPersonas;
        let totalPorPersona = (valorCuenta + totalPropina) / numeroPersonas;

        montoPropinaHTML.innerText = propinaPorPersona.toFixed(2);
        montoTotalHTML.innerText = totalPorPersona.toFixed(2);
        
        botonReinicio.disabled = false;
    }
}

entradaCuenta.addEventListener('input', () => {
    valorCuenta = parseFloat(entradaCuenta.value) || 0;
    calcular();
});

propinaPersonalizada.addEventListener('input', () => {
    porcentajePropina = parseFloat(propinaPersonalizada.value) || 0;
    
    botonesPropina.forEach(btn => btn.classList.remove('activo'));
    calcular();
});

entradaPersonas.addEventListener('input', () => {
    numeroPersonas = parseInt(entradaPersonas.value) || 0;
    
    if (numeroPersonas <= 0) {
        mensajeError.style.display = 'block';
        entradaPersonas.style.border = '2px solid brown';
    } else {
        mensajeError.style.display = 'none';
        entradaPersonas.style.border = '2px solid transparent';
        calcular();
    }
});

botonesPropina.forEach(boton => {
    boton.addEventListener('click', (e) => {
       
        botonesPropina.forEach(btn => btn.classList.remove('activo'));
        e.target.classList.add('activo');
        propinaPersonalizada.value = '';

        porcentajePropina = parseFloat(e.target.dataset.valor);
        calcular();
    });
});

botonReinicio.addEventListener('click', () => {

    valorCuenta = 0.0;
    porcentajePropina = 0.0;
    numeroPersonas = 0;

    entradaCuenta.value = '';
    entradaPersonas.value = '';
    propinaPersonalizada.value = '';
    montoPropinaHTML.innerText = '0.00';
    montoTotalHTML.innerText = '0.00';
    
    botonesPropina.forEach(btn => btn.classList.remove('activo'));
    mensajeError.style.display = 'none';
    entradaPersonas.style.border = '2px solid transparent';
    
    botonReinicio.disabled = true;
});