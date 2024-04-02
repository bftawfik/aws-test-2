import { UnitType } from '@/types';

export interface SearchTypeProps {
    residential: UnitType[];
    commercial: UnitType[];
    handleReset: () => void;
    handleApply: () => void;
}
