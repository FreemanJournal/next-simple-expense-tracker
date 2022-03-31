import React, { createContext, useReducer } from 'react'

const initialState = []
// transactions:[
//     {id:1,type:"income",des:"Salary",amount:3000},

// ]
const AppReducer = (oldState, action) => {
    let transactions;
    switch (action.type) {
        case "DELETE":
            return transactions = oldState.filter((item)=>item.id !== action.payload)
        case "ADD":
            transactions = [action.payload,...oldState]
            return transactions
        default:
            return oldState;
    }

}
// create context
export const GlobalContext = createContext(initialState)
// Provider components
export const GlobalProvider = ({ children }) => {
    const [transactions, dispatch] = useReducer(AppReducer, initialState)

    // action creators
    const deleteTransactions = (id) => {
        dispatch({ type: "DELETE", payload: id })
    }
    const addTransactions = (transaction) => {
        dispatch({ type: "ADD", payload: transaction })
    }

    return (<GlobalContext.Provider value={{
        transactions,
        deleteTransactions,
        addTransactions
    }}>{children}</GlobalContext.Provider>)
}


