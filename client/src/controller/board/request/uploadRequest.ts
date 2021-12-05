import { PaymentType } from "@src/model/type/BoardType";

export class uploadRequest {
    textType!: string;
    paymentType!: PaymentType;
    isPrivate!: string;
    boardText!: string;

    memberId!: string;
    nickname!: string;
}