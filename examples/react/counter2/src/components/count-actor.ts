import { IState } from "./../store";
import { IStore } from "sim-redux";
import { produce } from "immer";

const countActor = (store: IStore<IState>) => ({
  /**
   * 设置 name
   * @param { string } value 更新的 name
   */
  setname(value: string) {
    return { name2: value };
  },
  /**
   * 增加 count
   * @param { string } value 更新的 name
   */
  async increment() {
    return { count: store.getState().count + 1 };
  },
  /**
   * 减少 深层属性减中的 count
   */
  decrement() {
    const newState = produce(store.getState(), (draft: any) => {
      draft.deepcount.a.b.c.count = draft.deepcount.a.b.c.count - 1;
      draft.count = draft.count - 1;
    });
    return newState;
  },
  /**
   * 异步操作
   */
  asyncincrement(delaysecond: number) {
    return new Promise<IState>(resolve => {
      setTimeout(() => {
        resolve(
          produce(store.getState(), draft => {
            draft.deepcount.a.b.c.count = draft.deepcount.a.b.c.count + 2;
            draft.count = draft.count + 2;
          })
        );
      }, delaysecond * 1000);
    });
  }
});

const computed = (store: IStore<IState>) => ({
  /** 自动计算的名称 */
  computedName() {
    return `computed: ${store.getState().name}`;
  },
  /** 自动计算的 count */
  computedCount() {
    return store.getState().count + 100;
  }
});

type ICountActor = typeof countActor;
type IComputed = typeof computed;

export { countActor, computed, ICountActor, IComputed };
