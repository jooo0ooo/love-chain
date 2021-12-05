import { CustomException } from "@src/exception/CustomException";
import { ERROR_CODE } from "@src/exception/ErrorCode";
import { AssetName } from "@src/model/type/AssetType";

export enum WalletHistoryType {
    ALL = 'ALL',
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL'
}

export enum WalletEventType {
    ALL = 'ALL',
    
    REGISTER = "REGISTER",
    BOARD = "BOARD",
    EXTERNAL = "EXTERNAL",
    INTERNAL = "INTERNAL",
}

export enum WalletEventStatus {
    ALL = 'ALL',

    PENDING = 'PENDING',
    DONE = 'DONE',
    CANCELLED = 'CANCELLED',
    FAILURE = 'FAILURE',
}

export enum WalletAsset {
    LOVE = 'LOVE',
}

export const walletAssetToAsset = (walletAsset: WalletAsset): AssetName => {
    switch (walletAsset) {
    case WalletAsset.LOVE:
        return AssetName.LOVE;
    default:
        const errorCode = ERROR_CODE.INTERNAL_SERVER_ERROR;
        throw new CustomException({
            httpStatus: errorCode.httpStatus, 
            code: errorCode.code, 
            message: 'failed to convert WalletAsset to AssetName' + walletAsset
        });
    }
};