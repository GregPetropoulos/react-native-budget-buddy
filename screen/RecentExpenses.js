import { useState, useEffect } from 'react';
import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import LoadingOverlay from '../component/ui/LoadingOverlay';
import ErrorOverlay from '../component/ui/ErrorOverlay';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  // const { expenses, setExpenses } = useContext(ExpensesContext);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      /* 
      VERY IMPORTANT
      1. FETCHING DATA FROM THE BACKEND
      2. SET THE DATA IN THE CONTEXT
      3. WHEN ADDING AN EXPENSE THE USER CAN SEE IT ADDED IMMEDIATELY INSTEAD OF REFETCHING
      */
      setIsFetching(true);
      try {
        const expensesFetched = await fetchExpenses();
        expensesCtx.setExpenses(expensesFetched);
      } catch (e) {
        console.error(e);
        setError('Could not fetch expenses!');
      }

      setIsFetching(false);
    };
    getExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
    // Could have a refetch here
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expensesCtx.expenses.filter((item) => {
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
