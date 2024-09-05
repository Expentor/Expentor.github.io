// ID del dispositivo Particle al que se enviarán las funciones
const deviceId = '2e0033000b47313037363132';

// Credenciales de usuario para iniciar sesión en Particle
const credentials = {
    user: 'afernandez0@ucol.mx',  // Nombre de usuario de Particle
    password: 'Patapon2023'        // Contraseña de Particle
};

// Instancia del objeto Particle para interactuar con la API de Particle
const particle = new Particle();

// Referencia al elemento del interruptor en el DOM
const input = document.getElementById('light-switch');

// Nombre de la función a invocar en el dispositivo Particle
const functionName = 'led';

// Función asíncrona para iniciar sesión en Particle y obtener un token de autenticación
async function login() {
  try {
    // Inicia sesión en Particle usando las credenciales proporcionadas
    const data = await particle.login({ username: credentials.user, password: credentials.password });
    // Devuelve el token de acceso necesario para autenticar futuras llamadas a la API
    return data.body.access_token;
  } catch (err) {
    // Muestra un mensaje de error en la consola si no se puede iniciar sesión
    console.log('Could not log in.', err);
    throw err; // Propaga el error para manejarlo en otro lugar si es necesario
  }
}

// Añade un evento de cambio al interruptor
input.addEventListener('change', async () => {
  // Inicia sesión y obtiene un token antes de proceder
  const token = await login();
  
  // Verifica si el interruptor está activado o desactivado
  const isChecked = input.checked;
  const value = isChecked ? '1' : '0';  // Establece el valor a '1' si está activado, '0' si no lo está

  try {
    // Llama a la función 'led' en el dispositivo Particle con el valor apropiado ('1' o '0')
    await particle.callFunction({ 
      deviceId: deviceId,     // ID del dispositivo al que se envía la solicitud
      name: functionName,     // Nombre de la función a invocar en el dispositivo
      argument: value,        // Argumento pasado a la función (1 para encender, 0 para apagar)
      auth: token,            // Token de autenticación obtenido previamente
    });
  } catch (err) {
    // Muestra un mensaje de error en la consola si ocurre un error al llamar a la función
    console.log('Error occurred while calling function:', err);
  }
});

// Simula un clic en el interruptor 500ms después de cargar la página
setTimeout(function() {
  input.click();
}, 500);

// Simula otro clic en el interruptor 1000ms después de cargar la página
setTimeout(function() {
  input.click();
}, 1000);