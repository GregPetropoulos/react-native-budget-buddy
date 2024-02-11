import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../utils/date';
const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() ?? '',
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues?.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues?.description.toString() ?? '',
      isValid: true
    }
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    //   Analogous to e.target.value in the browser by using the bind method on the onChangeText
    // this keyword is a placeholder only
    setInputs((prev) => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      };
    });
  };
  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    // FORM VALIDATION PRIOR  TO SUBMISSION
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert('Invalid input','Please check your input values')
      setInputs((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid
          }
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
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
            value: inputs.amount.value
          }}
        />

        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value
        }}
      />
      {formIsInvalid && (
        <Text>Invalid Input values -- Please check your inputs!</Text>
      )}
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
