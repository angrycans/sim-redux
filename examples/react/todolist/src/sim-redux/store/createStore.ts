import { IStore } from "../interfaces";
import { applyMiddleware } from "../middleware";
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

createStore.preMiddlewares = [];
// eslint-disable-next-line
function createStore<S>(
  state: S,
  middleware: Function[] = [],
  __DEV__: boolean = true
): IStore<S> {
  /** 订阅列表 */
  const listeners: Function[] = [];
  /** 默认状态 */
  const defaultState: S = JSON.parse(JSON.stringify(state));

  if (!middleware) {
    throw new Error("Sim-Redux error: middleware is []");
  }

  return {
    __DEV__,
    defaultState,
    middleware: () =>
      applyMiddleware(...createStore.preMiddlewares, ...middleware),
    setState(update: Function | object) {
      const updateValue = typeof update === "function" ? update(state) : update;
      state = {
        ...state,
        ...updateValue,
      };
      listeners.forEach((f) => f(updateValue));
    },
    subscribe(f: Function) {
      listeners.push(f);
      return () => {
        listeners.splice(listeners.indexOf(f), 1);
      };
    },
    getState(): S {
      return state;
    },
  };
}

export default createStore;
