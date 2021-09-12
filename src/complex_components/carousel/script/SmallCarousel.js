import Carousel from './Carousel';

export default class SmallCarousel extends Carousel {
    constructor(config) {
        super(config);

        ({  
            style: {
                dotControlsPosition: this.dotControlsPosition = {},
                dotControlsColor: this.dotControlsColor = '#fff',
                dotControlsCentered: this.dotControlsCentered = false,
            }
        } = config);

        this.setUpCarousel();
    }

    setUpCarousel() {
        this.carouselEnd  = this.itemsNumber - 1;
        super.setUpCarousel();
        this.setUpDotControls();
    }
    setItemsPosition() {
        this.carouselContent.classList.add('carousel__content--small');
        this.items.forEach(
            (item) => item.classList.add('carousel__item--small')
        );
        this.items[this.currentSlide].classList.add('carousel__item--visible')
    }

    switchSlide() {
        this.selectCurrentDot();
        this.items[this.previousSlide].classList.remove('carousel__item--visible')
        this.items[this.currentSlide].classList.add('carousel__item--visible')
    }

    setUpDotControls() {
        //creating elements
        this.dotsWrapper = document.createElement('div');
        this.dotsWrapper.className = "carousel__dots-wrapper";

        this.dotElements = [];
        this.dotElements = Array.from( {length: this.itemsNumber}, (el, i) => {
            const dot = document.createElement('span');
            dot.className = 'carousel__dot';
            dot.dataset.carouselSlide = i;
            return dot;
        });
        
        this.dotsWrapper.append(...this.dotElements);
        this.selectCurrentDot();

        let dotsWrapperStyle = `--carousel-dot-color:${this.dotControlsColor};`;
        dotsWrapperStyle += Object.entries(this.dotControlsPosition).reduce((styledPosition,[posName, posValue]) => styledPosition += `${posName}:${posValue};`, dotsWrapperStyle);
        if (this.dotControlsCentered) {
            dotsWrapperStyle += 'transform: translateX(-50%);';
        }
        this.dotsWrapper.style.cssText = dotsWrapperStyle;
        this.dotsWrapper.addEventListener('click', this.handleDotControlClick.bind(this));
        this.carouselElement.append(this.dotsWrapper);
    }

    handleDotControlClick({target}) {
        const targetedDot = target.closest('.carousel__dot');
        if (! targetedDot ) return;
        this.removeAutoMove();

        this.previousSlide = this.currentSlide;
        this.currentSlide = +targetedDot.dataset.carouselSlide;
        
        this.switchSlide(); 
        this.setDelayedAutoMove();
    }

    selectCurrentDot() {
        this.dotElements.forEach((dot) => dot.classList.remove('carousel__dot--selected'));
        this.dotElements[this.currentSlide].classList.add('carousel__dot--selected')
    }
}