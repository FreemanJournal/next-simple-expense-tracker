import React, { createContext, useReducer, useState } from 'react'

const initialState = []
// transactions:[
//     {id:1,type:"income",des:"Salary",amount:3000},

// ]
const AppReducer = (oldState, action) => {
    let transactions;
    switch (action.type) {
        case "ADD":
            transactions = [action.payload, ...oldState]
            return transactions
        case "UPDATE":
            // console.log(`transactions`,oldState);
            return transactions = oldState?.map(item => item._id === action.payload.id ? { ...item, ...action.payload.transaction } : item)
        case "DELETE":
            return transactions = oldState.filter((item) => item._id !== action.payload)
        case "DBTransactions":
            return transactions = action.payload
        default:
            return oldState;
    }

}
// create context
export const GlobalContext = createContext(initialState)
// Provider components
export const GlobalProvider = ({ children }) => {
    const [transactions, dispatch] = useReducer(AppReducer, initialState)
    const [dbTransaction, setDbTransaction] = useState([]);
    const [editable, setEditable] = useState();

    // action creators
    const deleteTransaction = (id) => {
        dispatch({ type: "DELETE", payload: id })
    }
    const addTransaction = (transaction) => {
        dispatch({ type: "ADD", payload: transaction })
    }
    const updateTransaction = (transaction) => {
        dispatch({ type: "UPDATE", payload: { id: transaction._id, transaction } })
    }

    const loadDB = (transactions) => {
        dispatch({ type: "DBTransactions", payload: transactions })
    }

    return (<GlobalContext.Provider value={{
        transactions,
        deleteTransaction,
        addTransaction,
        loadDB,
        editable,
        setEditable,
        updateTransaction
    }}>{children}</GlobalContext.Provider>)
}


