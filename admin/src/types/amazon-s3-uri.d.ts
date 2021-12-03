declare module 'amazon-s3-uri' {
    function AmazonS3URI(uri: string): {region: string, bucket: string, key: string}
    function AmazonS3URI(uri: string, parseQueryString: boolean): {region: string, bucket: string, key: string}
    namespace AmazonS3URI {}
    export = AmazonS3URI;
}
