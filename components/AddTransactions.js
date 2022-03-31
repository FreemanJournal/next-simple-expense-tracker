import React, { useContext, useState } from 'react'
import { GlobalContext } from './context/GlobalContext'
import { v4 as uuidV4 } from 'uuid';

const initialTransaction = {
  type: "Income",
  des: "",
  amount: "",
  id:0
}
export default function AddTransactions() {
  const [transactions, setTransactions] = useState(initialTransaction)
  const {addTransactions} = useContext(GlobalContext)
  const submitHandler = ()=>{
    if( !transactions.amount||!transactions.des)return
    const NewTransactions ={
      ...transactions,
      amount:Number(transactions.amount),
      id:uuidV4()
    }
    addTransactions(NewTransactions)
    setTransactions(initialTransaction)
  }

  

  return (
    <div className='md:px-5 md:w-80'>
      <h3 className='text-left font-bold text-xl'>Add new transaction</h3>
      <hr className='my-3 border-green-400 rounded-lg' />

      <form className='flex flex-col gap-4 text-lg'>
        <div>
          <label className='text-left block mb-2 font-medium'>Type</label>
          <select className='block w-full p-2 rounded-md outline-none' onChange={(e) => setTransactions({ ...transactions, type: e.target.value })}>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
        <div>
          <label className='text-left block mb-2 font-medium'>Description</label>
          <input type="text" placeholder="Enter text...." value={transactions.des} className='block w-full p-2 rounded-md focus:outline-none focus:ring-2 ring-green-500  shadow-inner' onChange={(e) => setTransactions({ ...transactions, des: e.target.value })} />
        </div>
        <div>
          <label className='text-left block mb-2 font-medium'>Amount</label>
          <input type="number" placeholder="Enter Amount...." value={transactions.amount} className='block w-full p-2 rounded-md focus:outline-none focus:ring-2 ring-green-500 shadow-inner' onChange={(e) => setTransactions({ ...transactions, amount: e.target.value })} />
        </div>
        <button type='button' className='block w-full p-2 rounded-md outline-none bg-green-500 text-white font-semibold tracking-wider hover:bg-green-700 duration-300' onClick={submitHandler}>Add Transaction</button>
        
      </form>
      
    </div>
  )
}
