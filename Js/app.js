/* Constants */
const header = document.getElementById("header"),
      navToggle = document.getElementById("nav-toggle"),
      nav = document.getElementById("nav"),
      intro = document.getElementById("intro");



/* Burger button skin */
function toggleButtonBurger() {
  if(event.target.closest(".nav__link")) console.log(true);
  navToggle.classList.toggle("active");
}

navToggle.addEventListener("click", toggleButtonBurger);



/* active mobile menu */
function toggleMobileMenu() {
  header.classList.toggle("active");
}

navToggle.addEventListener("click", toggleMobileMenu);

/* Closing mobile menu */
nav.addEventListener("click", toggleMobileMenu);
nav.addEventListener("click", toggleButtonBurger);



/* Fixed header menu */
function toggleFixHeader() {
  let scrollHeight = window.pageYOffset,
      introHeight = intro.clientHeight - header.offsetHeight;
  
  if (scrollHeight >= introHeight && !header.classList.contains("fixed")) {
    header.classList.add("fixed");
  } 
  if (scrollHeight < introHeight && header.classList.contains("fixed")) {
    header.classList.remove("fixed");
  }
}

document.addEventListener("scroll", toggleFixHeader);
toggleFixHeader();



/* Smooth scroll main menu*/
function smoothScroll() {
  if (!event.target.dataset.scroll) return;
  
  event.preventDefault();
  let element = document.getElementById(event.target.dataset.scroll),
      elementStartPosition = element.getBoundingClientRect().top + window.scrollY - header.offsetHeight,
      startPosition = window.pageYOffset,
      distance = elementStartPosition - startPosition,
      duration = 1000,
      startTime = null;

  function animation(currentTime) {
    if(startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(timeElapsed, startPosition, distance, duration) {
    timeElapsed /= duration / 2;
    if (timeElapsed < 1) return distance / 2 * timeElapsed * timeElapsed + startPosition;
    timeElapsed--;
    return -distance / 2 * (timeElapsed * (timeElapsed - 2) - 1) + startPosition;
  };

  requestAnimationFrame(animation);
}

document.addEventListener("click", smoothScroll)



/* Accordion */
function accordionToggle(pressedClassName, changedClassName) {
  let element = event.target.closest(pressedClassName);
  if(!element) return;
  event.preventDefault();

  element.closest(changedClassName).classList.toggle("active");
}

document.addEventListener("click", () => {
  accordionToggle(".accordion__header", ".accordion__item")
})



/* Slider Dark */

class Сarousel {
  constructor(buttonId, showContainerId, transitionClass) {
    this.buttonId = buttonId;
    this.showContainerId = document.getElementById(showContainerId);
    this.firstItem = document.getElementById(showContainerId).firstElementChild;
    this.summWidthItems = (this.showContainerId.children.length - 1) * -100;
    this.transitionClass = transitionClass;
    this.itemLeft = 0;
  }

  move() {
    this.e = event.target;
    
    if(this.e.id == (`${this.buttonId}--prev`)) {
      if(!this.itemLeft) return

      this.movePrev()
    }

    if(this.e.id == (`${this.buttonId}--next`)) {
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

const carouselReviewDark = new Сarousel("dark reviews__btn", "dark reviews__show-container", "services__item--transition");

document.addEventListener("click", () => carouselReviewDark.move());


/* Slider White*/
const carouselReviewWhite = new Сarousel("white reviews__btn", "white reviews__show-container", "services__item--transition");

document.addEventListener("click", () => carouselReviewWhite.move());