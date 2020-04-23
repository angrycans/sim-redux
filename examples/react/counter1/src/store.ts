import { createStore } from "sim-redux";
import { applyMiddleware } from "sim-redux";

const logger = (store) => (next) => (action) => {
  console.log("current state", store.getState());
  return next(action);
};
interface IState {
  count: number;
  deepcount: any;
}

const defalutStates: IState = {
  count: 0,
  deepcount: { a: { b: { c: { count: 999 } } } },
};

const middlewares = applyMiddleware(logger);

const store = createStore(defalutStates);
export { store, IState };
