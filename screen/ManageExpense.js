// This is a Modal Screen via BottomTabs.Navigator screenOptions
import React, { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import IconButton from '../component/ui/IconButton';
import Button from '../component/ui/Button';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../component/ManageExpense/ExpenseForm';
import { storeExpense,updateExpense,deleteExpense } from '../utils/http';

// Using route prop to get params value since this loaded as a screen
// Use navigation to setOptions

const ManageExpense = ({ route, navigation }) => {
  // CONTEXT
  const expenseCtx =useContext(ExpensesContext);

  // expenseId is passed from the ExpenseItem with navigation hook
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  //FOR PREPOPULATING THE FORM SUBMISSION DATA IN ExpenseForm FROM THE CONTEXT
  const selectedExpense = expenseCtx.expenses.find((item) => item.id === editedExpenseId);

  // UseLayoutEffect stops the flickering since it mounts at the same time as the component not after the component mounts like useEffect
  useLayoutEffect(() => {
    // Always wrap the this in useLayoutEffect shouldn't be set directly stand alone
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async() => {
    await deleteExpense(editedExpenseId);
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      // Optimistic updating the context
      expenseCtx.updateExpense(editedExpenseId, expenseData);
      // Updating the db
      await updateExpense(editedExpenseId, expenseData);
    } else {
      // The storeExpense will add to the database and return the id we need to update the context so we are in sync
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
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
