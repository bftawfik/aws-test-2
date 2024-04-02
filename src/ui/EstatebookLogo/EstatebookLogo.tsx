import { EstatebookPalastineLogo, Logo } from '../svg';

interface EstatebookLogoProps {
    isNewBranding?: boolean;
}
const EstatebookLogo = ({ isNewBranding }: EstatebookLogoProps) => {
    return isNewBranding ? <EstatebookPalastineLogo /> : <Logo />;
};

export default EstatebookLogo;
