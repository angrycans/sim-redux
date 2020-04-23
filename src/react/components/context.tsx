import React from 'react'
import createStore from '../../store/createStore'

const StoreContext = React.createContext({ store: createStore(null) })
const { Provider, Consumer } = StoreContext

export { Provider, Consumer, StoreContext }
