import * as _ from 'lodash';
import {filter, flow, join, map, toPairsIn} from 'lodash/fp';

export const objectToString = (value: any): string => JSON.stringify(value);

export const objectToStringWithDeleteKeys = (wantedDeleteArrayKeys: string[]): (obj: any) => string =>
    flow(
        toPairsIn,
        filter(([key]) => !wantedDeleteArrayKeys.includes(key)),
        map(([key, value]) => {
            return value && typeof value === 'object' ?
                `"${key}":${value.toString()}` :
                `"${key}":"${value}"`;
        }),
        join(','),
        (result) => `{${result}}`,
    );

export const deleteBlankOrNull = (value: any, wantedDeleteArrayKeys: string[]): any => 
    _.chain(value)
        .toPairsIn()
        .filter((data) => !!data[1] || data[1] === 0)
        .filter(data => !(wantedDeleteArrayKeys.includes(data[0])))
        .reduce((result, data) => {
            result[data[0]] = data[1];
            return result;
        }, {} as any)
        .value();
