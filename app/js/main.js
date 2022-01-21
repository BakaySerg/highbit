"use strict";

/**
 active menu point
**/
function setActiveMenuItem() {
	let current = location.pathname.split('/').reverse()[0];
	if (current === "") current = 'index.html';
	else {
		current = current.split('-')[0];
	}
	let menuItems = document.querySelectorAll('.menu__link');
	for (let i = 0, len = menuItems.length; i < len; i++) {
		if (menuItems[i].getAttribute("href").split('-')[0].indexOf(current) !== -1) {
			menuItems[i].className += " active";
			return
		}
	}
};

document.addEventListener('DOMContentLoaded', function(){
	setActiveMenuItem();
	//user menu
	const menuTrigger = document.querySelector(".btn--menu");
	const subMenus = document.querySelectorAll(".sub-menu");

	menuTrigger?.addEventListener("click", function() {
		menuTrigger.classList.toggle("open");
		menuTrigger.previousElementSibling.classList.toggle("menu--open");
		[...subMenus].forEach(function(el){
			el.classList.remove("open");
		});
	});

	if (subMenus){
		[...subMenus].forEach(function(el){
			el.addEventListener("click",function(){
				this.classList.toggle("open");
			})
		})
	};


	// copyright - year
	const year = document.getElementById("year");
	if (year) {
		year.innerHTML = new Date().getFullYear();
	};


});