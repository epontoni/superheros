import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { heroReducer } from '../reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['app']
}


const rootReducer = combineReducers({app: heroReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = []

export const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(...middleware)))
export const persistor = persistStore(store)

export default { store, persistor } // eslint-disable-line