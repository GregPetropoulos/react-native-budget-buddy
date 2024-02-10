import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../utils/date';
const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues
}) => {
  const [inputValues, setInputValue] = useState({
    amount: defaultValues?.amount.toString() ?? '',
    date: defaultValues ? getFormattedDate(defaultValues?.date) : '',
    description: defaultValues?.description.toString() ?? ''
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    //   Analogous to e.target.value in the browser by using the bind method on the onChangeText
    // this keyword is a placeholder only
    setInputValue((prev) => {
      return { ...prev, [inputIdentifier]: enteredValue };
    });
  };
  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    };
    onSubmit(expenseData);
  };
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            // We bind here since there is not e.target.value like the web
            // by passing this amount identifier to wire the proper input dynamically with an id amount
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date
          }}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  //   Passing these styles into the Input for merging styles and to not effect the description
  rowInput: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // This is the styles sent to the custom button
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
