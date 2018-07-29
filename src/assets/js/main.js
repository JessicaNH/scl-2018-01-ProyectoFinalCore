const form = document.getElementById("formPrueba"); // Obtenemos la referencia al formulario

if (form) {
  // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener("submit", formPrueba); // Al momento de enviar el formulario, ejecuta la función "contactform"
}

infoZonaIf.addEventListener("click", event => {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  var selectOptions = document.getElementById("zonaIfOptions");
selectOptions.addEventListener("change", function() {
  var selectedZonaIf = this.options[selectOptions.selectedIndex];
  console.log(selectedZonaIf.value);
});
  const data = { notificacion: selectOptions.value}; // Creamos un objecto con todos los elementos de nuestro formulario.
  saveContactForm(data); // Enviamos la información obtenida por el usuario a la función que se encargara de guardar la información en Firebase
  form.reset(); // borramos todos los campos.
// aqui evaluamos la ruta 
firebase.database().ref("/zonaIf").on("value", function drawPosts(posts) {
   Object.entries(posts.val()).forEach(post => {
    printZonaId.innerHTML += `
    <p>${post[1].notificacion}</p> `;
  });
});

function saveContactForm(data) {
  firebase
    .database()
    .ref("zonaIf")
    .push(data) // Hacemos referencia al método database de el SDK y hacemos referencia el nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
    .then(function() {
      alert("mensaje guardado"); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
    })
    .catch(function() {
      alert("mensaje No guardado"); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
    });
}


})