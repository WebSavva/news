export default class Carousel {
  constructor({
    type = "small",
    breakpoints = {}, 
    interval = 3e3, 
    id,
    style : {
      dotControlsColor = "gray",
      dotControlsPosition = {},
      itemsGap = 0
    } = {}
 } = {}) {
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
    this.itemsGap = itemsGap;

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
            this.switchSlide("right");
        };

    } else if ( this.type === "small" ) {
        this.setUpDotControls();
    }


    this.controls.forEach((control) =>
      control.addEventListener("click", ({ target }) => {
          this.controlClickHandle(target);
      })
    );

    this.setItemsPosition();
    this.setAutoMove();
  }


  //SWITCHING SLIDE FUNCTIONALITY
  switchSlide(direction = this.currentDirection) {
    let prevSlideNumber = this.currentSlide;
    this.changeCurrentSlideNumber(direction);

    
    if (this.type === "small") {
      this.selectCurrentDot();
      this.items[prevSlideNumber].style.opacity = 0;
      this.items[this.currentSlide].style.opacity = 1;
    } else if (this.type === "large") {
      this.carouselContent.style.transform = `translateX(-${
        this.currentSlide * (100 / this.itemsPerSlide)
      }%)`;
    }
  }

    changeCurrentSlideNumber(direction) {
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
  }
  
  controlClickHandle(target) {
      
    const currentControl = target.closest("[data-carousel-target]");
    
    if (!currentControl) return;
    
    clearTimeout(this.delayedAutoMove);
    clearInterval(this.carouselInterval);
    const moveDirection = currentControl.dataset.carouselDirection;
    
    this.switchSlide(moveDirection);
    
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
      this.switchSlide();
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
      this.carouselContent.classList.add('carousel__content--large');
    } else if (this.type === "small") {
      this.itemsPerSlide = 1;
      this.carouselEnd = this.itemsNumber - 1;
      this.carouselContent.classList.add('carousel__content--small');
    }

  }
  setItemsPosition() {
    this.items.forEach(
      (item) => {
        if (this.type === "large") {
          item.style.cssText = `flex: 0 0 ${100 / this.itemsPerSlide}%; padding: 0 ${this.itemsGap}rem`; 
        } else if (this.type === "small") {
          item.classList.add('carousel__item--small');
        }
      }
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
    let dotsWrapperStyle = `--carousel-dot-color:${this.dotControlsColor};`;
    dotsWrapperStyle += Object.entries(this.dotControlsPosition).reduce((styledPosition,[posName, posValue]) => styledPosition += `${posName}:${posValue}rem;`, dotsWrapperStyle);
    this.dotsWrapper.style.cssText = dotsWrapperStyle;
                
    //attaching event listener
    this.dotsWrapper.addEventListener('click', ({target}) => {
        if (! target.classList.contains('carousel__dot') ) return;
        clearTimeout(this.delayedAutoMove);
        clearInterval(this.carouselInterval);

        let prevSlideNumber = this.currentSlide;
        this.items[prevSlideNumber].style.opacity = 0;
        
        this.currentSlide = +target.dataset.carouselSlide;
        this.selectCurrentDot();
        
        this.items[this.currentSlide].style.opacity = 1;
        
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
