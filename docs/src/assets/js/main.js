const form = document.getElementById('formVisit'); // Obtenemos la referencia al formulario
const infoVisit = document.getElementById('infoVisit');
if (form) {
  // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener('submit', formVisit); // Al momento de enviar el formulario, ejecuta la función "contactform"
}

// Boton para enviar formulario de visita
infoVisit.addEventListener('click', event => {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  // Se crea la informacion del visitante, rut, nombre y apellido
  let rut = document.getElementById('rut');
  let nombre = document.getElementById('nombre');
  let apellido = document.getElementById('apellido');

  // tabla

  // Se crea constructor para fecha
  let formatoFecha = new Date();
  let day = formatoFecha.getUTCDate();
  let month = formatoFecha.getMonth() + 1;
  let year = formatoFecha.getFullYear();
  var hour = formatoFecha.getHours();
  var min = formatoFecha.getMinutes();

  fecha = day + '/' + month + '/' + year;
  hora = hour + ':' + min; 
  // Aqui se obtiene el valor del select
  let selectOptionsIf = document.getElementById('zonaIfOptions');
  selectOptionsIf.addEventListener('click', function() {
    let selectedZonaIf = this.options[selectOptionsIf.selectedIndex];
    console.log(selectedZonaIf.value);
  });

  const infoUsuarioIf = {
    recinto: selectOptionsIf.value,
    fecha: fecha,
    hora: hora,
    rut: rut.value,
    nombre: nombre.value,
    apellido: apellido.value
  }; // Creamos un objecto con todos los elementos de nuestro formulario.
  saveContactForm(infoUsuarioIf); // Enviamos la información obtenida por el usuario a la función que se encargará de guardar la información en Firebase
  form.reset(); // Borramos todos los campos.
  // Nos informa si la informacion fue guardada correctamente en firebase
});

const btnvisit = document.getElementById('btnvisit');
const btnadmin = document.getElementById('btnadmin');

btnvisit.addEventListener('click', () => {
  screenRegister.style.display = 'block';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'block';
});

btnadmin.addEventListener('click', () => {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'block';
  menuDesp.style.display = 'block';
});