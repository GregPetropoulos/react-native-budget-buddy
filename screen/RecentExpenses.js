import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((item) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return item.date >= date7DaysAgo && item.date <= today;
  });
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 days' />
  );
};

export default RecentExpenses;
