import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A Pair of shoes',
    amount: 59.99,
    date: new Date('2024-01-10')
  },
  {
    id: 'e2',
    description: 'A Pair of trousers',
    amount: 89.29,
    date: new Date('2024-02-02')
  },
  {
    id: 'e3',
    description: 'some Bananas',
    amount: 34.09,
    date: new Date('2024-02-04')
  },
  {
    id: 'e4',
    description: ' A Book',
    amount: 5.99,
    date: new Date('2024-02-06')
  },
  {
    id: 'e5',
    description: 'A Movie ticket',
    amount: 12.99,
    date: new Date('2024-01-01')
  }
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {}
});

// Defining a reducer function to return a new state value for the useReducer hook to consume
const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
