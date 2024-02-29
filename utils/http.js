import axios from 'axios';
import {REACT_APP_FIREBASE_BASE_URL} from 'react-native-dotenv'



// These functions will send data to firebase
export async function storeExpense(expenseData) {
  /* 
  The expenses.json at the end of the url is firebase specific where expense is the node folder in a json format for fire base to know how to consume it

 The expenseData is an object with 
    - amount
    - description,
     - date, 
     - No id needed firebase will create one
*/
  const response = await axios.post(`${REACT_APP_FIREBASE_BASE_URL}/expenses.json`, expenseData);
  // Get the firebase id response
  const id = response.data.name
  return id

}

export async function fetchExpenses() {
  const response = await axios.get(`${REACT_APP_FIREBASE_BASE_URL}/expenses.json`);
  //   Because the way firebase assigns the data must loop through and format into an array of objects for my frontend, date needed to be converted from string to object
  const expenses = [];
  const data =  response.data
  for (const key in data) {
    const expenseObj = {
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description
    };
    expenses.push(expenseObj);
  }
  return expenses;
}
export function updateExpense(id,expenseData){
return axios.put(`${REACT_APP_FIREBASE_BASE_URL}/expenses/${id}.json`,expenseData)
}

export  function deleteExpense(id){
  return axios.delete(`${REACT_APP_FIREBASE_BASE_URL}/expenses/${id}.json`)

}



