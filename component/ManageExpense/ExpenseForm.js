import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';
import Button from '../ui/Button';
const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel }) => {
  const [inputValue, setInputValue] = useState({
    amount: '',
    date: '',
    description: ''
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    //   Analogous to e.target.value in the browser by using the bind method on the onChangeText
    // this keyword is a placeholder only
    setInputValue((prev) => {
      return { ...prev, [inputIdentifier]: enteredValue };
    });
  };
  const submitHandler = () => {};
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValue.amount
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValue.date
          }}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValue.description
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
