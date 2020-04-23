/** 通用方法类型 */
declare type IFunc = (...args: any[]) => {
    [x: string]: (...args: any[]) => unknown;
};
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
declare function connect<S = {}>(actor: IFunc): any;
declare function connect<S = {}>(state: string[] | IFunc, actor: IFunc): any;
declare function connect<S = {}>(state: string[], actor: IFunc, computed: IFunc): any;
declare function connect<S = {}>(opts: IOpts): any;
export default connect;
