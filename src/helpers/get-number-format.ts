const getNumberFormat = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
};

export default getNumberFormat;
