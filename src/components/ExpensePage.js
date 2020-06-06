import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpensePage = () => (
    <div>
        This is from my dashboard component
        <ExpenseList />
        <ExpenseListFilters />
        <ExpensesSummary />
    </div>
);

export default ExpensePage;