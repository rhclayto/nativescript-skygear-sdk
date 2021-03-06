export declare class PubSub {
    private channel;
    constructor(skygear: any);
    private response();
    private handler(worker);
    subscribe(channelName: string): Promise<Worker | {
        error: any;
    }>;
    publish(channelName: string, payload: any): Promise<any>;
}
