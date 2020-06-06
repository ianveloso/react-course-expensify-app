export default (expenses) => {
    return  expenses
        .map((a) => a.amount)
        .reduce((a, b) => a + b, 0);
};
