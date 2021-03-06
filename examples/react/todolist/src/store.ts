import { createStore } from "./sim-redux";

const logger = (store) => (next) => (action) => {
  console.log("current state", store.getState());
  return next(action);
};

export interface ITodo {
  id: number;
  text: string;
  done: boolean;
}

export interface IState {
  edittext: string;
  list: ITodo[];
  title: string;
}

const defalutStates: IState = {
  edittext: "",
  list: [],
  title: "hello",
};

const store = createStore(defalutStates, [logger]);

export { store, defalutStates };
