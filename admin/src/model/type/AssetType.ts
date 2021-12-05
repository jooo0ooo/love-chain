export enum AssetName {
    LOVE = 'LOVE'
}

export enum AssetSymbol {
    LOVE = 'LV'
}

export const assetNameToSymbol = (asset: AssetName): AssetSymbol => {
    switch (asset) {
    case AssetName.LOVE:
        return AssetSymbol.LOVE;
    default:
        return asset;
    }
};