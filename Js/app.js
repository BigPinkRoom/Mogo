"use strict"

/* add paddings to inner elements, in scroll (to beauty scroll, to show all block) (? offsetHeight-clientHeight)

   add accordion;
*/


/* Constants */
const header = document.getElementById("header"),
      navToggle = document.getElementById("nav-toggle"),
      nav = document.getElementById("nav"),
      intro = document.getElementById("intro");



/* Burger button skin */
function toggleBtnBurger() {
  if(event.target.closest(".nav__link")) console.log(true);
  navToggle.classList.toggle("active");
}

navToggle.addEventListener("click", toggleBtnBurger);



/* active mobile menu */
function toggleMobileMenu() {
  header.classList.toggle("active");
}

navToggle.addEventListener("click", toggleMobileMenu);

/* Closing mobile menu */
nav.addEventListener("click", toggleMobileMenu);
nav.addEventListener("click", toggleBtnBurger);




/* Fixed header menu */
function toggleFixHeader() {
  let scrollH = window.pageYOffset;
  let introH = intro.clientHeight - 10;
  
  if (scrollH >= introH && !header.classList.contains("fixed")) {
    header.classList.add("fixed");
  } 
  if (scrollH < introH && header.classList.contains("fixed")) {
    header.classList.remove("fixed");
  }
}

document.addEventListener("scroll", toggleFixHeader);
toggleFixHeader();



/* Smooth scroll main menu*/
function smoothScroll() {
  if (!event.target.dataset.scroll) return;
  
  event.preventDefault();
  let elem = document.getElementById(event.target.dataset.scroll);
  let elemStartPos = elem.getBoundingClientRect().top + window.scrollY;
  let startPos = window.pageYOffset;
  let distance = elemStartPos - startPos;
  let duration = 1000;
  let startTime = null;

  function animation(currentTime) {
    if(startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPos, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  requestAnimationFrame(animation);
}

// function smoothScroll() {
//   event.preventDefault();
//   let elem = document.getElementById(event.target.dataset.scroll);
//   elem.scrollIntoView({behavior:"smooth"})
// }

document.addEventListener("click", smoothScroll)



/* Accordion */