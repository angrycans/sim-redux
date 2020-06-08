import createStore from "./store/createStore";
import { applyMiddleware } from "./middleware";
import combineActors from "./utils/combine-actors";
import { IProps, IStore } from "./interfaces";
import { withRedux, connect } from "./react/index";

//@ts-ignore
export {
  createStore,
  applyMiddleware,
  combineActors,
  // @ts-ignore

  IProps,
  // @ts-ignore

  IStore,
  withRedux,
  connect,
};
