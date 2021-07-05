class Carousel {
  constructor({type = "small", breakpoints = {}, interval = 3e3, id, dotControlsColor = "gray", dotControlsPosition = "top-right" } = {}) {
    //initializaing the configuration 
    this.type = type
    
    this.id = id;
    this.slideDuration = interval;
    this.breakpoints = breakpoints;
    this.currentDirection = "right";
    this.carouselStart = 0;
    this.currentSlide = this.carouselStart;
    this.dotControlsColor = dotControlsColor;
    this.dotControlsPosition = dotControlsPosition;

    this.carouselElement = document.getElementById(this.id);
    this.items = Array.from(
      this.carouselElement.querySelectorAll(".carousel__item")
    );
    this.itemsNumber = this.items.length;
    this.carouselContent = this.carouselElement.querySelector(".carousel__content");
    this.controls = Array.from( document.body.querySelectorAll(`[data-carousel-target="${this.id}"`) );
    this.setUpCarousel();
  }

  setUpCarousel() {
    this.calculateSize();

    if ( this.type === "large" ) {
        window.onresize = () => {
            this.calculateSize();
            this.moveContent("right");
        };
    } else if ( this.type === "small" ) {
        this.setUpDotControls();
    }


    this.controls.forEach((control) =>
      control.addEventListener("click", ({ target }) => {
          this.controlClickHandle(target);
      })
    );


    this.setAutoMove();
  }

  moveContent(direction = this.currentDirection) {
    let fastMove = false;
    if (direction === "left") {
      if (this.currentSlide === this.carouselStart) {
        this.currentSlide = this.carouselEnd;
        fastMove = true;
      } else {
        this.currentSlide--;
      }
    } else {
      if (this.currentSlide === this.carouselEnd) {
        this.currentSlide = this.carouselStart;
        fastMove = true;
      } else {
        this.currentSlide++;
      }
    }

    if (fastMove) {
      this.carouselContent.style.transition = "all 1s";
    } else {
      this.carouselContent.style.transition = "";
    }

    this.carouselContent.style.transform = `translateX(-${
      this.currentSlide * (100 / this.itemsPerSlide)
    }%)`;

    if (this.type === "small") {
       this.selectCurrentDot();
    }
  }

  controlClickHandle(target) {
      
    const currentControl = target.closest("[data-carousel-target]");
      
    if (!currentControl) return;
      
    clearTimeout(this.delayedAutoMove);
    clearInterval(this.carouselInterval);
    const moveDirection = currentControl.dataset.carouselDirection;

    this.moveContent(moveDirection);

    this.delayedAutoMove = setTimeout(() => {
      this.setAutoMove();
    }, this.slideDuration * 2);
  }

  setAutoMove() {
    this.carouselInterval = setInterval(() => {
      if (this.currentSlide === this.carouselStart)
        this.currentDirection = "right";
      if (this.currentSlide === this.carouselEnd)
        this.currentDirection = "left";
      this.moveContent();
    }, this.slideDuration);
  }

  calculateSize() {
    
    let currentBreakpoint;
    for (let breakpoint of Object.keys(this.breakpoints)) {
      if (+breakpoint <= window.innerWidth) {
        currentBreakpoint = breakpoint;
      }
    }

    if (this.type === "large") {
        this.itemsPerSlide = this.breakpoints[currentBreakpoint];
        this.carouselEnd = this.itemsNumber - this.itemsPerSlide;
    } else if (this.type === "small") {
        this.itemsPerSlide = 1;
        this.carouselEnd = this.itemsNumber - 1;
    }

    this.items.forEach(
      (item) => (item.style.flex = `0 0 ${100 / this.itemsPerSlide}%`)
    );
  }

  setUpDotControls() {
    //creating elements
    this.dotsWrapper = document.createElement('div');
    this.dotsWrapper.className = "carousel__dots-wrapper";
    
    this.dotElements = [];
    for (let i = 0; i < this.itemsNumber; i++) {
        const dot = document.createElement('span');
        dot.className = "carousel__dot";
        dot.setAttribute('data-carousel-slide', i);
        this.dotElements.push(dot);
    }
    this.selectCurrentDot();
    this.dotsWrapper.append(...this.dotElements);
    
    this.dotsWrapper.style.cssText = `--carousel-dot-color:${this.dotControlsColor}`;
    switch (this.dotControlsPosition) {
        case "bottom":
            this.dotsWrapper.style.bottom = "10%";
            this.dotsWrapper.style.left = "50%";
            this.dotsWrapper.style.transform = "translateX(-50%)";
            break;
            case "top-right":
                default:
                    this.dotsWrapper.style.top = "10%";
                    this.dotsWrapper.style.right = "10%";
                    break;
                }
                
                
    //attaching event listener
    this.dotsWrapper.addEventListener('click', ({target}) => {
        if (! target.classList.contains('carousel__dot') ) return;
        clearTimeout(this.delayedAutoMove);
        clearInterval(this.carouselInterval);

        this.currentSlide = +target.dataset.carouselSlide;
        this.selectCurrentDot();
        
        this.carouselContent.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        this.delayedAutoMove = setTimeout(() => {
            this.setAutoMove();
          }, this.slideDuration * 2);
    });

    this.carouselElement.append(this.dotsWrapper);

  }

  selectCurrentDot() {
    this.dotElements.forEach((dot) => dot.classList.remove('carousel__dot--selected'));
    this.dotElements[this.currentSlide].classList.add('carousel__dot--selected')
  }
}

// window.onload = () => {
//   const carousel1 = new Carousel({
//     id: "carousel1",
//     breakpoints: {
//         900: 3,
//         700: 2,
//         500: 1
//     },
//     interval: 3e3,
//     type: "small",
//     dotControlsPosition: "top-right",
//     dotControlsColor: "red"
//   });
//   console.log(carousel1);
// };
