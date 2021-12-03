import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import {ParameterException} from "@src/exception/ParameterException";

export interface IntPipeOptions {
    defaultValue?: number;
    maxValue?: number;
    minValue?: number;
    nullable?: boolean;
}

@Injectable()
export class ParseIntPipe implements PipeTransform {

    private readonly message: string;
    private readonly nullable: boolean;
    private readonly defaultValue?: number;
    private readonly maxValue?: number;
    private readonly minValue?: number;

    private readonly logger = new WinstonLogger().setContext('ParseIntPipe');

    constructor(message: string, intPipeOptions: IntPipeOptions = {}) {
        this.message = message;
        const {defaultValue, maxValue, minValue, nullable} = intPipeOptions;

        this.defaultValue = defaultValue;
        this.maxValue = maxValue;
        this.minValue = minValue;
        this.nullable = nullable === undefined ? true : nullable;
    }

    transform(value: string, metadata: ArgumentMetadata): unknown {
        if (!value && this.defaultValue) {
            return this.defaultValue;
        }

        if (!value && this.nullable) {
            return value;
        }

        if (!value && !this.nullable) {
            this.logger.error(`request parameter is not match, { param: ${value}, error: ${this.message} }`);
            throw new ParameterException(this.message)
        }

        const isNumeric =
            ['string', 'number'].includes(typeof value) &&
            !isNaN(parseFloat(value)) &&
            isFinite(value as any);

        if (!isNumeric) {
            this.logger.error(`request parameter is invalid, { param: ${value}, error: ${this.message} }`);
            throw new ParameterException(this.message)
        }

        const result = parseInt(value, 10);

        if (this.maxValue && this.maxValue < result) {
            return this.maxValue;
        }

        if (this.minValue && this.minValue > result) {
            return this.minValue;
        }

        return parseInt(value, 10);
    }
}
