import React from 'react';
import { MiniCardProps } from './mini-card-props';

const LaunchMiniCard = (props: MiniCardProps) => {
    const { isActive, handleChange, launch } = props;
    return (
        <div
            onClick={handleChange}
            className={`group px-3 py-2 transition-colors  hover:bg-black/70 ${
                isActive && 'bg-black/70'
            }`}
        >
            <div
                className={`cursor-pointer space-y-2 border-t-4 border-gray-300/50 py-2 transition-colors group-hover:border-emerald-500 ${
                    isActive && '!border-emerald-500'
                } `}
            >
                <h3 className="text-sm">{launch?.title}</h3>
                <p className="text-[10px]/4 text-[#E5E7EB]">
                    {launch?.description}
                    <br />
                    with 30% Down payments
                </p>
            </div>
        </div>
    );
};

export default LaunchMiniCard;
