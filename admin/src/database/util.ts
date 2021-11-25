import { datetime, toTimeStamp } from "@src/util/date";
import {ValueTransformer} from "typeorm/decorator/options/ValueTransformer";

export const timeDefaultTransformer: ValueTransformer = {
    from(raw: string | number | null): number | null {
        if(raw === null)
            return raw;
        return typeof raw === "number" ? raw : toTimeStamp(raw);
    },
    to(date: string | number | null): string | null {
        return typeof date === "number" ? datetime(date) : date
    }
};