import LargeCarousel from './LargeCarousel';
import SmallCarousel from './SmallCarousel';

export default function buildCarousel(config) {
    if ( config.type === 'small' ) {
        return new SmallCarousel(config);
    } else if (config.type === 'large' ) {
        return new LargeCarousel(config);
    }
}