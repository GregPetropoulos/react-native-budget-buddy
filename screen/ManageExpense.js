// This is a Modal Screen via BottomTabs.Navigator screenOptions
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../component/ui/IconButton';
import Button from '../component/ui/Button';
import { GlobalStyles } from '../constants/styles';

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

  const deleteExpenseHandler = () => {
    navigation.goBack()

  };

  const cancelHandler = () => {
    navigation.goBack()
  };
  const confirmHandler = () => {
    navigation.goBack()

  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // This is the styles sent to the custom button
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
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
