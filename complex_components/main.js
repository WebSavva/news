import Carousel from './carousel/script/carousel';

const state = {};
window.onload = () => {

    const carouselConfigs = [
        {
            id: 'carousel-world',
            type: 'large',
            breakpoints: {
                1100: 4,
                800: 3,
                600: 2,
                500: 1
            }
        }
    ];

    state.carousels = carouselConfigs.map((config) => new Carousel(config));
    
}