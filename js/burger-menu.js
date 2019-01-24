let burgerMenu = document.getElementById("menu-toggler");
let burgerMenuContainer = document.querySelector(".navbar .container");
let navbarObtions = document.querySelector(".navbar .navbar-obtions");


burgerMenu.addEventListener('click', () => {
	console.log("HEi");
	if(burgerMenuContainer.classList.contains('full-height')) {
		burgerMenuContainer.classList.remove('full-height')
		navbarObtions.classList.remove('flex-box')

	} else {
		burgerMenuContainer.classList.add('full-height')
		navbarObtions.classList.add('flex-box')
	}
})