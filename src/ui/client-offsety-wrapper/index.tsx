'use client';
import React, { useRef } from 'react';

import Footer from '../footer';
import { Header } from '../header/header';
import YoffsetWrapper from '../offset-y-wrapper';

type ClientOffset = {
    children: React.ReactNode;
    language: string;
};
const ClientOffsetWrapper = (props: ClientOffset) => {
    const topRef = useRef<HTMLElement>(null);
    const bottomRef = useRef<HTMLElement>(null);

    return (
        <>
            <Header ref={topRef} />
            <YoffsetWrapper
                // refTop={topRef}
                refBottom={bottomRef}
                // offsetBottom={70}
                offsetY={66}
            >
                {props.children}
            </YoffsetWrapper>
            <Footer ref={bottomRef} />
        </>
    );
};

export default ClientOffsetWrapper;
