import { createStore, combineActors } from 'sim-redux';
import { countActor } from './components/count-actor';
import { rootActor } from './root-actor';

interface IState {
  /** 名称 */
  name: string;
  /** 计数 */
  count: number;
  /** 深层嵌套的计数 */
  deepcount: any;
  /** root节点上的计数 */
  rootcount: number;
}

const defalutStates = {
  name: "hello",
  count: 10,
  rootcount: 888,
  deepcount: { a: { b: { c: { count: 999 } } } }
};

const store = createStore(defalutStates);
const actors = combineActors(rootActor, countActor);
type IActors = typeof actors;

export {
  store,
  actors,
  IState,
  IActors
};
