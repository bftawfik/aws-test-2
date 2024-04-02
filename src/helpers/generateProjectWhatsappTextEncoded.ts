import { Address, Name } from '@/types';

export const generateProjectWhatsappTextEncoded = (
    name?: Name,
    startPrice?: number,
    Location?: Address,
    projectLink?: string
) => {
    const titleText = !!name ? `Title: ${name}\n` : '';
    const startPriceText = !!startPrice ? `Start Price: ${startPrice}\n` : '';
    const locationText = !!Location ? `Location: ${Location}\n` : '';
    const linkText = !!projectLink ? `Link: ${projectLink}\n` : '';

    const whatsappText = `Hello, I would like to get more information about this project you posted on estatebook.com:
    ${titleText}${startPriceText}${locationText}${linkText}
    Modifying this message will prevent the inquiry from being sent to the agent.`;

    return encodeURIComponent(whatsappText);
};
