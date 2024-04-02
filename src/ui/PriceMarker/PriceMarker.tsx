import styles from './PriceMarker.module.css';
import { priceFormatter } from '@/helpers/priceFormatter';

interface PriceMarkerProps {
    price: number;
}
const PriceMarker = ({ price }: PriceMarkerProps) => {
    return (
        <div className={styles.priceMarkerPopup}>
            <span className="text-sm font-medium leading-7 tracking-tight">
                {priceFormatter(price)}
            </span>
        </div>
    );
};

export default PriceMarker;
