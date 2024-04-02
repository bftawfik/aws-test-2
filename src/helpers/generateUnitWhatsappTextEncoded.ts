import { Address, Name } from '@/types';

export const generateUnitWhatsappTextEncoded = (
    title?: Name,
    type?: string,
    price?: number,
    address?: Address,
    unitLink?: string
) => {
    const titleText = !!title ? `Title: ${title}\n` : '';
    const typeText = !!type ? `Type: ${type}\n` : '';
    const priceText = !!price ? `Price: ${price}\n` : '';
    const locationText = !!address ? `Location: ${address}\n` : '';
    const linkText = !!unitLink ? `Link: ${unitLink}\n` : '';

    const whatsappText = `Hello, I would like to get more information about this property you posted on estatebook.com:
    ${titleText}${typeText}${priceText}${locationText}${linkText}
    Modifying this message will prevent the inquiry from being sent to the agent.`;

    return encodeURIComponent(whatsappText);
};
