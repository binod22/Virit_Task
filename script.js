class Carousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector(".carousel-track");
    this.items = Array.from(container.querySelectorAll(".carousel-item"));
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.init();
    this.addEventListeners();
  }

  init() {
    this.updateCarousel();
  }

  updateCarousel() {
    this.items.forEach((item, index) => {
      item.classList.remove("active", "prev", "next", "hidden");

      if (index === this.currentIndex) {
        item.classList.add("active");
      } else if (index === this.getRelativeIndex(-1)) {
        item.classList.add("prev");
      } else if (index === this.getRelativeIndex(1)) {
        item.classList.add("next");
      } else {
        item.classList.add("hidden");
      }
    });


    setTimeout(() => {
      this.isTransitioning = false;
    }, 200); 
  }

  getRelativeIndex(offset) {
    const totalItems = this.items.length;
    return (this.currentIndex + offset + totalItems) % totalItems;
  }

  prev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = this.getRelativeIndex(-1);
    this.updateCarousel();
  }

  next() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = this.getRelativeIndex(1);
    this.updateCarousel();
  }

  addEventListeners() {
    let scrollTimeout;

    this.container.addEventListener("wheel", (e) => {
      if (this.isTransitioning) return; 

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (e.deltaY < 0) {
          this.prev(); 
        } else if (e.deltaY > 0) {
          this.next(); 
        }
      }, 80); 
    });
  }
}

//  carousel initialization
const carousel = new Carousel(document.querySelector(".carousel-container"));
