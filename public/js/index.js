const REF = firebase.database().ref('usuario')
const REF_GUITARRAS = firebase.database().ref('guitarras')
const STORAGE = firebase.storage().ref()

STORAGE.child('invie-acustica.png').getDownloadURL().then(function(url){
	console.log(url)
})

let btnLogin = document.getElementById('btnLogin')
let btnLoginGoogle = document.getElementById('btnLoginGoogle')
let btnLoginFacebook = document.getElementById('btnLoginFacebook')
let btnLoginTwitter = document.getElementById('btnLoginTwitter')
let btnLoginGitHub = document.getElementById('btnLoginGitHub')
let btnLogOut = document.getElementById('btnLogOut')
let userName = document.getElementById('userName')

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		//console.log(user)
		userName.innerHTML = user.displayName
		mostrarLogout()
	}else{
		//console.log('No hay usuario')
		userName.innerHTML = ''
		mostrarLogin()
	}
})

function mostrarLogin(){
	btnLogin.style.display = 'block'
	btnLogOut.style.display = 'none'
}

function mostrarLogout(){
	btnLogin.style.display = 'none'
	btnLogOut.style.display = 'block'
}



function login(userData){
	let usuario ={
		activo: true,
		nombre: userData.user.displayName,
		email: userData.user.email,
		uid: userData.user.uid
	}
	console.log(usuario)
	agregarUsuario(usuario, userData.user.uid)
	swal({
     	title: 'Bienvenido',
     	text: userData.user.displayName,
     	type: 'success',
		icon: 'success',
     	timer: 1500
    })
}

function agregarUsuario(usuario, uid){
 REF.child(uid).update(usuario)
}

function logout(){
	console.log('sesion cerrada')
}

function error(err){
	console.log(err)
	if(err){
		swal("Error", err.message, "error")
	}
}

btnLoginGoogle.addEventListener('click', function(){
	event.preventDefault()
	const provider = new firebase.auth.GoogleAuthProvider()
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
	firebase.auth().languageCode = 'es';
	firebase.auth().signInWithPopup(provider)
	.then(login)
	.catch(error)
})

btnLoginFacebook.addEventListener('click', function(){
	event.preventDefault()
	const provider = new firebase.auth.FacebookAuthProvider()
	provider.addScope('public_profile, email')
	firebase.auth().languageCode = 'es';
	firebase.auth().signInWithPopup(provider)
	.then(login)
	.catch(error)
})

btnLoginGitHub.addEventListener('click', function(){
	event.preventDefault()
	const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('scope');
	firebase.auth().languageCode = 'es';
	firebase.auth().signInWithPopup(provider)
	.then(login)
	.catch(error)
})

btnLogOut.addEventListener('click', function(){
	event.preventDefault()
	firebase.auth().signOut()
	.then(logout)
	.catch(error)
})


function leerGuitarras () {
  REF_GUITARRAS.child('vip').on('child_added', (datos) => {
    console.log('vip', datos.val())
    const guitar = datos.val()
    const nombreGui = datos.val().nombre
    const contenedorElementos = document.getElementById('guitarrasContent')
    console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
        contenedorElementos.firsChild
      )
  } )
}

function leerguitarrasVip () {
  REF_GUITARRAS.child('normal').on('child_added', (datos) => {
    console.log('normales', datos.val())
    const guitar = datos.val()
    const nombreGui = datos.val().nombre
    const contenedorElementos = document.getElementById('guitarrasContentVip')
    console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
        contenedorElementos.firstChild
      )
  } )
}

function crearElementoGuitarra(key, nombre, precio, descripcion, img) {
  const uid = firebase.auth().currentUser.uid

  const html =
      '<article class="guitarra contenedor">' +
        '<img class="derecha" src="" alt="Guitarra Invie Acustica" width="150"/>' +
        '<div class="contenedor-guitarra-a">' +
          '<h3 class="title-b"></h3>' +
          '<ol>' +
            '<li class="precio-b"></li>' +
            '<li class="descripcion-b"></li>' +
          '</ol>' +
        '</div>' +
        '<button type="button" onclick="comprar('+'`'+key+'`'+')">Comprar</button>'+
      '</article>'

  // Create the DOM element from the HTML
	const div = document.createElement('div')
  div.innerHTML = html

  const guitarElement = div.firstChild
  var imgURL = ""
  STORAGE.child(img).getDownloadURL().then((url) => {
    imgURL = url
  }).then(() => {
    guitarElement.getElementsByClassName('title-b')[0].innerText = nombre
    guitarElement.getElementsByClassName('precio-b')[0].innerText = precio
    guitarElement.getElementsByClassName('descripcion-b')[0].innerText = descripcion
    guitarElement.getElementsByClassName('derecha')[0].src = imgURL
  })
  return guitarElement
}

leerGuitarras()
leerguitarrasVip()
