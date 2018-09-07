const REF = firebase.database().ref('usuario')
const REF_TEST = firebase.database().ref('test')

let btnLoginGoogle = document.getElementById('btnLoginGoogle')
let btnLogOut = document.getElementById('btnLogout')
let userName = document.getElementById('userName')

let btnPush = document.getElementById('btnPush')
let btnUpdate = document.getElementById('btnUpdate')
let btnSet = document.getElementById('btnSet')


btnPush.addEventListener('click', function(){
	let obj = {
		curso: 'firebase',
		profesor: 'Angel',
		contenido: {
			temas: ['autenticacion', 'conexion']
		}
	}
	REF_TEST.push(obj).then(pushSuccess).catch(error)
})

btnUpdate.addEventListener('click', function(){
	let obj = {
		curso: 'firebase 3',
		profesor: 'Sacha',
		contenido: {
			primero: "formularios"
		}
	}
	REF_TEST.child('-LLpOe8qLlW-TR5Fezq3').update(obj)
})

btnSet.addEventListener('click', function(){
	
})

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
	}else{
		console.log('No hay usuario')
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
		nombre: userData.user.displayName,
		email: userData.user.email,
		uid: userData.user.uid
	}
	agregarUsuario(usuario)
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

function agregarUsuario(usuario){
 REF.push(usuario)
}