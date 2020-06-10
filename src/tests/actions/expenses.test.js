import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, startEditExpense, editExpense, startRemoveExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = {
    auth: {
        uid
    }
}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' }); 
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup remove expense action object with default', () => {
    const action = removeExpense(); 
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: undefined
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'test' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { note: 'test' }
    })
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]); 
    expect(action).toEqual({
        type: 'ADD_EXPENSE', 
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000, 
        note: 'This one is better',
        createdAt: 1000
    };
    
    store.dispatch(startAddExpense(expenseData))
    .then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String), 
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const defaultExpense = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0 
    };

    store.dispatch(startAddExpense({}))
    .then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String), 
                ...defaultExpense
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpense);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses); 
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done(); 
    });
});

test('should edit expense in firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {
        note: 'test edit feature', 
    };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val().note).toEqual(updates.note);
        done(); 
    });
});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense(); 
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE', 
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     });

// });