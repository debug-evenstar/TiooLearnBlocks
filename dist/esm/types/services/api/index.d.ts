export declare class Api {
    static get(url: string): Promise<any>;
    static post(url: string, data: any): Promise<any>;
    static put(url: string, data: any): Promise<any>;
}
