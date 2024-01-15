import { View, StyleSheet } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  const DUMMY_EXPENSES = [
    {
      id: 'e1',
      description: 'A Pair of shoes',
      amount: 59.99,
      date: new Date('2024-01-10')
    },
    {
      id: 'e2',
      description: 'A Pair of trousers',
      amount: 89.29,
      date: new Date('2024-01-11')
    },
    {
      id: 'e3',
      description: 'some Bananas',
      amount: 34.09,
      date: new Date('2024-01-13')
    },
    {
      id: 'e4',
      description: ' A Book',
      amount: 5.99,
      date: new Date('2024-01-09')
    },
    {
      id: 'e5',
      description: 'A Movie ticket',
      amount: 12.99,
      date: new Date('2024-01-08')
    }
  ];

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop:24,
    paddingBottom:0,
    backgroundColor: GlobalStyles.colors.primary700
  }
});
