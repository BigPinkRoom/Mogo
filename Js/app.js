"use strict"

/*
  1)Soft scroll in the page, on links in main menu.
  2)Fixed header menu (after "Inner" block)
  3)
*/
let burger = {
    header: document.querySelector(".header"),
    navToggle: document.querySelector(".nav-toggle"),
    toggleBurger() {
        burger.navToggle.classList.toggle("active");
        burger.header.classList.toggle("active")
    }
};

burger.navToggle.addEventListener("click", burger.toggleBurger)