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

	const stickyHeader = document.getElementById("subheader");
	if (stickyHeader) {
		const mainNavLinks = [...stickyHeader.querySelectorAll("a")].filter(item => !item.classList.contains("subheader__link"));
		window.addEventListener('scroll', function(e) {
			let winTop = window.scrollY;
			winTop >= 90 ?
			stickyHeader.classList.add("subheader--sticky") :
			stickyHeader.classList.remove("subheader--sticky");

			mainNavLinks?.forEach(link => {
				let sec = document.querySelector(link.hash);
					if (sec.offsetTop <= winTop + 5 && sec.offsetTop + sec.offsetHeight > winTop + 5) {
						link.classList.add("current");
					} else {
						link.classList.remove("current");
					}
				});

		});
	};
	// btn--collapser
	const btnCollapser = document.querySelector(".btn--collapser");

	btnCollapser?.addEventListener("click", function() {
		const spn = btnCollapser.querySelector("span");
		const parent = btnCollapser.closest(".accordion__text");
		parent.classList.toggle("expanded");
		parent.classList.contains("expanded") ? spn.innerText = "Show less" : spn.innerText = "Show more"
	});


	/**
		accordions
	**/
	const accordionOpen = function () {
		[].forEach.call(
			document.querySelectorAll("[data-collapse]"),
			function (el) {
				el.addEventListener("click", function (e) {
					e.preventDefault();
					let currentItem = this.closest(".accordion__item");
					currentItem.classList.toggle("expanded");
				});
			}
		);
	};
	accordionOpen();

	/**
		tabs ordinary
	**/
	const tabSwitcher = function () {
		[].forEach.call(
			document.querySelectorAll("[data-trigger-tab]"),
			function (el) {
				el.addEventListener("click", function (e) {
					let id = this.getAttribute("data-trigger-tab"),
						comingTab = document.getElementById(id),
						parent = comingTab.closest('.tabs-content'),
						currentTab = parent.querySelector('[data-tab="active"]');

					currentTab?.setAttribute("data-tab", "hidden");
					comingTab.setAttribute("data-tab", "active");

					let tabsBlock = this.closest('.tabs');
					if (tabsBlock) {
						let allTabs = tabsBlock.querySelectorAll('[data-trigger-tab]');
						[...allTabs].forEach(item => {
							item.classList.remove('active');
						});
						this.classList.add('active');
					};
				});
			}
		);
	};
	tabSwitcher();


	// copyright - year
	const year = document.getElementById("year");
	if (year) {
		year.innerHTML = new Date().getFullYear();
	};


});