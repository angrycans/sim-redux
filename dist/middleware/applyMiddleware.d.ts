export default function applyMiddleware(...middlewares: any[]): (store: Readonly<{
    middleware(): (...args: any[]) => void;
    setState(f: object | Function, actionname?: string): void;
    subscribe<F extends Function>(f: F): (f: F) => void;
    getState(): {};
    save(): {};
    restore(): {};
    openCache(): void;
    defaultState: {};
    __DEV__: boolean;
}>, action: Function, args: any[], name: string) => any;
