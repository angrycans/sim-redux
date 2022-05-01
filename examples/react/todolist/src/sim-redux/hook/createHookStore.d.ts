declare function createHookStore<S, A extends (...args: any) => any = () => {}, C extends (...args: any) => any = () => {}>(storeState: S, actor: A, computed?: C, __DEV__?: boolean): {
    useStore: (selector?: string[]) => Partial<S> & Partial<ReturnType<C>>;
    dispatch: (actionname: keyof ReturnType<A>, payload?: any) => Promise<any>;
};
export default createHookStore;
