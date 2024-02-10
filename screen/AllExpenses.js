import React, { useContext } from 'react';
import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod='Total'
      fallbackText='No Expenses Found'
    />
  );
};

export default AllExpenses;
