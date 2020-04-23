import { IStore } from '../interfaces'

const prinf = (prev, actionname) => next => {
  console.group &&
    console.group(
      '%caction',
      'color:#2196F3',
      actionname,
      '@' + new Date().toISOString()
    )
  console.log('%cprev state', 'color:#9E9E9E', prev)
  console.log('%cnext state', 'color:#4CAF50', next)
  console.groupEnd && console.groupEnd()
}

export default function set(
  store: IStore,
  ret: any,
  actionname: string
): Promise<any> {
  if (ret != null) {
    if (ret.then) {
      return ret.then(state => {
        const readyPrinf = prinf(store.getState(), actionname)
        store.setState(state)
        store.__DEV__ && readyPrinf(store.getState())
        return store.getState()
      })
    } else {
      const readyPrinf = prinf(store.getState(), actionname)
      store.setState(ret)
      store.__DEV__ && readyPrinf(store.getState())
      return Promise.resolve(store.getState())
    }
  } else {
    return Promise.resolve(null)
  }
}
