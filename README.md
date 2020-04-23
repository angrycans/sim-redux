### update

v1.0.0 add computed and update readme
add example/react/todolist
update example/counter1 example/counter2

# sim-redux

```typescript
1.store.ts
import { createStore } from "sim-redux";

export interface ITodo {
  id: number;
  text: string;
  done: boolean;
}

export interface IState {
  edittext: string;
  list: ITodo[];
}

const defalutStates: IState = {
  edittext: "",
  list: [],
};

const store = createStore(defalutStates);


export { store };

2.list-actor.ts
import { IStore } from "sim-redux";
import { IState } from "./store";
import { produce } from "immer";

const listActor = (store: IStore<IState>) => ({
  /** 初始化一条todo */
  init: async () => {
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
  ... ...
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


3.app.tsx
import { connect, withRedux ,IProps} from "sim-redux";

import { IState, store } from "./store";
import {
  IlistActor,
  listActor,
  IlistComputed,
  listComputed,
} from "./list-actor";


@withRedux(store)
@connect(listActor, listComputed)
class App extends React.Component<IProps<IState, IlistActor, IlistComputed>> {
... ...
render() {
    return (
      <div className="wrapper">
        <header className="top">
          <h1>Todo List</h1>
          <input
            value={this.props.edittext}
            className="new-todo"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.props.actions.add(this.props.edittext);
              }
            }}
            onChange={(e) => {
              this.props.actions.edit(e.target.value);
            }}
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>
        <section className="center">
          <section className="">
            <ul className="todo-list">
              {this.props.list.map((v, k) => (
                <li key={v.id}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={v["done"]}
                      onChange={() => {
                        this.props.actions.done(v.id);
                      }}
                    />
                    <label
                      style={{ textDecoration: v.done && "line-through " }}
                    >
                      {v["text"]}
                    </label>
                    <button
                      className="destroy"
                      onClick={() => {
                        this.props.actions.del(v.id);
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </section>
        <footer className="bottom">
          <span className="todo-count">{this.props?.computedCount}</span>
          <button
            className="clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </div>
    );
  }
}
export default App;
```
