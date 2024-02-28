import { createContext, useReducer } from 'react';


export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses)=>{}
});

// Defining a reducer function to return a new state value for the useReducer hook to consume
const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      // the fetch response from firebase is in order of creation not entered date by user
      const inverted = action.payload.reverse()
      return inverted
    case 'ADD':

      return [action.payload, ...state];
    case 'UPDATE':
      // Find the index of the expense object in array to be updated
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      //  Locate the object to be updated with in the current state
      const updatableExpense = state[updatableExpenseIndex];
      //   merging the current expense object value in the state with the payload
      // Keeps the original id
      const updateItem = { ...updatableExpense, ...action.payload.data };
      //   The overall array to be updated with a new one
      const updatedExpenses = [...state];

      //   Reach up to updatableExpenseIndex to find state to be assigned the updated item
      updatedExpenses[updatableExpenseIndex] = updateItem;
      return updatedExpenses;

    case 'DELETE':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  // STATE MANAGEMENT LOGIC
  const [expensesState, dispatch] = useReducer(expensesReducer,[]);

  const setExpenses = (expenses) => {
    dispatch({type:'SET_DATA', payload:expenses})

  }

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  };
  const value = {
    expenses: expensesState,
    setExpenses:setExpenses,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
