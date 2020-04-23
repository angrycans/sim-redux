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
createStore.history = null;
function createStore<S>(
  state: S,
  middleware: Function[] = [],
  __DEV__: boolean = true
): IStore<S> {
  /** 订阅列表 */
  const listeners: Function[] = [];
  /** 默认状态 */
  const defaultState: S = JSON.parse(JSON.stringify(state));
  /** 缓存栈 */
  const cacheStack: S[] = [];
  /** 记录是否已经被缓存 */
  let cached = false;

  const ACTIONS = {
    PUSH: "PUSH",
    POP: "POP",
    REPLACE: "REPLACE",
  };

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
    save() {
      cacheStack.push(JSON.parse(JSON.stringify(state)));
      return state;
    },
    restore() {
      const restoredState = cacheStack.pop() || defaultState;
      applyMiddleware(...createStore.preMiddlewares, ...middleware)(
        this,
        (newState) => newState,
        [restoredState],
        "restore"
      );
      return state;
    },
    openCache() {
      console.log("--- openCache --->", createStore.history);
      if (!window.wx && !cached && createStore.history) {
        cached = true;
        /** store 所属的 path */
        const storePath = createStore.history.location.pathname;
        /** 上一次的 path */
        let prevPath: string = storePath;
        (createStore.history as History).listen(({ pathname }, action) => {
          console.log("prevPath ==>", prevPath);
          console.log("storePath ==>", storePath);
          switch (action) {
            case ACTIONS.PUSH:
              /** 上一次的页面是 store 所在页面 */
              if (storePath === prevPath) {
                console.log("--- save --->");
                this.save();
              }
              break;
            case ACTIONS.POP:
              /** 当前页面是 store 所在页面 */
              if (pathname === storePath) {
                console.log("--- restore --->");
                this.restore();
              }
              break;
            case ACTIONS.REPLACE:
              break;
            default:
              break;
          }
          prevPath = pathname;
        });
      }
    },
  };
}

export default createStore;
