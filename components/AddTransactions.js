import React, { useContext, useState } from 'react'
import { GlobalContext } from './context/GlobalContext'
import { v4 as uuidV4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const initTransaction = {
  type: "Income"
}

export default function AddTransactions() {
  const [transactions, setTransactions] = useState(initTransaction)
  const { addTransaction } = useContext(GlobalContext)
  const { router } = useRouter();


  const onChangeHandler = ({ target: { name, value } }) => {

    setTransactions(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value }))

  }

  const createTransaction = async (transactions) => {
    try {
      const res = await fetch('http://localhost:3000/api/expense-tracker', {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transactions)
      })

      console.log(res);
      if (res) {
        toast.success('Add transaction successfully!')

      } else {
        toast.error('Add transaction Failed!')

      }
      // router.push("/")

    } catch (error) {
      toast.error('Add transaction Failed!')
      console.log(error);

    }
  }
  const submitHandler = () => {
    if (!transactions.amount || !transactions.title) return;

    createTransaction(transactions)
    const NewTransaction = {
      ...transactions,
      // amount:Number(transactions.amount),
      _id: uuidV4()
    }

    addTransaction(NewTransaction)
    setTransactions(initTransaction)
  }



  return (
    <div className='md:px-5 md:w-80'>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <h3 className='text-left font-bold text-xl'>Add new transaction</h3>
      <hr className='my-3 border-green-400 rounded-lg' />

      <form className='flex flex-col gap-4 text-lg'>
        <div>
          <label className='text-left block mb-2 font-medium'>Type</label>
          <select
            className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'
            name='type'
            value={transactions?.type}

            onChange={onChangeHandler}>

            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
        <div>
          <label className='text-left block mb-2 font-medium'>Title</label>
          <input type="text" name='title' placeholder="Enter text...." value={transactions?.title || ''} className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md' onChange={onChangeHandler} />

        </div>
        <div>
          <label className='text-left block mb-2 font-medium'>Amount</label>
          <input type="number" name='amount' placeholder="Enter Amount...." value={transactions?.amount || ''} autoComplete="off" className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md' onChange={onChangeHandler} />
        </div>
        <button type='button' className='block w-full p-2 mt-4 rounded-md outline-none bg-green-500 text-white font-semibold tracking-wider hover:bg-green-700 duration-300' onClick={submitHandler}>Add Transaction</button>

      </form>

    </div>
  )
}
