import { Fragment } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { CustomDropDownProps } from './custom-dropdown';
import { Menu, Transition } from '@headlessui/react';
import { useLocale } from 'next-intl';
import { AR_LOCALE } from '@/constants';

const CustomDropdown = ({
    children,
    icon,
    label,
    showArrow = true,
    className,
}: CustomDropDownProps) => {
    // Read localization
    const locale = useLocale();

    return (
        <Menu as="div" className="inline-block h-full w-full">
            <div className="h-full">
                <Menu.Button
                    className={`inline-flex h-full items-center justify-center gap-2  rounded-md p-4 text-black hover:bg-opacity-30 focus:outline-none ${
                        className || ''
                    }`}
                >
                    {icon && icon}

                    <span className="truncate px-1 text-xs  capitalize md:text-sm">
                        {label}
                    </span>

                    {showArrow && (
                        <FaChevronDown
                            className="mx-2 h-4 w-3 text-black "
                            aria-hidden="true"
                        />
                    )}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={`absolute p-3 ${
                        locale === AR_LOCALE ? 'left-0' : 'right-0'
                    } z-40 min-w-full origin-top-right divide-y divide-gray-100 rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                    {children}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default CustomDropdown;
