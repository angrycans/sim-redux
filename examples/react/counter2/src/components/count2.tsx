import * as React from 'react';
import { countActor, ICountActor } from './count-actor';
import { connect } from "sim-redux/react";
import { IProps } from "sim-redux";
import { IState } from "../store";

@connect(countActor)
export default class Count2 extends React.PureComponent<IProps<IState, ICountActor>>{
  render() {
    return (
      <div style={{ backgroundColor: 'lightblue' }}>
        <h1>name: {this.props.name}</h1>
        <button onClick={() => { this.props.actions.increment() }}>+</button>
      </div>
    );
  }
}
