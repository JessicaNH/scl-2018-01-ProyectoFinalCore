const form = document.getElementById("formVisit"); // Obtenemos la referencia al formulario

if (form) {
  // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener("submit", formVisit); // Al momento de enviar el formulario, ejecuta la función "contactform"
}

infoVisit.addEventListener("click", event => {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  let selectOptionsIf = document.getElementById("zonaIfOptions");
  selectOptionsIf.addEventListener("click", function() {
    let selectedZonaIf = this.options[selectOptionsIf.selectedIndex];
    console.log(selectedZonaIf.value);
  });
  const infoUsuarioIf = { recinto: selectOptionsIf.value }; // Creamos un objecto con todos los elementos de nuestro formulario.
  saveContactForm(infoUsuarioIf); // Enviamos la información obtenida por el usuario a la función que se encargara de guardar la información en Firebase
  form.reset(); // borramos todos los campos.
  // Nos informa si la informacion fue guardada correctamente en firebase
  function saveContactForm(infoUsuarioIf) {
    firebase
      .database()
      .ref("zonaIf")
      .push(infoUsuarioIf) // Hacemos referencia el nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
      .then(function() {
        alert("mensaje guardado"); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
      })
      .catch(function() {
        alert("mensaje No guardado"); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
      });
  }
  // aqui evaluamos la ruta y se imprime en HTML
  firebase
    .database()
    .ref("/zonaIf")
    .once("value", function datosIf(send) {
      if (!send || !send.val()) {
        return;
      }
      Object.entries(send.val()).forEach(sends => {
        printInfoVisit.innerHTML += `
    <p>${sends[1].recinto}</p> `;
      });
    });
});
