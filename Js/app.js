"use strict"

/*
  1)Soft scroll in the page, on links in main menu.
  2)Fixed header menu (after "Inner" block)
  3)button "burger" in mobile version
  4)accordeon
*/

const header = document.getElementById("header"),
      navToggle = document.getElementById("nav-toggle"),
      intro = document.getElementById("intro");
let scrollH = window.pageYOffset;

toggleFixHeader();

/* Burger button */
function toggleBtnBurger() {
  navToggle.classList.toggle("active");
  header.classList.toggle("active");
}

navToggle.addEventListener("click", toggleBtnBurger);

/* Fixed header menu */
function toggleFixHeader() {
  scrollH = window.pageYOffset;
  let introH = intro.clientHeight;
  
  if (scrollH > introH && !header.classList.contains("fixed")) {
    header.classList.add("fixed");
  } 
  if (scrollH < introH && header.classList.contains("fixed")) {
    header.classList.remove("fixed");
  }
}

document.addEventListener("scroll", toggleFixHeader);

/* Smooth scroll main menu*/

function smoothScroll() {
  let elem = event.target;
  let elemStartPos = elem.getBoundingClientRect().top;
  let startPos = window.pageYOffset;
  let distance = elemStartPos - startPos;
  let startTime = null;

  window.requestAnimationFrame( function() {
    console.log('test')
  })
}

document.addEventListener("click", smoothScroll)

/* Accordion */