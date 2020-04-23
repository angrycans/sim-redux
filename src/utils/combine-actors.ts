import { ConvertUnion2Intersection } from "../interfaces";

type IActor = (...args: any[]) => { [x: string]: (...args: any[]) => any };
type CombineReturn<T extends IActor> = T extends any ? ReturnType<T> : never;

function combineActors<A extends IActor[]>(
  ...actors: A
): (store: any) => ConvertUnion2Intersection<CombineReturn<A[any]>> {
  // @ts-ignore
  return (store) => {
    return actors.reduce(
      (acc, action) => ({
        ...acc,
        ...action(store),
      }),
      {}
    );
  };
}

export default combineActors;
