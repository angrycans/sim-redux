import React from "react";
import { Provider } from "./context";
import { IStore } from "../../interfaces";

interface IState {
  /** 用于组件更新的 context 上下文 */
  store: IStore;
}

const withRedux = (store) => {
  return function HOCFactory(Comp): any {
    return class extends React.PureComponent<{}, IState, IState> {
      constructor(props) {
        super(props);
        this.state = { store };
      }

      render() {
        //console.log("withredux", this);
        return (
          <Provider value={this.state}>
            <Comp {...this.props} />
          </Provider>
        );
      }
    };
  };
};

export default withRedux;
