import BigNumber from "bignumber.js";


const generalHelper = {
    stringify: function (arg1: string | number, arg2: string, options: any) {
        return JSON.stringify(arg1);
    },
    ifType: function (arg1: string, arg2: any, options: any) {
        return arg1 === arg2 ? options.fn() : options.inverse();
    },
    ifNotType: function (arg1: string, arg2: any, options: any) {
        return arg1 !== arg2 ? options.fn() : options.inverse();
    },
    ifBothNotType: function (arg1: string, arg2: any, arg3: any, options: any) {
        return (arg1 !== arg2 && arg1 !== arg3) ? options.fn() : options.inverse();
    },
    unlessType: function (arg1: string, arg2: any, options: any) {
        return arg1 === arg2 ? options.inverse() :  options.fn();
    },
    withComma: function (arg1: string, options: any) {
        return arg1 ? new BigNumber(arg1).toFormat() : '-';
    },
    multiplyWithComma: function (arg1: string | number, arg2: string, options: any) {
        return new BigNumber(arg1).times(arg2).toFormat();
    },
};

export const hbsHelper = {
    ...generalHelper,
};
