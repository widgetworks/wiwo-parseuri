export declare type IUriDescriptor = IUriProps & IUriMethods;
export interface IUriProps {
    "anchor": string;
    "query": string;
    "file": string;
    "directory": string;
    "path": string;
    "relative": string;
    "port": string;
    "host": string;
    "password": string;
    "user": string;
    "userInfo": string;
    "authority": string;
    "protocol": string;
    "source": string;
    "queryKey": Record<string, string>;
}
export declare type IExceptProps = keyof IUriProps;
export interface IUriMethods {
    toAbsolute(pattern: IUriDescriptor): string | undefined;
    normalizeProtocol(uri: IUriDescriptor): this;
    isAbsolute(): boolean;
    isRelative(): boolean;
    origin(): string;
    toString(except?: IExceptProps[]): string;
    toUriString(except?: IExceptProps[]): string;
}
export declare var URI: {
    options: {
        strictMode: boolean;
        key: string[];
        q: {
            name: string;
            parser: RegExp;
        };
        parser: {
            strict: RegExp;
            loose: RegExp;
        };
    };
    parse: (str: string, strictMode?: boolean) => IUriDescriptor;
};
export default URI;
