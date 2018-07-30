const register = document.getElementById('register');
register.addEventListener('click', () => {
  document.getElementById('screenRegister').style.display = 'none';
  document.getElementById('screenChooseCompany').style.display = 'block';
});

const out = document.getElementById('out');
out.addEventListener('click', () => {
  document.getElementById('screenRegister').style.display = 'none';
  document.getElementById('screenChooseCompany').style.display = 'none';
  document.getElementById('screenOut').style.display = 'block';
});

const form = document.getElementById('formVisit'); // Obtenemos la referencia al formulario

if (form) {
  // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener('submit', formVisit); // Al momento de enviar el formulario, ejecuta la función "contactform"
}
// Boton para enviar formulario de visita 
infoVisit.addEventListener('click', event => {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  // Se crea constructor para fecha
  let formatoFecha = new Date();
  let day = formatoFecha.getUTCDate();
  let month = formatoFecha.getMonth() + 1;
  let year = formatoFecha.getFullYear();
  let hour = formatoFecha.getHours();
  let min = formatoFecha.getMinutes();

  fecha = day + '/' + month + '/' + year + ' ' + hour + ':' + min;
  // Aqui se obtiene el valor del select
  let selectOptionsIf = document.getElementById('zonaIfOptions');
  selectOptionsIf.addEventListener('click', () => {
    let selectedZonaIf = this.options[selectOptionsIf.selectedIndex];
    console.log(selectedZonaIf.value);
  });
  
  const infoUsuarioIf = {
    recinto: selectOptionsIf.value,
    fecha: fecha,
  }; // Creamos un objecto con todos los elementos de nuestro formulario.
  saveContactForm(infoUsuarioIf); // Enviamos la información obtenida por el usuario a la función que se encargará de guardar la información en Firebase
  form.reset(); // Borramos todos los campos.
  // Nos informa si la informacion fue guardada correctamente en firebase
  function saveContactForm(infoUsuarioIf) {
    firebase
      .database()
      .ref('zonaIf')
      .push(infoUsuarioIf) // Hacemos referencia el nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
      .then(function() {
        alert('Su selección fue guardada correctamente, se le notificará a la empresa de su visita'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
      })
      .catch(function() {
        alert('No fue posible guardar su selección'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
      });
  }
  // aqui evaluamos la ruta y se imprime en HTML
  firebase
    .database()
    .ref('/zonaIf')
    .once('value', function datosIf(send) {
      printInfoVisit.innerHTML = ' '; // se evita la repeticion de la visita 
      Object.entries(send.val()).forEach(sends => {
        printInfoVisit.innerHTML += 
        `<div>${sends[1].recinto}
       ${sends[1].fecha}  
       <i class="fas fa-sign-out-alt" data-post="${sends.id}" onclick="deletePost(event)"></i>
            </div>`;  
      });
    });
});


// BOTON SALIDA 

/*
function deletePost(event) {
 if (confirm('¿Desea retirarse del If Recoleta')) {
  event.stopPropagation(); //se activa solamente donde se hace click
 const postId = event.target.getAttribute('data-post'); 
 }
}
 

      if (!send || !send.val()) {
        return;
      }
      printInfoVisit.innerHTML = ''; // se evita la repeticion de la visita 
      Object.entries(send.val()).forEach(sends => {
        printInfoVisit.innerHTML += `
    <p>${sends[1].recinto}
       ${sends[1].fecha}</p> `;
      });
    });
});

*/
