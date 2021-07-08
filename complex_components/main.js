import buildCarousel from './carousel/script/buildCarousel';

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
            },
            style: {
                itemsGap:10,
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
            },
            style: {
                itemsGap:10,
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
            },
            style: {
                itemsGap:10,
            }
        },
        {
            id: 'carousel-gallery',
            type: 'small',
            style: {
                dotControlsColor: "#fff",
                itemsGap: 0,
                dotControlsPosition: {
                    top: 20,
                    right: 20
                }
            }
        },
    ];

    state.carousels = carouselConfigs.map((config) => buildCarousel(config));
    
}