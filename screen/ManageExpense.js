import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';

// Using route prop to get params value since this loaded as a screen
// Use navigation to setOptions
const ManageExpense = ({ route, navigation }) => {
  // expenseId is passed from the ExpenseItem with navigation hook
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  // UseLayoutEffect stops the flickering since it mounts at the same time as the component not after the component mounts like useEffect
  useLayoutEffect(() => {
    // Always wrap the this in useLayoutEffect shouldn't be set directly stand alone
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>Manage Expenses</Text>
    </View>
  );
};

export default ManageExpense;
