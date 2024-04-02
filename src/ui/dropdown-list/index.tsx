import { Menu, Transition } from '@headlessui/react';
import { Fragment, MouseEvent } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { DropDownProps, DropdownItem } from './dropdown.d';
import { AR_LOCALE } from '@/constants';
import { useLocale } from 'next-intl';

function DropDown({ hideArrow = false, ...props }: DropDownProps) {
    const locale = useLocale();

    const selectItemHandler =
        (item: DropdownItem) =>
        (event: MouseEvent): void => {
            const selectedData = { ...item, event: event.target as Node };
            props.onClick(selectedData);
        };

    return (
        <div className="h-full w-full">
            <Menu as="div" className="relative inline-block h-full w-full">
                <div className="h-full">
                    <Menu.Button
                        className={`inline-flex h-full items-center  ${
                            locale === AR_LOCALE ? '' : ''
                        }   justify-center gap-2 rounded-md px-4 py-2 text-start align-middle text-black hover:bg-opacity-30 focus:outline-none`}
                    >
                        {props.icon && (
                            <props.icon
                                className="h-6 w-6 text-[#D6D6D6]"
                                aria-hidden="true"
                            />
                        )}
                        <p className="truncate px-1 text-xs capitalize md:text-sm">
                            {props.title && props.title + ':'}
                            {props.value}
                        </p>
                        {!hideArrow && (
                            <FaChevronDown
                                className="mx-2 -mr-1 me-2 h-4 w-3 text-black hover:text-violet-100"
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
                        className={`absolute ${
                            locale === AR_LOCALE ? 'right-0' : 'left-0'
                        } z-drawer w-full origin-top-right divide-y divide-gray-100 rounded-b-md border border-gray-100 bg-white shadow-lg focus:outline-none`}
                    >
                        {props.items.map((item) => (
                            <div key={item.value} className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={selectItemHandler(item)}
                                            className={`${
                                                active
                                                    ? ' text-primary'
                                                    : 'text-black'
                                            } group  flex ${
                                                locale === AR_LOCALE
                                                    ? 'text-right'
                                                    : ''
                                            } w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                                        >
                                            {item.icon && (
                                                <item.icon
                                                    className="ms-2 h-5 w-5"
                                                    aria-hidden="true"
                                                ></item.icon>
                                            )}

                                            {item.label}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default DropDown;
