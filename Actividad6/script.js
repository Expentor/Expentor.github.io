// Inicialización de una instancia de la clase Particle, que se utiliza para interactuar con dispositivos Particle IoT.
var particle = new Particle();

// Variable para almacenar el token de autenticación una vez que se inicie sesión correctamente.
var token;

// Variable para almacenar el valor actual
var currentValue = 5;  // Valor inicial
var labelresult = document.getElementById("result");  // Elemento donde se mostrará el resultado

// Llamada a la API de Particle para iniciar sesión con credenciales específicas.
particle.login({
    username: 'afernandez0@ucol.mx',  // Nombre de usuario de la cuenta Particle.
    password: 'Patapon2023'           // Contraseña de la cuenta Particle.
}).then(
    // Función de éxito: si el inicio de sesión es exitoso, se guarda el token de autenticación.
    function (data) {
        token = data.body.access_token;
    },
    // Función de error: si hay un error en el inicio de sesión, se imprime un mensaje en la consola.
    function (err) {
        console.log('Could not log in.', err);
    }
);

// Función para actualizar el valor del control
function updateValue(change) {
    var output = document.getElementById('Kvaluetms');
    currentValue += change;

    // Restringir el valor entre 5 y 20
    if (currentValue < 5) currentValue = 5;
    if (currentValue > 20) currentValue = 20;

    output.innerText = currentValue;

    // Llamada a la función Particle cuando el valor cambie
    sendToParticle(currentValue);
}

// Función para enviar el valor al dispositivo Particle y obtener el resultado
function sendToParticle(value) {
    console.log('Enviando valor a Particle:', value);

    // Llamada a la función remota 'TMS_2' en el dispositivo Particle con el valor seleccionado
    particle.callFunction({
        deviceId: '2e0033000b47313037363132',  // ID único del dispositivo Particle
        name: 'TMS_2',                        // Nombre de la función que se invoca en el dispositivo
        argument: value.toString(),           // Valor que se pasa como argumento
        auth: token                           // Token de autenticación
    }).then(function() {
        // Esperar un breve momento antes de obtener la variable
        return new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1000ms
    }).then(function() {
        // Obtener el valor actualizado del dispositivo
        return particle.getVariable({ 
            deviceId: '2e0033000b47313037363132', 
            name: 'VALOR', 
            auth: token 
        });
    }).then(function(data) {
        console.log('Variable del dispositivo obtenida exitosamente:', data);
        var result = data.body.result;  // Almacenar el valor retornado
        labelresult.innerText = result;  // Mostrar el resultado en la página
    }).catch(function(err) {
        console.log('Error al obtener la variable o al llamar a la función:', err);
        labelresult.innerText = 'Error al obtener el resultado';  // Mostrar mensaje de error
    });
}
