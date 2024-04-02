import { DropdownActionProps } from './dropdown-action';
import { Menu } from '@headlessui/react';
import { useTranslations } from 'next-intl';

function DropdownAction(props: DropdownActionProps) {
    // Read translations
    const tGlobal = useTranslations('global');

    return (
        <div className="flex items-center justify-end gap-x-2">
            <button
                className="rounded-lg border border-primary bg-white px-3 py-2 text-xs transition-colors hover:bg-primary hover:text-white"
                onClick={props.reset}
            >
                {tGlobal('reset')}
            </button>
            <Menu.Item>
                {({ close }) => (
                    <button
                        className="rounded-lg bg-emerald-500 px-3 py-2 text-xs text-white transition-colors hover:bg-emerald-600"
                        onClick={props.apply}
                    >
                        {tGlobal('apply')}
                    </button>
                )}
            </Menu.Item>
        </div>
    );
}

export default DropdownAction;
