import createStore from "./store/createStore";
import { applyMiddleware } from "./middleware";
import combineActors from "./utils/combine-actors";
import { IProps, IStore } from "./interfaces";
import { withRedux, connect } from "./react/index";
import createHookStore from "./hook/createHookStore";

//@ts-ignore
export {
  createStore,
  createHookStore,
  applyMiddleware,
  combineActors,
  // @ts-ignore
  IProps,
  // @ts-ignore
  IStore,
  withRedux,
  connect,
};
