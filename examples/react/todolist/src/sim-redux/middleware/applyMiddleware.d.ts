import { IStore } from "../interfaces";
export default function applyMiddleware(...middlewares: any[]): (store: IStore, action: Function, args: any[], name: string) => any;
