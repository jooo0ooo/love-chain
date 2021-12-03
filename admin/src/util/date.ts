import * as moment from 'moment';

export const DF_ISO_8601 = 'YYYY-MM-DDTHH:mm:ss.SSS';
export const DF_SIMPLE_ISO_8601 = 'YYYY-MM-DDTHH:mm:ss';
export const DF_NORMAL = 'YYYY-MM-DD HH:mm:ss.SSS';
export const DF_ISO_8601_DATE = 'YYYY-MM-DD';
export const DF_UPLOAD_FILE_FORMAT = 'YYYYMMDDHHmmss';

export const DF_CUSTOM_FORMAT = 'YYYY.MM.DD HH:mm:ss';

export const TIME_ZONE = {
    LONDON: 'Europe/London',
    SEOUL: 'Asia/Seoul',
};

export const datetime = (timestamp: string | number, format = DF_NORMAL): string => {
    return moment(timestamp).utc().format(format);
};

export const toTimeStamp = (date: string): number => {
    return parseInt(moment(date).utc(true).format('x'));
};

export const KRTdatetime = (time: string | number | undefined | null, emptyReturn?: string): string => {
    if (time) {
        return datetime(time, "YYYY-MM-DD HH:mm:ss").toString();
    }
    if(emptyReturn) {
        return emptyReturn;
    }
    return "";
}