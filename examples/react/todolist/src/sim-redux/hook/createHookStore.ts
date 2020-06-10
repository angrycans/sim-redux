import { useState, useEffect } from "react";
import bindActions from "../utils/bindActions";
import shallowEqual from "../utils/shallowEqual";

// type StateSelector<S, C extends (...args: any) => any = () => {}> = (
//   state: S
// ) => (S & Partial<ReturnType<C>>) | any;

function createHookStore<
  S,
  A extends (...args: any) => any = () => {},
  C extends (...args: any) => any = () => {}
>(storeState: S, actor: A, computed?: C, __DEV__?: boolean) {
  /** 订阅列表 */
  const listeners: Function[] = [];

  let unsubscribe: (...args: any[]) => void;

  let _computed: object;

  if (__DEV__ == null) {
    __DEV__ = true;
  }

  const _store = {
    defaultState: { ...storeState, ..._computed },
    getState,
    setState,
    __DEV__,
  };
  let actions: ReturnType<A> = bindActions(actor as any, _store); // buildInActions

  if (__DEV__) {
    console.group &&
      console.group(
        "%cSim-Redux @store",
        "color:#2196F3",
        "@" + new Date().toISOString()
      );
    console.log("%cstate", "color:#4CAF50", storeState);
    console.log("%cactions", "color:#4CAF50", actions);
    console.log("%ccomputed", "color:#4CAF50", getComputed());
    console.groupEnd && console.groupEnd();
  }
  /**
   * 计算 computed
   */
  function getComputed() {
    //console.log("computed", computed);
    if (!computed) {
      return {};
    } else {
      const computedFac = computed(_store);
      _computed = Object.keys(computedFac).reduce((acc, key) => {
        return { ...acc, [key]: computedFac[key].call(computedFac) };
      }, {});

      //console.log("getComputed", _computed);
      return _computed;
    }
  }

  function useStore(selector?: string[]): Partial<S> & Partial<ReturnType<C>> {
    //const _state = state;

    const store = { ...storeState, ..._computed };
    let mapped = selector
      ? selector.reduce(
          // eslint-disable-next-line
          (result, key) => ((result[key] = store[key]), result),
          {}
        )
      : store;

    console.log("maped", mapped);

    if (!selector) selector = Object.keys(store);

    const [state, setState] = useState(mapped);

    function update(updateState: object) {
      // const mapped = storeState as any;
      console.log(
        "%cSim-Redux  start",
        "color:#2196F3",
        mapped,
        updateState,
        storeState
      );
      if (shallowEqual(mapped, updateState)) {
        // console.log(
        //   "%cSim-Redux udate22",
        //   "color:#2196F3",
        //   mapped,
        //   updateState
        // );

        // let newstate = produce(mapped, (draft) => {
        //   Object.keys(draft).forEach((k) => {
        //     //console.log("k", k, updateState[k]);
        //     draft[k] = updateState[k] ? updateState[k] : storeState[k];
        //   });
        // });
        // //  for (let i = 0; i < Object.keys(updateState).length; i++) {}

        let newstate = {};
        selector.forEach((k) => {
          //console.log("k", k, updateState[k]);
          newstate[k] = updateState[k] ? updateState[k] : storeState[k];
        });

        console.log("%cSim-Redux update state", "color:#2196F3", state);
        console.log(
          "%cSim-Redux update updatestate",
          "color:#2196F3",
          updateState
        );
        console.log("%cSim-Redux new state", "color:#2196F3", newstate);

        getComputed();
        setState(newstate);
      }
    }

    useEffect(() => {
      //mount
      unsubscribe = subscribe(update);

      return () => {
        //unmount

        unsubscribe(update);
        console.log("unmount useStore");
      };
      // eslint-disable-next-line
    }, []);

    return { ...state, ..._computed };
  }

  function setState(update: Function | object) {
    const updateValue =
      typeof update === "function" ? update(storeState) : update;
    storeState = {
      ...storeState,
      ...updateValue,
    };
    listeners.forEach((f) => f(updateValue));
  }

  function subscribe(f: Function) {
    listeners.push(f);
    return () => {
      listeners.splice(listeners.indexOf(f), 1);
    };
  }

  function getState(): S {
    return { ...storeState, ..._computed };
  }

  // function getState<P>(selector: StateSelector<S, C>) {
  //   return selector(storeState);
  // }

  async function dispatch(actionname: keyof ReturnType<A>, payload?: any) {
    let result: any;

    //const actionName = getActionName(action);
    // console.log("dispatch", action, actionName, payload);

    result = await actions[actionname](payload);

    return result;
  }

  return { useStore, dispatch };
}

export default createHookStore;
