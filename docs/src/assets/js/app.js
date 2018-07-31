function saveContactForm(infoUsuarioIf) {
  firebase
    .database()
    .ref('zonaIf')
    .push(infoUsuarioIf) // Hacemos referencia el nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
    .then(function() {
      alert('Se ha enviado un aviso de su llegada'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.

      alert('mensaje guardado'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
    })
    .catch(function() {
      alert('No fue posible guardar su selección'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
    });
}
// aqui evaluamos la ruta y se imprime en HTML

firebase.database().ref('/zonaIf')
  .once('value', function datosIf(send) {
    tblUsersList.innerHTML = ''; // se evita la repeticion de la visita

    firebase
      .database()

      .ref('/zonaIf')
      .once('value', function datosIf(send) {
        printInfoVisit.innerHTML = ' '; // se evita la repeticion de la visita

        ref('/zonaIf')
          .once('value', function datosIf(send) {
            printInfoVisit.innerHTML = ' '; // se evita la repeticion de la visita 
            Object.entries(send.val()).forEach(sends => {
              printInfoVisit.innerHTML += `<div>
          ${sends[1].rut}
          ${sends[1].nombre}
          ${sends[1].apellido}
          ${sends[1].recinto}
          ${sends[1].fecha}  
          ${sends[1].hora}
          <i class="fas fa-sign-out-alt" data-post="${sends[0]}" onclick="deletePost(event)"></i></div>`;
            });
          });
      });
    // aqui evaluamos la ruta y se imprime en HTML
    firebase
      .database()
      .ref('/zonaIf')
      .once('value', function datosIf(send) {
        tblUsersList.innerHTML = ''; // se evita la repeticion de la visita

        Object.entries(send.val()).forEach(sends => {
          tblUsersList.innerHTML += `<tr>
    <td>  ${sends[1].rut}</td>
     <td>   ${sends[1].nombre}</td>
     <td>   ${sends[1].apellido}</td>
     <td>   ${sends[1].recinto}</td>
     <td>   ${sends[1].fecha}  </td>
     <td>   ${sends[1].hora}</td>
     <i class="fas fa-sign-out-alt" data-post="${ 
  sends[0]
}" onclick="deletePost(event)"></i>
  </tr>`; 
        });
      });
  });

function inicio() {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'block';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'none';
  closeMenu();
}

// CAMARA

(function() {
  var streaming = false,
    video = document.querySelector('#video'),
    canvas = document.querySelector('#canvas'),
    photo = document.querySelector('#photo'),
    startbutton = document.querySelector('#startbutton'),
    width = 320,
    height = 0;

  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log('An error occured! ' + err);
    }
  );

  video.addEventListener(
    'canplay',
    function(ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
});


function takepicture() {
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(video, 0, 0, width, height);
  let data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

startbutton.addEventListener(
  'click',
  function(ev) {
    takepicture();
    ev.preventDefault();
  },
  false
);

function toggleMenu() {
  // añadir función onclick="toggleMenu()" al botón del nav bar y al botón cerrar.
  if (sideMenu.className.indexOf('menu_closed') >= 0) {
    // primero revisamos si la clase d-none esta
    openMenu(); // si esta la clase quiere decir que el menú esta cerrado, asi que llamamos la funcion para abrirlo
  } else {
    closeMenu(); // si no esta la clase, le indicamos que cierre el menu
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed'); // quitando clase display-none
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed'); // añadimos la clase display-none
  sideMenu.classList.remove('menu_open');
}

function registrarVisitas() {
  screenRegister.style.display = 'block';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'block';
  closeMenu();
}

function registrosTotales() {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'block';
  menuDesp.style.display = 'block';
  closeMenu();
}