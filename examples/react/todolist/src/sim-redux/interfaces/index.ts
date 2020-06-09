/** store 类型定义 */
export type IStore<S = {}> = Readonly<{
  middleware(): (...args: any[]) => void;
  setState(f: Function | object, actionname?: string): void;
  subscribe<F extends Function>(f: F): (f: F) => void;
  getState(): S;
  defaultState: S;
  __DEV__: boolean;
}>;

/** 默认内置的 actions */
interface IDefaultActions<S> {
  /** 设置 Store */
  setStore?(newState: Partial<S>): Promise<S>;
  /** 重置为默认的 Store */
  resetStore?(): Promise<S>;
  /** 把当前状态推入缓存栈 */
  save?(): Promise<S>;
  /** 弹出栈顶状态，并恢复 */
  restore?(): Promise<S>;
}

export type IProps<
  S = {},
  A extends (...args: any) => any = () => {},
  C extends (...args: any) => any = () => {}
> = Partial<S> & {
  actions?: Partial<ReturnType<A>> & IDefaultActions<S>;
} & Partial<ReturnType<C>>;

// #################################### utils ####################################

type ExtractMapWithFuncReturn<T extends any> = T extends any
  ? { [K in keyof T]?: ReturnType<T[K]> }
  : never;
export type ConvertUnion2Intersection<T> = (T extends any
? (param: T) => any
: never) extends (param: infer I) => any
  ? I
  : never;

// #################################### TODO: ####################################

/** react-router-dom 支持的 action 的类型 */
// type IAction = 'POP' | 'PUSH' | 'REPLACE'

/** react-router-dom 向下传递的 location 对象 */
// interface ILocation {
//   hash: string
//   pathname: string
//   search: string
//   state: any
// }

/** react-router-dom 向下传递的 history 对象 */
// interface IHistory {
//   action: IAction
//   location: ILocation
//   length: number
//   block: (...args: any[]) => any
//   createHref: (location: ILocation) => void
//   go: (n: number) => any
//   goBack: () => void
//   goForward: () => void
//   listen: (listener: (location: ILocation, action: IAction) => void) => void
// }
