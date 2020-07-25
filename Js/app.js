"use strict"

/* 
   add slider;
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
  let scrollH = window.pageYOffset,
      introH = intro.clientHeight - header.offsetHeight;
  
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
  let elem = document.getElementById(event.target.dataset.scroll),
      elemStartPos = elem.getBoundingClientRect().top + window.scrollY - header.offsetHeight,
      startPos = window.pageYOffset,
      distance = elemStartPos - startPos,
      duration = 1000,
      startTime = null;

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

document.addEventListener("click", smoothScroll)



/* Accordion */
function accordionToggle(pressedClassName, changedClassName) {
  let elem = event.target.closest(pressedClassName);
  if(!elem) return;
  event.preventDefault();

  elem.closest(changedClassName).classList.toggle("active");
}

document.addEventListener("click", () => {
  accordionToggle(".accordion__header", ".accordion__item")
})



/* Slider */
//  let itemLeft = 0;

// function carouselReview() {
//   if (!event.target.classList.contains("reviews__btn")) return;

//   let showContainer = document.getElementById("reviews__show-container");

//   let showContainerItems = showContainer.children;
//   let summWidthItems = (showContainerItems.length - 1) * -100;
//   let firstItem = showContainer.firstElementChild;

//   if (event.target.classList.contains("reviews__btn--prev")) {
//     if (!itemLeft) return
//     firstItem.classList.add("services__item--transition");

//     itemLeft += 100;
//     firstItem.style.marginLeft = `${itemLeft}%`;
//     firstItem.addEventListener("transitionend", () => firstItem.classList.remove("services__item--transition"));
//   }

//   if (event.target.classList.contains("reviews__btn--next")) {
//     if (itemLeft <= summWidthItems) return
//     firstItem.classList.add("services__item--transition");

//     itemLeft -= 100;
//     firstItem.style.marginLeft = `${itemLeft}%`;
//     firstItem.addEventListener("transitionend", () => firstItem.classList.remove("services__item--transition"));
//   }

// }

class Сarousel {
  constructor(btnClass, showContainer, transitionClass) {
    this.btnClass = btnClass;
    this.showContainer = document.getElementById(showContainer);
    this.firstItem = document.getElementById(showContainer).firstElementChild;
    this.summWidthItems = (this.showContainer.children.length - 1) * -100;
    this.transitionClass = transitionClass;
    this.itemLeft = 0;
  }

  move() {
    this.e = event.target;
    if(this.e.classList.contains(`${this.btnClass}--prev`)) {
      console.log(this.itemLeft)
      if(!this.itemLeft) return
      
      this.movePrev()
    }

    if(this.e.classList.contains(`${this.btnClass}--next`)) {
      console.log(this.itemLeft)
      if(this.itemLeft <= this.summWidthItems) return
      
      this.moveNext()
    }
  }

  movePrev() {
    this.firstItem.classList.add(this.transitionClass);

    this.itemLeft += 100;
    this.firstItem.style.marginLeft = `${this.itemLeft}%`;
    
    this.firstItem.addEventListener("transitionend", () => this.firstItem.classList.remove(this.transitionClass)); // add bind, for is correct working "this"
  }

  moveNext() {
    this.firstItem.classList.add(this.transitionClass);

    this.itemLeft -= 100;
    this.firstItem.style.marginLeft = `${this.itemLeft}%`;
    
    this.firstItem.addEventListener("transitionend", () => this.firstItem.classList.remove(this.transitionClass)); // add bind, for is correct working "this"
  }
}

const carouselReview = new Сarousel("reviews__btn", "reviews__show-container", "services__item--transition");

document.addEventListener("click", () => carouselReview.move());