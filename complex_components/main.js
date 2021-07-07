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
        },
        {
            id: 'carousel-travel',
            type: 'large',
            breakpoints: {
                1100: 4,
                800: 3,
                600: 2,
                500: 1
            }
        },
        {
            id: 'carousel-tech',
            type: 'large',
            breakpoints: {
                1100: 4,
                800: 3,
                600: 2,
                500: 1
            }
        },
        {
            id: 'carousel-gallery',
            type: 'small',
            dotControlsColor: "#fff",
            
        },
    ];

    state.carousels = carouselConfigs.map((config) => new Carousel(config));
    
}