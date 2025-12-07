import { createContext, useContext, useEffect, useReducer } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const TransactionContext = createContext();

const ACTIONS = {
  LOAD: "load",
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
};

function transactionReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD:
      return action.payload || [];
    case ACTIONS.ADD:
      return [...state, action.payload];
    case ACTIONS.DELETE:
      return state.filter((t) => t.id !== action.payload);
    case ACTIONS.EDIT:
      return state.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload.updates } : t));
    default:
      return state;
  }
}

export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(transactionReducer, []);

  // load initial state from localStorage
  useEffect(() => {
    const stored = loadFromStorage("transactions");
    dispatch({ type: ACTIONS.LOAD, payload: stored || [] });
  }, []);

  useEffect(() => {
    saveToStorage("transactions", transactions);
  }, [transactions]);

  const addTransaction = (payload) => dispatch({ type: ACTIONS.ADD, payload });
  const deleteTransaction = (id) => dispatch({ type: ACTIONS.DELETE, payload: id });
  const editTransaction = (id, updates) => dispatch({ type: ACTIONS.EDIT, payload: { id, updates } });

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);
