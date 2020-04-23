import * as React from 'react';
import './App.css';
import { connect, withRedux } from "sim-redux/react";
import { IProps } from "sim-redux";
import { store } from "./store";
import { IActors, actors, IState } from "./store";
import logo from './logo.svg';
import Count from './components/count'
import Count2 from './components/count2'

@withRedux(store)
@connect(actors)
class App extends React.Component<IProps<IState, IActors>>{
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="App-intro">
          <Count />
          <Count2 />
          <p className="App-intro">
            rootcount:{this.props.rootcount}
          </p>
          <button onClick={() => {
            // this.props.actions.decreme
            this.props.actions.incrementrootcount()
          }}>rootcount+</button>
          <button onClick={() => {
            // this.props.actions.decreme
            this.props.actions.decrementrootcount()
          }}>rootcount-</button>
          <br />
          <button
            onClick={() => {
              this.props.actions.resetStore()
            }}
          >重置store</button>
          <button
            onClick={() => {
              this.props.actions.setStore({
                count: 100
              })
            }}
          >设置 count 为 100</button>
          <button
            onClick={() => {
              this.props.actions.save();
            }}
          >保存当前store</button>
          <button
            onClick={() => {
              this.props.actions.restore();
            }}
          >弹出栈顶状态，并恢复</button>
        </div>
      </div>
    );
  }
}

export default App;
