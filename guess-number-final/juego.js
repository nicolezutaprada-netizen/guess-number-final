const inputIntento = document.getElementById('inputIntento');
const btnAdivinar = document.getElementById('btnAdivinar');
const mensaje = document.getElementById('mensaje');
const contador = document.getElementById('contador');
const historial = document.getElementById('historial');
const btnReiniciar = document.getElementById('btnReiniciar');
const tarjeta = document.getElementById('game-card');
const mejorPuntajeEl = document.getElementById('mejorPuntaje');

console.log('Elementos conectados:', inputIntento, btnAdivinar, mensaje);

// --- Mostrar mensaje ---
function mostrarMensaje(texto, color) {
  mensaje.textContent = texto;
  mensaje.style.color = color;
}

mostrarMensaje('¡Bienvenido al juego!', '#e94560');

// --- Variables del juego ---
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historialIntentos = [];
let mejorPuntajeNum = Infinity;

console.log('(DEBUG) Número secreto:', numeroSecreto);

// --- Pista de cercanía ---
function obtenerPista(intento, secreto) {
  let diferencia = Math.abs(intento - secreto);

  if (diferencia <= 5) {
    return '🔥 ¡Muy cerca!';
  } else if (diferencia <= 15) {
    return '♨️ Caliente';
  } else if (diferencia <= 30) {
    return '🌤️ Tibio';
  } else {
    return '❄️ Frío';
  }
}

// --- Verificar game over ---
function verificarGameOver() {
  if (intentos >= 10) {
    mostrarMensaje('💀 Game Over. El número era: ' + numeroSecreto, '#ff6b6b');
    btnAdivinar.disabled = true;
    btnReiniciar.style.display = 'inline-block';
    tarjeta.style.borderColor = '#ff6b6b';
    tarjeta.style.boxShadow = '0 0 40px rgba(255, 107, 107, 0.3)';
    return true;
  }
  return false;
}

// --- Función principal ---
function verificarIntento() {

  const valor = Number(inputIntento.value);

  // Validar entrada
  if (isNaN(valor) || valor < 1 || valor > 100) {
    mostrarMensaje('⚠️ Ingresa un número del 1 al 100', 'orange');
    return;
  }

  // Incrementar contador
  intentos++;
  contador.textContent = 'Intentos: ' + intentos;

  // Verificar game over
  if (verificarGameOver()) return;

  // Agregar al historial
  historialIntentos.push(valor);
  let color = valor > numeroSecreto ? '#ff6b6b' : valor < numeroSecreto ? '#4ecdc4' : '#00ff88';
  historial.innerHTML += '<span class="guess-pill" style="background:' + color + '30; color:' + color + '">' + valor + '</span>';

  // Comparar con el número secreto
  if (valor === numeroSecreto) {
    mostrarMensaje('🎉 ¡Correcto! Era el ' + numeroSecreto, '#00ff88');
    btnAdivinar.disabled = true;
    btnReiniciar.style.display = 'inline-block';
    tarjeta.style.borderColor = '#00ff88';
    tarjeta.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.3)';

    // Actualizar mejor puntaje
    if (intentos < mejorPuntajeNum) {
      mejorPuntajeNum = intentos;
      mejorPuntajeEl.textContent = 'Mejor puntaje: ' + mejorPuntajeNum + ' intentos 🏆';
    }
  } else if (valor > numeroSecreto) {
    let pista = obtenerPista(valor, numeroSecreto);
    mostrarMensaje('📈 Muy alto. ' + pista, '#ff6b6b');
  } else {
    let pista = obtenerPista(valor, numeroSecreto);
    mostrarMensaje('📉 Muy bajo. ' + pista, '#4ecdc4');
  }

  // Limpiar input y enfocar
  inputIntento.value = '';
  inputIntento.focus();
}

// --- Reiniciar juego ---
function reiniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  historialIntentos = [];

  contador.textContent = 'Intentos: 0';
  historial.innerHTML = '';
  mostrarMensaje('🎯 ¡Nuevo juego! Adivina el número...', '#e94560');

  btnAdivinar.disabled = false;
  btnReiniciar.style.display = 'none';
  inputIntento.value = '';
  inputIntento.focus();

  tarjeta.style.borderColor = 'rgba(233, 69, 96, 0.3)';
  tarjeta.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';

  console.log('(DEBUG) Nuevo número secreto:', numeroSecreto);
}

// --- Conectar eventos ---
btnAdivinar.addEventListener('click', verificarIntento);
btnReiniciar.addEventListener('click', reiniciarJuego);

inputIntento.addEventListener('keypress', function(evento) {
  if (evento.key === 'Enter') {
    verificarIntento();
  }
});