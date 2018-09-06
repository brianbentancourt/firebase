let btnLogin = document.getElementById('btnLogin')

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		console.log(user)
	}else{
		console.log('No hay usuario')
	}
})

btnLogin.addEventListener('click', function(){
	event.preventDefault()
	const provider = new firebase.auth.GoogleAuthProvider()
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
	firebase.auth().languageCode = 'es';
	firebase.auth().signInWithPopup(provider)
	.then(function(userData){
		console.log(userData)
	}).catch(function(err){
		console.log(err)
	})
})

