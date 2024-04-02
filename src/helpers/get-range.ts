export const getRange = (start: number, stop: number, step: number) => {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, index) => start + index * step
    );
};

export function getMillionsRange(start: number, stop: number, step: number) {
    const range: { label: string; value: number }[] = [];

    Array.from({ length: (stop - start) / step + 2 }, (_, item) => {
        const currentLabel = item === 0 ? item + 1 : item * step;
        const currentValue = currentLabel * 1000000;
        range.push({ label: currentLabel + ' M', value: currentValue });
    });
    return range;
}
export function generateSequence(start: number, end: number, step: number) {
    const sequence = [];
    let currentStep = step;
    for (let i = start; i <= end; i += currentStep) {
        sequence.push({ label: i.toLocaleString(), value: i });
        if (i >= 2000000) {
            currentStep = 2000000;
        }
        if (i >= 10000000) {
            currentStep = 10000000;
        }
        if (i >= 20000000) {
            currentStep = 20000000;
        }
    }
    return sequence;
}
