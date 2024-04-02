import EstatebookLogo from '@/ui/EstatebookLogo/EstatebookLogo';

const EstatebookLoader: React.FC = () => {
    return (
        <div className="mx-auto flex h-full w-full animate-pulse flex-col items-center justify-center">
            <EstatebookLogo isNewBranding={true} />
        </div>
    );
};

export default EstatebookLoader;
