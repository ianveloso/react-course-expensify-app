import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date', 
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sorBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sorBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'
    };
    const action = { type: 'SET_TEXT_FILTER', text: 'e' };
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('e');
});

test('should set startDate filter', () => {
    const action = { type: 'SET_START_DATE', startDate: moment(0) };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(moment(0));
});

test('should set endDate filter', () => {
    const action = { type: 'SET_END_DATE', endDate: moment(0).add(4, 'days').valueOf() };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(moment(0).add(4, 'days').valueOf());
});