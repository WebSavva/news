import buildCarousel from './carousel/script/buildCarousel';
import NewsSticker from './news-sticker/script/NewsSticker';
import NewsSicker from './news-sticker/script/NewsSticker'
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
    const newsStickerContent = [
        {
            id: "head-news-sticker",
            data: [
                {
                    time: "13:50 pm",
                    text: "One of the most aniticipated events of this year is being held right now in London. Check it out!"
                },
                {
                    time: "9:00 am",
                    text: "The Amazon CEO Jeff Bezoss is currently considering leaving the office. He's been working in that capacity since 1990s."
                },
                {
                    time: "8:30 pm",
                    text: "Joe Biden to hold the press-conference in the wake of the ongoing crisis."
                },
            ]
        }
    ];

    state.carousels = carouselConfigs.map((config) => buildCarousel(config));
    state.newsStickers = newsStickerContent.map((newsData) => new NewsSticker(newsData));
    
}