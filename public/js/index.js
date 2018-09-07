const REF = firebase.database().ref('usuario')

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
