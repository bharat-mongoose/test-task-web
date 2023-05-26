import { combineReducers } from 'redux';
import AllRepository from './reducer/AllRepository';
import LoaderReducer from './reducer/LoaderReducer';

const rootReducer = combineReducers({
    allRepository:AllRepository,
    loaderReducer: LoaderReducer,
});

export default rootReducer;