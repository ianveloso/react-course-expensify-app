import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpensePage = () => (
    <div>
        This is from my dashboard component
        <ExpenseList />
        <ExpenseListFilters />
    </div>
);

export default ExpensePage;