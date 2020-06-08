import React from "react";
import "./App.css";

import { connect, withRedux, IProps } from "./sim-redux";

import { IState, store } from "./store";
import {
  IlistActor,
  listActor,
  IlistComputed,
  listComputed,
} from "./list-actor";

@withRedux(store)
//@connect(listActor)
//@connect(null, listActor)
//@connect(["edittext", "list"], listActor)
@connect(listActor, listComputed)
//@connect([], listActor, listComputed)
//@connect(null, listActor, listComputed)
//@connect({ state: null, actor: listActor, computed: listComputed })
class App extends React.Component<IProps<IState, IlistActor, IlistComputed>> {
  constructor(props) {
    super(props);
    this.props.actions.init();
  }
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
          <button className="clear-completed">Clear completed</button>
        </footer>
      </div>
    );
  }
}
export default App;
