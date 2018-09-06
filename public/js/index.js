let btnLogin = document.getElementById('btnLogin')
let btnLoginF = document.getElementById('btnLoginF')
let btnLogOut = document.getElementById('btnLogOut')
let userName = document.getElementById('userName')


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
	btnLoginF.style.display = 'block'
	btnLogin.style.display = 'block'
	btnLogOut.style.display = 'none'
}

function mostrarLogout(){
	btnLoginF.style.display = 'none'
	btnLogin.style.display = 'none'
	btnLogOut.style.display = 'block'
}



function login(userData){
	console.log(userData)
}

function logout(){
	console.log('sesion cerrada')
}

function error(err){
	console.log(err)
}

btnLogin.addEventListener('click', function(){
	event.preventDefault()
	const provider = new firebase.auth.GoogleAuthProvider()
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
	firebase.auth().languageCode = 'es';
	firebase.auth().signInWithPopup(provider)
	.then(login)
	.catch(error)
})

btnLoginF.addEventListener('click', function(){
	event.preventDefault()
	const provider = new firebase.auth.FacebookAuthProvider()
	provider.addScope('public_profile')

	// para GitHub
	//const provider = new firebase.auth.GithubAuthProvider();
    //provider.addScope('scope');

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

