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
    toUriString(except: string[]): string;
    
    /**
     * Return a string representation of 
     * the URI excluding any properties
     * passed in the `except` array.
     * 
     * @param  {string[]} except [description]
     * @return {string}          [description]
     * @deprecated Use `toUriString(...)` for IE8 support.
     */
    toString(except: string[]): string;
}
