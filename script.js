class Carousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector(".carousel-track");
    this.items = Array.from(container.querySelectorAll(".carousel-item"));
    this.currentIndex = 0;
    this.isTransitioning = false; // Prevent simultaneous transitions

    this.init();
    this.addEventListeners();
  }

  init() {
    // Set initial positions
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

    // Allow interaction once transition completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500); // Match the CSS transition duration
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
      if (this.isTransitioning) return; // Ignore if transitioning

      clearTimeout(scrollTimeout); // Reset throttle timer

      scrollTimeout = setTimeout(() => {
        if (e.deltaY < 0) {
          this.prev(); // Scroll up
        } else if (e.deltaY > 0) {
          this.next(); // Scroll down
        }
      }, 80); // Throttle duration (in milliseconds)
    });
  }
}

// Initialize the carousel
const carousel = new Carousel(document.querySelector(".carousel-container"));
