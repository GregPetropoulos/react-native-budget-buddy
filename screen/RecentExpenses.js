import { useEffect } from 'react';
import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      const expensesFetched = await fetchExpenses();
   
      /* 
    VERY IMPORTANT
    1. FETCHING DATA FROM THE BACKEND
    2. SET THE DATA IN THE CONTEXT
    3. WHEN ADDING AN EXPENSE THE USER CAN SEE IT ADDED IMMEDIATELY INSTEAD OF REFETCHING
    */

      setExpenses(expensesFetched);
    };
    getExpenses();
  }, []);
  const recentExpenses = expenses.filter((item) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return item.date >= date7DaysAgo && item.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 days'
      fallbackText='No Expenses Registered for the last 7 days'
    />
  );
};

export default RecentExpenses;
