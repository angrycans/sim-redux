import React from "react";
import "./App.css";
import { defalutStates } from "./store";
import { createHookStore } from "./sim-redux";
import { useEffect } from "react";

import { listActor, listComputed } from "./list-actor";
// eslint-disable-next-line
const { useStore, dispatch } = createHookStore(
  defalutStates,
  listActor,
  listComputed
);

const TitleText = () => {
  const { title } = useStore(["title"]);
  console.log("title", title);

  return <div onClick={() => dispatch("addtile")}>{title}</div>;
};

const AppHooK = () => {
  useEffect(() => {
    dispatch("init");
  }, []);
  const { list, edittext, computedCount } = useStore([
    "list",
    "edittext",
    "computedCount",
  ]);

  // const { list, edittext, computedCount } = useStore();
  console.log("AppHooK store");
  return (
    <div className="wrapper">
      <header className="top">
        <h1>
          Todo List
          <TitleText />
        </h1>

        <input
          value={edittext}
          className="new-todo"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              dispatch("add", edittext);
              //this.props.actions.add(this.props.edittext);
            }
          }}
          onChange={(e) => {
            dispatch("edit", e.target.value);
            //this.props.actions.edit(e.target.value);
          }}
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
      <section className="center">
        <section className="">
          <ul className="todo-list">
            {list &&
              list.map((v, k) => (
                <li key={v.id}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={v["done"]}
                      onChange={() => {
                        //this.props.actions.done(v.id);
                        dispatch("done", v.id);
                      }}
                    />
                    <label
                      style={{ textDecoration: v.done && "line-through " }}
                    >
                      {v["text"]}
                    </label>
                    <button
                      className="destroy"
                      onClick={async () => {
                        //this.props.actions.del(v.id);
                        let ret = await dispatch("del", v.id);
                        console.log(ret);
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </section>
      <footer className="bottom">
        <span className="todo-count">{computedCount}</span>
        <button className="clear-completed" onClick={() => dispatch("clear")}>
          Clear completed
        </button>
      </footer>
    </div>
  );
};

export default AppHooK;
