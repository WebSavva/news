export default class Carousel {
    constructor(config) {
        (
            {
                id: this.id,
                type: this.type,
                duration: this.duration = 3e3,
            }
        = config);

        this.carouselStart = 0;
        this.currentSlide = this.carouselStart;
        this.previousSlide = 0;
        this.currentDirection = "right";
        
        this.carouselElement = document.getElementById(this.id);
        this.items = Array.from(
            this.carouselElement.querySelectorAll(".carousel__item")
            );
        this.itemsNumber = this.items.length;
        this.carouselContent = this.carouselElement.querySelector(".carousel__content");
        this.mainControls = Array.from( document.body.querySelectorAll(`[data-carousel-target="${this.id}"]`) );
    }

    setUpCarousel() {
      this.setUpMainControls();
      this.calculateSize();
      this.setItemsPosition();
      this.setAutoMove();
    }

    //SETTING UP MAIN CONTROLS
    setUpMainControls() {
        this.mainControls.forEach((control) =>
            control.addEventListener("click", ({ target }) => {
            this.mainControlClickHandle(target);
            })
        );
    }

    //CLICK HANDLER FOR MAIN CONTROLS
    mainControlClickHandle(target) {
      const currentControl = target.closest("[data-carousel-target]");
      if (!currentControl) return;

      this.currentDirection = target.dataset.carouselDirection;
      this.removeAutoMove();
      this.changeCurrentSlideNumber();
      this.switchSlide();
      this.setDelayedAutoMove();
    }

    changeCurrentSlideNumber() {
        this.previousSlide = this.currentSlide;
        if (this.currentDirection === "left") {
          if (this.currentSlide === this.carouselStart) {
            this.currentSlide = this.carouselEnd;
          } else {
            this.currentSlide--;
          }
        } else {
          if (this.currentSlide === this.carouselEnd) {
            this.currentSlide = this.carouselStart;
          } else {
            this.currentSlide++;
          }
        }
    }

    setAutoMove() {
        this.carouselInterval = setInterval(() => {
            if (this.currentSlide === this.carouselStart) this.currentDirection = "right";
            if (this.currentSlide === this.carouselEnd)  this.currentDirection = "left";
            this.changeCurrentSlideNumber();
            this.switchSlide();
          }, this.duration);
    }

    removeAutoMove() {
        clearTimeout(this.delayedAutoMove);
        clearInterval(this.carouselInterval);
    }

    setDelayedAutoMove() {
        this.delayedAutoMove = setTimeout(() => {
            this.setAutoMove();
          }, this.duration * 2);
    }
    
    calculateSize() {

    }

    setItemsPosition() {

    }

    switchSlide() {

    }
}
