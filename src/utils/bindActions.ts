import set from "./set";
import { IStore } from "../interfaces";

export default function bindActions(
  actions: Function | object,
  store: IStore
): any {
  actions = typeof actions === "function" ? actions(store) : actions;
  actions = {
    ...actions,
    setStore(newState) {
      return newState;
    },
    resetStore() {
      return store.defaultState;
    },
  };
  let bound = {
    save() {
      return Promise.resolve(store.save());
    },
    restore() {
      return Promise.resolve(store.restore());
    },
  };
  for (let name in actions) {
    bound[name] = (...args: any[]) => {
      const action = actions[name].bind(actions);
      if (typeof store.middleware === "function") {
        return store.middleware()(store, action, args, name);
      }
      return set(store, action(...args), name);
    };
  }

  return bound;
}
