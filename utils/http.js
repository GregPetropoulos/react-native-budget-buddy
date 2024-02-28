import axios from 'axios';
// These functions will send data to firebase
export function storeExpense(expenseData) {
  /* 
  The expenses.json at the end of the url is firebase specific where expense is the node folder in a json format for fire base to know how to consume it

 The expenseData is an object with 
    - amount
    - description,
     - date, 
     - No id needed firebase will create one
*/
  axios.post(
    'https://react-native-budget-buddy-default-rtdb.firebaseio.com/expenses.json',
    expenseData
  );
}
