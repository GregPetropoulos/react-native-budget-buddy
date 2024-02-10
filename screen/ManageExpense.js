// This is a Modal Screen via BottomTabs.Navigator screenOptions
import React, { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import IconButton from '../component/ui/IconButton';
import Button from '../component/ui/Button';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../component/ManageExpense/ExpenseForm';

// Using route prop to get params value since this loaded as a screen
// Use navigation to setOptions
const ManageExpense = ({ route, navigation }) => {
  // CONTEXT
  const { deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);

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

  const deleteExpenseHandler = () => {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    if (isEditing) {
      updateExpense(editedExpenseId, {
        description: 'Test!!!',
        amount: 29.99,
        date: new Date('2024-2-10')
      });
    }
    addExpense({
      description: 'Test',
      amount: 19.99,
      date: new Date('2024-2-10')
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
      />

      {/* Delete Button */}
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name='trash'
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
