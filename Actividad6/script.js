var particle = new Particle();
var token;

particle.login({ username: 'afernandez0@ucol.mx', password: 'Patapon2023' }).then(
    function (data) {
        token = data.body.access_token;
    },
    function (err) {
        console.log('Could not log in.', err);
    }
);
setInterval(function () {
    Ktms.oninput = function () {
        var output = document.getElementById('Kvaluetms');
        output.innerHTML = this.value;
        var Salida = this.value;//
        particle.callFunction({ deviceId: '2e0033000b47313037363132', name: 'TMS_2', argument: Salida, auth: token, });
    }
    Ktms.oninput();
}, 1000)