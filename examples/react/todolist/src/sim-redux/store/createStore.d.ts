import { IStore } from "../interfaces";
import { History } from "history";
declare global {
    interface Window {
        wx: any;
    }
}
declare namespace createStore {
    /** 所有预加载的中间件 */
    var preMiddlewares: any[];
    /** 页面提供的 history 对象 */
    var history: History;
}
declare function createStore<S>(state: S, middleware?: Function[], __DEV__?: boolean): IStore<S>;
export default createStore;
