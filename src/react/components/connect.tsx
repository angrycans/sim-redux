import * as React from "react";
import shallowEqual from "../../utils/shallowEqual";
import { StoreContext } from "./context";
import bindActions from "../../utils/bindActions";

var UUID = 0;
/** 通用方法类型 */
type IFunc = (...args: any[]) => { [x: string]: (...args: any[]) => unknown };

/** Connect HOC props 定义 */
interface IProps {
  /** 需要注入到被包裹组件的 key 的集合 */
  mapToProps: string[];
  /** 需要注入到被包裹组件的 actions 的工厂函数 */
  actions: IFunc;
  /** 需要注入到被包裹组件的 computed 的工厂函数 */
  computed: IFunc;
}

class Connect extends React.PureComponent<IProps> {
  static contextType = StoreContext;
  UUID: number;
  context: React.ContextType<typeof StoreContext>;

  /** 取消订阅方法 */
  unsubscribe: (...args: any[]) => void;

  /** 注入当前组件的 actions 对象 */
  actions: object;
  computed: object;

  constructor(props, context) {
    super(props, context);

    //console.log("connect constructor");
    this.state = this.getProps();
    this.actions = this.getActions();
    this.UUID = UUID++;

    if (this.context.store.__DEV__) {
      console.group &&
        console.group(
          "%cSim-Redux @connect",
          "color:#2196F3",
          "@" + new Date().toISOString()
        );
      console.log("%cstate", "color:#4CAF50", this.state);
      console.log("%cactions", "color:#4CAF50", this.actions);
      console.log("%ccomputed", "color:#4CAF50", this.getComputed());
      console.groupEnd && console.groupEnd();
    }

    this.getComputed();
    this.unsubscribe = this.context.store.subscribe(this.update);
  }

  componentDidMount() {
    /** TODO:  好像还是有问题 */
    /** 开启缓存功能 */
    // this.props.storeCache && this.context.store.openCache()
  }

  componentWillUnmount() {
    this.unsubscribe(this.update);
  }

  getProps() {
    const { mapToProps } = this.props;
    const state = (this.context.store && this.context.store.getState()) || {};
    return mapToProps
      ? mapToProps.reduce(
          (result, key) => ((result[key] = state[key]), result),
          {}
        )
      : state;
  }

  getActions() {
    const { actions } = this.props;
    return bindActions(actions, this.context.store); // buildInActions
  }

  /**
   * 计算 computed
   */
  getComputed() {
    if (!this.props.computed) {
      return {};
    } else {
      const computedFac = this.props.computed(this.context.store);
      this.computed = Object.keys(computedFac).reduce((acc, key) => {
        return { ...acc, [key]: computedFac[key].call(computedFac) };
      }, {});

      return this.computed;
    }
  }

  /**
   * 响应订阅的回调，用于真正的触发组件的更新
   * @param { object } updateState 本次真正需要更新的属性对象
   */
  update = (updateState: object) => {
    const mapped = this.getProps();
    if (shallowEqual(mapped, updateState)) {
      this.getComputed();
      this.setState(mapped);
    }
  };

  render() {
    //console.log("this.props.children render", this.UUID);
    // @ts-ignore
    return this.props.children({
      store: this.context.store,
      ...this.props,
      ...this.computed,
      //...this.getComputed(),
      ...this.state,
      actions: { ...this.actions },
    });
  }
}

/** connect 装饰器可选参数 */
interface IOpts {
  /** 允许注入的参数名 */
  state: string[];
  /** 需要注入的 actions */
  actor?: IFunc;
  /** 随状态更新自动更新的数值 */
  computed?: IFunc;
}

/**
 *@connect 支持的参数模式
 * @connect(listActor)
 * @connect(null, listActor)
 * @connect(["edittext", "list"], listActor)
 * @connect(listActor, listComputed)
 * @connect(["edittext", "list"], listActor, listComputed)
 * @connect(null, listActor, listComputed)
 * @connect({ state: ["edittext", "list"], actor: listActor, computed: listComputed })
 */
function connect<S = {}>(actor: IFunc): any;

function connect<S = {}>(state: string[] | IFunc, actor: IFunc): any;

function connect<S = {}>(state: string[], actor: IFunc, computed: IFunc): any;

function connect<S = {}>(opts: IOpts): any;

/**
 * 注入属性、方法到组件 props
 * @param { IFunc | IOpts } opts 传入此参数时，注入给定属性到 props，不传入时，默认注入所有属性
 */
function connect(
  param: IFunc | IOpts | string[],
  _actor?: IFunc,
  _computed?: IFunc
): any {
  let state: string[] = null;
  let actions: IFunc = null;
  let computed: IFunc = null;

  if (param instanceof Array) {
    state = param.length == 0 ? null : param;
  } else if (typeof param === "function") {
    if (_actor && typeof _actor === "function") {
      computed = _actor;
    }
    _actor = param;
  } else if (param?.actor) {
    state =
      param.state && param.state instanceof Array
        ? param.state.length == 0
          ? null
          : param.state
        : param.state;
    _actor = param.actor;
    _computed = param.computed;
  }

  //console.log(typeof param);

  actions = _actor || actions;
  computed = _computed || computed;

  if (!actions) {
    throw new Error("Sim-Redux error : @connect params need actor");
  }

  // if (typeof param === "function") {
  //   actions = param;
  // } else {
  //   state =
  //     param.state && param.state instanceof Array
  //       ? param.state.length == 0
  //         ? null
  //         : param.state
  //       : param.state;
  //   actions = param.actor || actions;
  //   computed = param.computed || computed;
  // }
  return function (target) {
    return hocconnect(state, actions, computed)(target);
  };
}

const hocconnect = (mapToProps: string[], actions = null, computed = null) => {
  return (Child) => {
    return class extends React.PureComponent {
      constructor(props) {
        super(props);
      }
      render() {
        const { props } = this;
        return (
          <Connect
            {...props}
            mapToProps={mapToProps}
            actions={actions}
            computed={computed}
          >
            {(mappedProps: object) => <Child {...mappedProps} {...props} />}
          </Connect>
        );
      }
    };
  };
};

export default connect;
