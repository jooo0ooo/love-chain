import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {WinstonLogger} from "@src/logger/WinstonLogger";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/internal/operators";
import {CustomException} from "@src/exception/CustomException";
import {objectToStringWithDeleteKeys} from "@src/util/conversion";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {

    private readonly logger = new WinstonLogger().setContext('ErrorsInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError(err => {
                    if (err instanceof CustomException) return throwError(err);

                    if (typeof err === "object") {
                        Object.entries(err).length ?
                            this.logger.error(`error occur without custom definition, error: ${objectToStringWithDeleteKeys([])(err)}`) :
                            this.logger.error(err)
                    } else {
                        this.logger.error(err);
                    }

                    return throwError(new CustomException());
                }),
            );
    }
}
