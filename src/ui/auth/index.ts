export const socialPopupWindow = (url: string, title: string, lang: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
        window.innerWidth ??
        document.documentElement.clientWidth ??
        screen.width;

    const height =
        window.innerHeight ??
        document.documentElement.clientHeight ??
        screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const customUrl = `${window.location.origin}/${lang}/${url}`;

    const newWindow = window.open(
        customUrl,
        title,
        `width=${500 / systemZoom},height=${
            550 / systemZoom
        },top=${top},left=${left}`
    );
    newWindow?.focus();
};
