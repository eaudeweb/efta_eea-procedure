let burgerMenu = document.getElementById("menu-toggler");
let burgerMenuContainer = document.querySelector(".navbar .container");
let navbarOptions = document.querySelector(".navbar .navbar-options");


burgerMenu.addEventListener('click', () => {
	if(burgerMenuContainer.classList.contains('full-height')) {
		burgerMenuContainer.classList.remove('full-height')
		navbarOptions.classList.remove('flex-box')

	} else {
		burgerMenuContainer.classList.add('full-height')
		navbarOptions.classList.add('flex-box')
	}
})