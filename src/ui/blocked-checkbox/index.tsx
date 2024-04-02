import { BlockedCheckboxProps } from './blocked-checkbox';
import styles from './styles';

const classNames = (...classes: string[]): string => {
    return classes.filter(Boolean).join(' ');
};

const BlockedCheckbox = (props: BlockedCheckboxProps) => {
    const { className: labelClasses, ...inputProps } = props;

    return (
        <div
            className={classNames(
                'inline-flex items-center gap-2',
                props.rootClasses!
            )}
        >
            <input
                {...inputProps}
                ref={props.inputRef}
                type="checkbox"
                id={props.id || 'checkbox'}
                checked={props.checked}
                className={classNames('peer hidden')}
                onChange={props.onChange}
            />
            <label
                htmlFor={props.id || 'checkbox'}
                className={classNames(
                    styles.labelDefault,
                    styles[props.variant || 'outline'],
                    labelClasses!
                )}
            >
                {props.label || props.children}
            </label>
        </div>
    );
};

export default BlockedCheckbox;
