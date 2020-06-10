import { login, logout } from '../../actions/auth';

test('should generate login action obj', () => {
    const uid = 'test123'
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('should generate logout action obj', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});

// test('should call firebase popup', (done) => {
//     const store = createMockStore([]);

//     store.dispatch(startLogin())
//     .then(() => {
//         const actions = store.getActions(); 
//         expect(actions[0]).toEqual({
//             type: 'ADD_EXPENSE',
//             expense: {
//                 id: expect.any(String), 
//                 ...defaultExpense
//             }
//         });
//     })
//     .then((snapshot) => {
//         expect(snapshot.val()).toEqual(defaultExpense);
//         done();
//     });
// });
