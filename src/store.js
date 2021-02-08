import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from './reducers';

// const reducers = {
// 	bookReducer,
// };

// const rootReducer = combineReducers(reducers);

// export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default configureStore({
	reducer: rootReducer
});