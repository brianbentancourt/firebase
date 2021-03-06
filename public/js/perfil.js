const REF = firebase.database().ref('usuario')

let btnLoginGoogle = document.getElementById('btnLoginGoogle')
let btnLogOut = document.getElementById('btnLogout')
let userName = document.getElementById('userName')

let perfilNombre = document.getElementById('perfilNombre')
let perfilEmail = document.getElementById('perfilEmail')
let perfilTelefono = document.getElementById('perfilTelefono')
let perfilDireccion = document.getElementById('perfilDireccion')

let perfilEditar = document.getElementById('perfilEditar')
let datosPerfil = document.getElementById('datosPerfil')
let formularioPerfil = document.getElementById('formularioPerfil')
let cancelForm = document.getElementById('cancelForm')

let nombreForm = document.getElementById('nombreForm')
let emailForm = document.getElementById('emailForm')
let telefonoForm = document.getElementById('telefonoForm')
let calleForm = document.getElementById('calleForm')
let numeroPuertaForm = document.getElementById('numeroPuertaForm')
let departamentoForm = document.getElementById('departamentoForm')
let cpForm = document.getElementById('cpForm')

function leerInformacion(uid){
	// lee una sola vez
	//REF.child(uid).once('value', llenarInformacion)
	// actualiza en tiempo real
	REF.child(uid).on('value', llenarInformacion)
}

function llenarInformacion(data){
	const user = data.val()
	perfilNombre.innerHTML = user.nombre
	perfilEmail.innerHTML = user.email
  perfilTelefono.innerHTML = user.telefono || ""
  perfilDireccion.innerHTML = user.direccion ? llenarDireccion(user.direccion) : ""
}

const llenarDireccion = direccion => `${direccion.calle} ${direccion.numeroPuerta}, ${direccion.departamento} ${direccion.cp}`


perfilEditar.addEventListener('click', function(){
	datosPerfil.style.display = 'none'
	formularioPerfil.style.display = 'block'
	let user = firebase.auth().currentUser
	REF.child(user.uid).on('value', function(data){
		const user = data.val()
		nombreForm.value = user.nombre
		emailForm.value = user.email
    telefonoForm.value = user.telefono || ""
    if(user.direccion){
      calleForm.value = user.direccion.calle
      numeroPuertaForm.value = user.direccion.numeroPuerta
      departamentoForm.value = user.direccion.departamento
      cpForm.value = user.direccion.cp
    }
	})

})

cancelForm.addEventListener('click', function(){
	datosPerfil.style.display = 'block'
	formularioPerfil.style.display = 'none'
})

function editarDatos(){
	event.preventDefault()
	let usuario = {
		nombre: nombreForm.value,
		email: emailForm.value
	}
	REF.child(firebase.auth().currentUser.uid).update(usuario)
}

function pushSuccess(){
	swal({
     title: 'Datos ingresados',
     type: 'success',
		 icon: 'success',
     timer: 1000
     })
}

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		console.log(user)
		userName.innerHTML = user.displayName
		mostrarLogout()
		leerInformacion(user.uid)
	}else{
		window.location.href = "../index.html"
		userName.innerHTML = ''
		mostrarLogin()
	}
})

function mostrarLogin(){
	btnLoginGoogle.style.display = 'block'
	btnLogOut.style.display = 'none'
}

function mostrarLogout(){
	btnLoginGoogle.style.display = 'none'
	btnLogOut.style.display = 'block'
}



function login(userData){
	console.log(userData)
	let usuario ={
		activo: true,
    uid: userData.user.uid,
		nombre: userData.user.displayName,
		email: userData.user.email
	}
	agregarUsuario(usuario, userData.user.uid)
	swal({
     	title: 'Bienvenido',
     	text: userData.user.displayName,
     	type: 'success',
		 icon: 'success',
     	timer: 1500
     })
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



btnLogOut.addEventListener('click', function(){
	event.preventDefault()
	firebase.auth().signOut()
	.then(logout)
	.catch(error)
})

function agregarUsuario(usuario, uid){
 REF.child(uid).update(usuario)
}










// const REF_TEST = firebase.database().ref('test')
//
// let btnPush = document.getElementById('btnPush')
// let btnUpdate = document.getElementById('btnUpdate')
// let btnSet = document.getElementById('btnSet')
// let btnDelete = document.getElementById('btnDelete')
//
// btnPush.addEventListener('click', function(){
// 	let obj = {
// 		curso: 'firebase',
// 		profesor: 'Angel',
// 		contenido: {
// 			temas: ['autenticacion', 'conexion']
// 		}
// 	}
// 	REF_TEST.push(obj).then(pushSuccess).catch(error)
// })
//
// btnUpdate.addEventListener('click', function(){
// 	let obj = {
// 		curso: 'firebase 3',
// 		profesor: 'Sacha',
// 		contenido: {
// 			primero: "formularios"
// 		}
// 	}
// 	REF_TEST.child('-sdjfh4h5jks3').update(obj)
// })
//
//
// // sobreescribe todo el nodo
// btnSet.addEventListener('click', function(){
// 	let obj = {
// 		curso: 'Responsive',
// 		profesor: 'Leonidas',
// 		contenido: {
// 			primero: "media-query"
// 		}
// 	}
// 	REF_TEST.set(obj).then(swal("set")).catch(error)
// })
//
//
// btnDelete.addEventListener('click', function(){
// 	let obj = {
// 		curso: 'Responsive',
// 		profesor: 'Leonidas',
// 		contenido: {
// 			primero: "media-query"
// 		}
// 	}
// 	REF_TEST.child('-sdjfh4h5jks3').remove().then(swal("borrado")).catch(error)
// })
