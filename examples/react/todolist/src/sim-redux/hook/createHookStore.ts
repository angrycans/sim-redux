import { useState, useEffect } from "react";
import { IFunc } from "../react/components/connect";
import bindActions from "../utils/bindActions";
import shallowEqual from "../utils/shallowEqual";
import getActionName from "../utils/getActionName";

type StateSelector<S, P> = (state: S) => P;

function createHookStore<S>(
  storeState: S,
  actor: IFunc,
  computed?: IFunc,
  __DEV__?: boolean
) {
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
  let actions: object = bindActions(actor as any, _store); // buildInActions

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

      console.log("getComputed", _computed);
      return _computed;
    }
  }

  function useStore<P>(selector: StateSelector<S, P>) {
    //const _state = state;
    const [state, setState] = useState(() => {
      return selector({ ...storeState, ..._computed });
    });

    function update(updateState: object) {
      const mapped = storeState as any;
      console.log("update", shallowEqual(mapped, updateState), mapped);
      if (shallowEqual(mapped, updateState)) {
        getComputed();
        setState(selector(mapped));
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

  async function dispatch(action: any, payload?: any) {
    let result: any;

    const actionName = getActionName(action);
    console.log("dispatch", action, actionName, payload);

    result = await actions[actionName](payload);

    return result;
  }

  return { setState, getState, useStore, dispatch };
}

export { createHookStore };
