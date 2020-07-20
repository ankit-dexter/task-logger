import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './Store/Reducer/taskDB';
import thunk from 'redux-thunk';
import auth from './Store/Reducer/auth';
import tempData from './Store/Reducer/tempData';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    taskDB: reducer,
    auth: auth,
    tempData: tempData
});

const store = createStore(rootReducer,
    applyMiddleware(thunk)
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
