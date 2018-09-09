const REF = firebase.database().ref('usuario')
const REF_GUITARRAS = firebase.database().ref('guitarras')

let btnLoginGoogle = document.getElementById('btnLoginGoogle')
let btnLogOut = document.getElementById('btnLogout')
let userName = document.getElementById('userName')

let nombre = document.getElementById('nombre')
let precio = document.getElementById('precio')
let descripcion = document.getElementById('descripcion')
let tipo = document.getElementById('tipo')
let imagen = document.getElementById('imagen')

firebase.auth().onAuthStateChanged(function(user){
  if(user){
		userName.innerHTML = user.displayName
		mostrarLogout()
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


function nuevaGuitarra(){
  event.preventDefault()
  const guitarra = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    tipo: tipo.value,
    precio: precio.value,
    img: imagen.value
  }
  if(guitarra.tipo !== "normal" && guitarra.tipo !== "vip"){
    swal('Error', 'El tipo de guitarras debe ser normal o vip', 'error')
  }
  guardarGuitarra(guitarra)
}

function guardarGuitarra(guitarra){
  REF_GUITARRAS.child(guitarra.tipo).push(guitarra).then(swal('Datos ingresados'))
}
