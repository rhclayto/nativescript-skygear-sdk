export declare class Auth {
    private auth;
    constructor(skygear: any);
    private response;
    private userHandler;
    signupWithUsername(username: string, password: string): Promise<{}>;
    signupWithEmail(email: string, password: string): Promise<{}>;
    loginWithUsername(username: string, password: string): Promise<{}>;
    loginWithEmail(email: string, password: string): Promise<{}>;
    logout(): Promise<{}>;
}
