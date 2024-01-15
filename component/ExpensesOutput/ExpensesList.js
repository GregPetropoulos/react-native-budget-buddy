import {  Text, FlatList, StyleSheet } from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderExpensesItem = (itemData) => {

  return <ExpenseItem {...itemData.item}/>;
};
const ExpensesList = ({ expenses }) => {

  return (

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpensesItem}
      />
  );
};

export default ExpensesList;

