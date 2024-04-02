import { hotline, whatsapp, emptyCountryCode, egCountryCode } from '@/constants';
import { PhoneCallIcon, TheAddressLogo, WhatsAppIcon } from '@/ui/svg';
import React from 'react';

const ActiveLaunch = ({ launch }: any) => {
    return (
        <div className="space-y-2">
            <div className="flex w-full items-center justify-between">
                <div className="inline-block rounded-lg bg-[#FFD700] px-3 py-2 text-xs font-medium text-black">
                    NEW LAUNCH
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black/40">
                    <TheAddressLogo />
                </div>
            </div>
            <div className="space-y-6 text-white">
                <h2 className="text-4xl font-extrabold capitalize sm:text-5xl">
                    {launch?.title}
                    <span className="font-normal italic">Phase 2</span>
                </h2>
                <p className="text-sm text-[#E5E7EB]">
                    {launch?.description} <br />
                    with 30% Down payments
                </p>

                <div className="flex items-center gap-x-2">
                    <div className="rounded-lg border px-2 py-1 text-xs font-medium">
                        Apartment
                    </div>
                    <div className="rounded-lg border px-2 py-1 text-xs font-medium">
                        Villas
                    </div>
                    <div className="rounded-lg border px-2 py-1 text-xs font-medium">
                        Chalets
                    </div>
                </div>

                <div className="flex gap-x-3">
                    <a
                        href={`tel:${emptyCountryCode}${hotline}`}
                        className="inline-flex items-center gap-x-2 rounded-lg bg-white px-4 py-2 text-xs font-medium capitalize text-black transition-colors hover:bg-gray-100"
                    >
                        <PhoneCallIcon
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                        />
                        Call Now
                    </a>
                    <a
                        href={`https://wa.me/${egCountryCode}${whatsapp}`}
                        className="inline-flex items-center gap-x-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-medium capitalize transition-colors hover:bg-emerald-600"
                    >
                        <WhatsAppIcon
                            viewBox="0 0 24 24"
                            className="h-5 w-5 fill-current text-white"
                        />
                        Whatsapp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ActiveLaunch;
