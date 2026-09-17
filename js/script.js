

// ----------------- musica --------------------

// Selección de elementos usando solo guiones bajos en las variables por consistencia
const audio_elemento = document.getElementById('audio_elemento');
const btn_play = document.getElementById('btn_play');
const icono_play = document.getElementById('icono_play');
const icono_pause = document.getElementById('icono_pause');
const barra_progreso = document.getElementById('barra_progreso');
const btn_anterior = document.getElementById('btn_anterior');
const btn_siguiente = document.getElementById('btn_siguiente');
const titulo_estado = document.getElementById('titulo_estado');

// Guardamos el texto original para mantenerlo fijo
const texto_titulo_original = "Toca play para reproducir la canción";
let esta_reproduciendo = false;

// Función para alternar Play / Pause
function alternar_reproduccion() {
    if (esta_reproduciendo) {
        pausar_musica();
    } else {
        reproducir_musica();
    }
}

function reproducir_musica() {
    esta_reproduciendo = true;
    audio_elemento.play();

    // Cambiar iconos
    icono_play.style.display = 'none';
    icono_pause.style.display = 'block';

    // Clase para ajustar estilos CSS si es necesario
    btn_play.classList.add('reproduciendo');
    // NO se modifica el titulo_estado.innerText aquí.
}

function pausar_musica() {
    esta_reproduciendo = false;
    audio_elemento.pause();

    // Cambiar iconos
    icono_play.style.display = 'block';
    icono_pause.style.display = 'none';

    btn_play.classList.remove('reproduciendo');
    // NO se modifica el titulo_estado.innerText aquí.
}

// Actualizar la barra de progreso mientras suena
audio_elemento.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.target;
    if (duration) {
        const porcentaje_progreso = (currentTime / duration) * 100;
        barra_progreso.value = porcentaje_progreso;

        // Actualizar visualmente el "relleno" de la barra antes del thumb
        const valor = barra_progreso.value;
        barra_progreso.style.background = `linear-gradient(to right, #ffffff ${valor}%, #4d4d4d ${valor}%)`;
    }
});

// Permitir arrastrar la barra para cambiar el tiempo
barra_progreso.addEventListener('input', (e) => {
    const duration = audio_elemento.duration;
    if (duration) {
        audio_elemento.currentTime = (e.target.value * duration) / 100;
    }
});

// Botones de Adelantar y Retroceder (Simulación de 10 segundos)
btn_siguiente.addEventListener('click', () => {
    audio_elemento.currentTime += 10;
});

btn_anterior.addEventListener('click', () => {
    audio_elemento.currentTime -= 10;
});

// Event listener principal del botón Play
btn_play.addEventListener('click', alternar_reproduccion);

// Cuando termina la canción
audio_elemento.addEventListener('ended', () => {
    pausar_musica();
    // Aseguramos que se mantenga el texto original en caso de que un error lo haya modificado
    titulo_estado.innerText = texto_titulo_original;
    barra_progreso.value = 0;
    barra_progreso.style.background = '#4d4d4d';
});

// Manejo de errores si no existe el archivo
audio_elemento.addEventListener('error', () => {
    // El título solo cambia en caso de error, el único cambio de texto permitido
    titulo_estado.innerText = "Error: assets/musica.mp3 no encontrado";
    titulo_estado.style.color = "#ff5555";
});


// ----------------------- temporizador ---------------------------------
// Configura aquí la fecha objetivo usando el formato de texto en inglés
// Ejemplo: "Month Day, Year HH:MM:SS" -> "July 1, 2026 22:00:00"
const fecha_objetivo = new Date("october 24, 2026 22:00:00").getTime();

const actualizar_temporizador = () => {
    const ahora = new Date().getTime();
    const diferencia = fecha_objetivo - ahora;

    if (diferencia < 0) {
        // Si la fecha ya pasó
        document.getElementById("dias").innerText = "00";
        document.getElementById("horas").innerText = "00";
        document.getElementById("minutos").innerText = "00";
        return;
    }

    // Cálculos matemáticos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    // const segundos = Math.floor((diferencia % (1000 * 60)) / 1000); // Si agregas segundos

    // Actualizar DOM con ceros a la izquierda
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
};

// Ejecutar inmediatamente y luego cada 1 segundo
actualizar_temporizador();
setInterval(actualizar_temporizador, 1000);




// ------------------- fotos ----------------------

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 4,
        depth: 3,
        modifier: 50,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    autoplay: {
        delay: 2000, // Time between slides in milliseconds (e.g., 3 seconds)
        disableOnInteraction: false, // Set to true to stop autoplay on user interaction (e.g., dragging)
    },
    loop: true, // Enable infinite loop
});

// Inicializar AOS (Animate On Scroll)
AOS.init();


// ------------------- Playlist WhatsApp -------------------

const NUMERO_WHATSAPP = '543813556975';

const btn_enviar = document.querySelector('.playlist .contenedor__button');
const inputs_playlist = document.querySelectorAll('.playlist .input__item');

if (btn_enviar && inputs_playlist.length >= 2) {
    btn_enviar.addEventListener('click', () => {
        const nombre = inputs_playlist[0].value;
        const cancion = inputs_playlist[1].value;

        if (nombre.trim() === "" || cancion.trim() === "") {
            alert("Por favor, completa tu nombre y la canción.");
            return;
        }

        const mensaje = `Hola! mi nombre es ${nombre} y mi tema recomendado es ${cancion}`;
        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, '_blank');

        inputs_playlist[0].value = "";
        inputs_playlist[1].value = "";
    });
}

// ------------------- Regalos -------------------

const botones_copiar = document.querySelectorAll('.regalos .datos__button');

botones_copiar.forEach(boton => {
    boton.addEventListener('click', () => {
        const contenedor = boton.closest('.datos__cuenta');
        const datos_banco = contenedor ? contenedor.querySelector('.datos__banco') : null;

        if (datos_banco) {
            const texto = datos_banco.innerText;
            navigator.clipboard.writeText(texto).then(() => {
                const texto_original = boton.innerText;
                boton.innerText = "Copiado";
                setTimeout(() => {
                    boton.innerText = texto_original;
                }, 1500);
            }).catch(err => {
                console.error("Error al copiar: ", err);
            });
        }
    });
});


// --------------- confirmacion --------------------------------------



document.addEventListener('DOMContentLoaded', function() {
  // Definir los números de teléfono
  const recipientNumber1 = '543813596360'; // Número para el primer botón
  const recipientNumber2 = '543815411429'; // Número para el segundo botón

  // Función para enviar mensaje por WhatsApp
  function sendMessage(phoneNumber) {
      const userName = document.getElementById('userFullName').value.trim();
      const userMessage = document.getElementById('customMessage').value.trim();
      const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');

      if (!attendanceStatus) {
          alert('Por favor, selecciona si asistirás o no.');
          return;
      }

      if (userName === '') {
          alert('Por favor, completa todos los campos antes de enviar.');
          return;
      }

      const finalMessage = `*Presencia:* ${attendanceStatus.value}\n*Nombre y Apellido:* ${userName}\n*Mensaje:* ${userMessage ? userMessage : 'N/A'}`;
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

      // Abre la URL de WhatsApp en una nueva pestaña
      window.open(whatsappLink, '_blank');

      // Mostrar mensaje de confirmación
      alert('Mensaje enviado');

      // Limpiar los campos de entrada
      document.getElementById('userFullName').value = '';
      document.getElementById('customMessage').value = '';
      document.querySelectorAll('input[name="attendanceOption"]').forEach(radio => radio.checked = false);

      // Volver al bloque de formulario
      document.getElementById('correo').scrollIntoView({ behavior: 'smooth' });
  }

  // Asignar eventos a los botones
  document.getElementById('botoncito1').addEventListener('click', function() {
      sendMessage(recipientNumber1);
  });

  document.getElementById('botoncito2').addEventListener('click', function() {
      sendMessage(recipientNumber2);
  });
});

