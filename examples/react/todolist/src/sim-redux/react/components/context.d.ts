import React from 'react';
declare const StoreContext: React.Context<{
    store: Readonly<{
        middleware(): (...args: any[]) => void;
        setState(f: object | Function, actionname?: string): void;
        subscribe<F extends Function>(f: F): (f: F) => void;
        getState(): any;
        defaultState: any;
        __DEV__: boolean;
    }>;
}>;
declare const Provider: React.Provider<{
    store: Readonly<{
        middleware(): (...args: any[]) => void;
        setState(f: object | Function, actionname?: string): void;
        subscribe<F extends Function>(f: F): (f: F) => void;
        getState(): any;
        defaultState: any;
        __DEV__: boolean;
    }>;
}>, Consumer: React.Consumer<{
    store: Readonly<{
        middleware(): (...args: any[]) => void;
        setState(f: object | Function, actionname?: string): void;
        subscribe<F extends Function>(f: F): (f: F) => void;
        getState(): any;
        defaultState: any;
        __DEV__: boolean;
    }>;
}>;
export { Provider, Consumer, StoreContext };
