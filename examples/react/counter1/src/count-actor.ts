import { IState } from "./store";
import { IStore } from "sim-redux";
import { produce } from "immer";

// interface ICountActor {
//   increment: () => IState,
//   decrement: () => IState,
// }

export const CountActor = (store: IStore<IState>) => ({
  increment: () => {
    const newState = produce(store.getState(), (draft: IState) => {
      draft.deepcount.a.b.c.count = draft.deepcount.a.b.c.count + 1;
      draft.count = draft.count + 1;
    });
    return newState;
  },
  async asyncincrement() {
    return new Promise<IState>((resolve) => {
      setTimeout(() => {
        resolve(
          produce(store.getState(), (draft) => {
            draft.deepcount.a.b.c.count = draft.deepcount.a.b.c.count + 2;
            draft.count = draft.count + 2;
          })
        );
      }, 1000);
    });
  },
  decrement: () => {
    const newState = produce(store.getState(), (draft: any) => {
      draft.deepcount.a.b.c.count = draft.deepcount.a.b.c.count - 1;
      draft.count = draft.count - 1;
    });
    return newState;
  },
});

type IActors = typeof CountActor;

export { IActors };
