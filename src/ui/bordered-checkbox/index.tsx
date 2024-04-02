import React from 'react';
import { BorderedChecboxProps } from './bordered-checkbox';
import { AiOutlineCheck } from 'react-icons/ai';

const BorderedCheckbox = (props: BorderedChecboxProps) => {
    return (
        <li className="text-xs">
            <input
                type="checkbox"
                id={props.id}
                value={props.id}
                checked={props.checked}
                className="peer hidden"
                onChange={props.onChange}
            />
            <label
                htmlFor={props.id}
                className={`flex w-full cursor-pointer items-center justify-between gap-1  rounded-md border border-gray-200 !px-3.5 py-3 text-center  text-black shadow-sm hover:bg-gray-50  ${
                    props.styleType && props.styleType === 'fill'
                        ? 'h-10 w-10 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white'
                        : 'bg-white peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-black'
                } capitalize transition-all  duration-200 hover:text-primary  `}
            >
                {props.withBox && (
                    <div
                        className={`mx-1 flex h-5 w-5 items-center rounded-md border border-gray-200 p-1  ${
                            props.checked ? 'bg-primary' : ''
                        }`}
                    >
                        {props.checked && (
                            <AiOutlineCheck
                                size={20}
                                className="text-base text-white"
                            />
                        )}
                    </div>
                )}
                {props.withIcon && props.checked && (
                    <AiOutlineCheck className="text-base text-primary" />
                )}

                {props.label}
            </label>
        </li>
    );
};

export default BorderedCheckbox;
