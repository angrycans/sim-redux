import { IStore } from "../interfaces";
import set from "../utils/set";

const finalMiddleware = (store: IStore, args: any[], name: string) => (
  action: Function
) => set(store, action(...args), name);

export default function applyMiddleware(...middlewares: any[]) {
  middlewares.reverse();
  return (store: IStore, action: Function, args: any[], name: string) => {
    if (middlewares.length < 1) {
      return set(store, action(...args), name);
    }
    const chain = middlewares
      .map((middleware) => middleware(store))
      .reduce(
        (next, middleware) => middleware(next, args),
        finalMiddleware(store, args, name)
      );
    return chain(action);
  };
}
