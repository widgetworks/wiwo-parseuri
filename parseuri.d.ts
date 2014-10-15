declare class URI {
    static parse(url:string): IUriDescriptor;
    static options: {
        strict: boolean;
    };
}

/**
 * Result from URI.parse
 *
 * https://github.com/widgetworks/parseuri
 */
interface IUriDescriptor {
    anchor: string;
    query: string;
    file: string;
    directory: string;
    path: string;
    relative: string;
    port: string;
    host: string;
    password: string;
    user: string;
    userInfo: string;
    authority: string;
    protocol: string;
    source: string;
    queryKey: any; //map of strings, keys are query string keys

    toAbsolute(pattern: IUriDescriptor): string;
    isAbsolute(): boolean;
    isRelative(): boolean;
    toString(except: string[]): string;
}
