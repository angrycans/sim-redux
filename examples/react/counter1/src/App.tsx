import * as React from "react";

import { withRedux, connect } from "sim-redux/dist/react";

import { IProps } from "sim-redux";
import { store, IState } from "./store";
import { CountActor, IActors } from "./count-actor";

// interface Iprops extends IState {
//   actions?: {
//     increment?: () => Promise<any>;
//     decrement?: () => void;
//   };
// }

@withRedux(store)
@connect({ state: ["count", "deepcount"], actor: CountActor })
class App extends React.Component<IProps<IState, IActors>> {
  public render() {
    //console.log("this.props", this.props);
    return (
      <div>
        <h1>count:{this.props.count}</h1>
        <h1>deepcount:{this.props.deepcount.a.b.c.count}</h1>
        <button
          onClick={() => {
            console.log(
              "+",
              this.props.actions.asyncincrement().then((store) => {
                console.log("store", store);
              })
            );
          }}
        >
          +
        </button>

        <button
          onClick={() => {
            this.props.actions.decrement();
          }}
        >
          -
        </button>
      </div>
    );
  }
}

export default App;
