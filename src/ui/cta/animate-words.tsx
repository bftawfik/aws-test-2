'use client';
import { useEffect, useState } from 'react';

const words = [
    'Move',
    'Learn',
    'Discover',
    'Invest',
    'Buy',
    'Rent',
    'Estatebook',
];
let index = 0;

export default function Home() {
    const [word, setWord] = useState(words[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            index = (index + 1) % words.length;
            setWord(words[index]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <div className="transition-opacity duration-1000">{word}</div>;
}
