import { useState, useEffect } from "react";
import bindActions from "../utils/bindActions";
import shallowEqual from "../utils/shallowEqual";

type StateSelector<S, C extends (...args: any) => any = () => {}> = (
  state: S
) => S & Partial<ReturnType<C>>;

function createHookStore<
  S,
  A extends (...args: any) => any = () => {},
  C extends (...args: any) => any = () => {}
>(storeState: S, actor: A, computed?: C, __DEV__?: boolean) {
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
    if (!computed) {
      return {};
    } else {
      const computedFac = computed(_store);
      _computed = Object.keys(computedFac).reduce((acc, key) => {
        return { ...acc, [key]: computedFac[key].call(computedFac) };
      }, {});

      return _computed;
    }
  }

  function useStore(selector: StateSelector<S, C>) {
    const [state, setState] = useState(() => {
      return selector({ ...storeState, ..._computed });
    });

    function update(updateState: object) {
      const mapped = storeState as any;
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

  async function dispatch(actionname: keyof ReturnType<A>, payload?: any) {
    let result: any;

    result = await actions[actionname](payload);

    return result;
  }

  return { useStore, dispatch };
}

export default createHookStore;
