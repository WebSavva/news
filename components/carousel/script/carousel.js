// document.addEventListener('DOMContentLoad', () => {});

class Carousel {
    constructor(config) {
        //initializaing the configuration
        this._config = config;
        this.slideDuration = this._config.interval;
        this.id = this._config.id;
        this.breakpoints = this._config.breakpoints;
        this.currentDirection = "right";

        this.carouselElement = document.getElementById(this.id);
        this.items = Array.from( this.carouselElement.querySelectorAll('.carousel__item') );
        this.itemsNumber = this.items.length;
        this.carouselStart = 0;
        this.controls = Array.from( document.body.querySelectorAll(`[data-carousel-target="${this.id}"`) );
        this.carouselContent = this.carouselElement.querySelector('.carousel__content');
        this.setUpCarousel();
    }

    setUpCarousel() {
        this.calculateSize();

        this.currentSlide = this.carouselStart;

        this.controls.forEach((control) => control.addEventListener('click', ({target}) => {

            clearTimeout(this.delayedAutoMove);
            clearInterval(this.carouselInterval);

            const currentControl = target.closest('[data-carousel-target]');

            if (!currentControl) return;

            const moveDirection = currentControl.dataset.carouselDirection;

            this.moveContent(moveDirection);

            this.delayedAutoMove = setTimeout(() => {
                this.setAutoMove();
            }, this.slideDuration * 2);
        }));

        window.onresize = () => {
            console.log('fired');
            this.calculateSize();
            this.moveContent("right");
        };

        this.setAutoMove();
    }

    moveContent(direction = this.currentDirection) {
        
        let fastMove = false;
        if (direction === "left") {
            if (this.currentSlide === this.carouselStart ) {
                this.currentSlide = this.carouselEnd;
                fastMove = true;
            } else {
                this.currentSlide--
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

        this.carouselContent.style.transform = `translateX(-${ this.currentSlide  * (100 / this.itemsPerSlide)}%)`;
    }

    setAutoMove() {
        this.carouselInterval = setInterval(() => {
            if (this.currentSlide === this.carouselStart ) this.currentDirection = "right";
            if (this.currentSlide === this.carouselEnd ) this.currentDirection = "left";
            this.moveContent();
        }, this.slideDuration);
    }

    calculateSize() {
        let currentBreakpoint;
        for (let breakpoint of Object.keys(this.breakpoints) ) {
            console.log(window.innerWidth);
            if (+breakpoint <= window.innerWidth) {
               currentBreakpoint = breakpoint;
            }
        }

        if (!currentBreakpoint) {
            currentBreakpoint = Object.keys(this.breakpoints).reduce((prev, next) => {
                return +prev < +next ? +next : +prev;
            });
        }

        this.itemsPerSlide = this.breakpoints[currentBreakpoint];
        this.carouselEnd = this.itemsNumber - this.itemsPerSlide;
        this.currentSlide = 0;
        
        this.items.forEach( (item) => item.style.flex = `0 0 ${100 / (this.itemsPerSlide ?? 1) }%`);
    }
}