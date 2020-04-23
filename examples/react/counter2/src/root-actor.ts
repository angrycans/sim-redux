import { createStore, applyMiddleware, combineActors } from 'sim-redux';
import { countActor } from './components/count-actor';
import { IState } from './store';
import { produce } from 'immer';

async function _asyncincrement(store, delaysecond) {
  return new Promise<IState>((resolve) => {
    setTimeout(() => {
      console.log("old async2", store.getState())
      const newState = produce(store.getState(), (draft) => {
        draft.deepcount.a.b.c.count = draft.deepcount.a.b.c.count + 2;
        draft.count = draft.count + 2;
        draft.rootcount = draft.rootcount + 1;
      })
      console.log("_asyncincrement", newState)
      resolve(newState)
    }, delaysecond * 1000);
  })
}

const rootActor = (store) => ({
  /** 设置名称 */
  setname2: (value) => {
    return { name: value }
  },
  /** 增加 rootcount */
  incrementrootcount: () => {
    let newState = _asyncincrement(store, 2);
    return newState;
  },
  /** 减少 rootcount */
  decrementrootcount: () => {
    return { rootcount: store.getState().rootcount - 1, count: store.getState().count - 1 }
  }
});


export { rootActor };
