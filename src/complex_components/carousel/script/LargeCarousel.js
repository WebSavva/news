import Carousel from './Carousel'

export default class LargeCarousel extends Carousel {
    constructor(config) {
        super(config);

        ({  
            breakpoints: this.breakpoints = {},
            style: {
                itemsGap: this.itemsGap = 10,
            }
        } = config);

        this.setUpCarousel();
        window.addEventListener('resize',() => {
            this.calculateSize();
            this.setItemsPosition();
            this.switchSlide("right");
        });
        
         //manual sliding event listeners
         this.carouselElement.addEventListener('pointerdown', this.initiateManualSliding.bind(this) );
         this.carouselElement.addEventListener('lostpointercapture', this.settleCarousel.bind(this) );
    }

    calculateSize() {
        let currentBreakpoint;
        for (let breakpoint of Object.keys(this.breakpoints)) {
            if (+breakpoint <= window.innerWidth) {
                currentBreakpoint = breakpoint;
            }
        }
        if (currentBreakpoint) {
            this.itemsPerSlide = this.breakpoints[currentBreakpoint];
        } else {
            this.itemsPerSlide = 1;
        }
        this.carouselEnd = this.itemsNumber - this.itemsPerSlide;
        this.carouselContent.classList.add('carousel__content--large');
    }
    
    setItemsPosition() {
        this.items.forEach(
            (item) => {
                item.style.cssText = `flex: 0 0 ${100 / this.itemsPerSlide}%;
                                      padding: 0 ${this.itemsGap / 10}rem`;
            }
            );
            this.itemWidth = this.items[0].offsetWidth;
    }

    changeCurrentSlideNumber() {
        super.changeCurrentSlideNumber();

        if ( Math.abs( this.previousSlide - this.currentSlide) > 1 ) {
            this.carouselContent.classList.add('carousel__content--slow-motion');
        } else {
            this.carouselContent.classList.remove('carousel__content--slow-motion');
        }
    }

    switchSlide() {
        this.currentMovedWidth = this.currentSlide * this.itemWidth;

        this.carouselContent.style.transform = `translateX(-${
            this.currentMovedWidth
          }px)`;
    }

    //MANUAL SLIDING IMPLEMENTATION
    initiateManualSliding(e) {
        const { target, pointerId, isPrimary, clientX } = e;
        const targetedCarousel = target.closest('.carousel');
        if ( targetedCarousel !== this.carouselElement || !isPrimary) return;
        
        this.removeAutoMove();
        this.pointer = pointerId;
        this.pointerInitialCoordinate = clientX;

        this.carouselContent.style.transition = 'all 0s';
        this.carouselElement.onpointermove = this.moveSlidesManually.bind(this);
        this.carouselElement.setPointerCapture(this.pointer);  
    }
    
    moveSlidesManually(e) {
        const { pointerId:currentPointerId, clientX} = e;
        e.preventDefault();
        if (currentPointerId !== this.pointer) return;
        this.movedDistance = this.pointerInitialCoordinate - clientX;
        
        this.carouselContent.style.transform = `translateX(${- (this.currentMovedWidth + this.movedDistance)}px)`;
    }
    
    settleCarousel(e) {
        this.carouselContent.style.transition = '';
        if (this.movedDistance < 0) {
            this.movedDistance = -this.movedDistance;
            this.currentSlide -= Math.ceil( this.movedDistance / this.itemWidth);
            if (this.currentSlide < 0) this.currentSlide = 0;
        } else {
            this.currentSlide += Math.ceil( this.movedDistance / this.itemWidth);
            if (this.currentSlide > this.carouselEnd) this.currentSlide = this.carouselEnd;
        }
        
        this.switchSlide();
        this.carouselElement.onpointermove = null;
        this.setDelayedAutoMove();
    }
}