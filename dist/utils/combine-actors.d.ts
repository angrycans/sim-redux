import { ConvertUnion2Intersection } from "../interfaces";
declare type IActor = (...args: any[]) => {
    [x: string]: (...args: any[]) => any;
};
declare type CombineReturn<T extends IActor> = T extends any ? ReturnType<T> : never;
declare function combineActors<A extends IActor[]>(...actors: A): (store: any) => ConvertUnion2Intersection<CombineReturn<A[any]>>;
export default combineActors;
