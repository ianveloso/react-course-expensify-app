import React from 'react'; 
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore(); 
// console.log('src map test - should be l:14 of app.js');
// store.dispatch(addExpense({ description: 'Water bill', amount: 4500 })); 
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 })); 
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 })); 
// store.dispatch(setTextFilter('water'));  

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill')); 
// }, 3000)

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters); 
// console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp(); 
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        }); 
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});