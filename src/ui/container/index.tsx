import { ContainerProps } from './container';

const Container = (props: ContainerProps) => {
    return (
        <main
            className="h-full w-full px-6 pb-[calc(72px_+_20px)] lg:px-28 lg:pb-0"
            {...props}
        >
            {props.children}
        </main>
    );
};

export default Container;
