import * as React from 'react';
import { actors, IActors, IState } from "../store";
import { connect } from "sim-redux/react";
import { IComputed, computed } from './count-actor'
import { rootActor } from '../root-actor'
import { IProps } from "sim-redux";

@connect({
  state: ['deepcount', 'count'],
  actor: actors,
  computed
})
export default class Count extends React.Component<IProps<IState, IActors, IComputed>>{
  public render() {
    console.log("render count this.props", this.props);
    return (
      <div style={{ backgroundColor: 'hotpink' }}>
        <h1>name:{this.props.name} count:{this.props.count}</h1>
        <h1>deepcount:{this.props.deepcount.a.b.c.count}</h1>
        <h1>computedCount: {this.props.computedCount}</h1>
        <button onClick={() => {
          this.props.actions.increment();
        }}>+</button>
        <button onClick={() => {
          this.props.actions.decrement();
        }}>-</button>
        <button onClick={() => {
          this.props.actions.asyncincrement(2);
        }}>2s +2</button>
        <button onClick={() => {
          this.props.actions.setname('hello world');
        }}>name</button>
        <button onClick={() => {
          this.props.actions.setname2('test bindactor');
        }}>name2</button>
      </div>
    );
  }
}


