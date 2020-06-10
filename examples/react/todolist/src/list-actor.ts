import { IStore } from "./sim-redux";
import { IState } from "./store";
import { produce } from "immer";

const listActor = (store: IStore<IState>) => ({
  addtile: () => {
    const newState = produce(store.getState(), (draft) => {
      draft.title = draft.title + "1";
    });

    // return newState;
    return { title: store.getState().title + "1" };
  },
  /** 初始化一条todo */
  init: async () => {
    console.log("actor init");
    return new Promise((r) => {
      setTimeout(() => {
        const newState = produce(store.getState(), (draft) => {
          draft.list.push({
            id: new Date().getTime(),
            text: "Happy use todolist",
            done: false,
          });
        });

        r(newState);
      }, 0);
    });
  },
  /** 增加一条todo */
  add: (text: string) => {
    const newState = produce(store.getState(), (draft) => {
      draft.list.push({ id: new Date().getTime(), text, done: false });
      draft.edittext = "";
    });

    return newState;
  },
  /** 完成一条 todo */
  done: (id: number) => {
    const newState = produce(store.getState(), (draft) => {
      let item = draft.list.find((v) => v.id === id);
      //console.log("item", item);
      item.done = !item.done;
    });

    return newState;
  },
  /** 删除一条 todo */
  del: (id: number) => {
    const newState = produce(store.getState(), (draft) => {
      let idx = draft.list.findIndex((v) => v.id === id);
      draft.list.splice(idx, 1);
    });
    return newState;
  },
  edit: (text: string) => {
    const newState = produce(store.getState(), (draft) => {
      draft.edittext = text;
    });

    return newState;
  },
  clear: () => {
    const newState = produce(store.getState(), (draft) => {
      draft.list = [];
    });
    return newState;
  },
});

const listComputed = (store: IStore<IState>) => ({
  /** 自动计算的 count */
  computedCount() {
    return store.getState().list.length;
  },
});
export { listActor, listComputed };

export type IlistActor = typeof listActor;

export type IlistComputed = typeof listComputed;
