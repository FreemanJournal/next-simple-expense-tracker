import moment from 'moment'
import React, { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'

export default function TransactionDetails() {
  const { transactions, editable, setEditable, deleteTransaction,updateTransaction } = useContext(GlobalContext)

  const { _id, type, title, amount, date } = editable || {}

  const deleteHandler = (id) => {
    deleteTransaction(id)
    setEditable(null)
  }
  const updateHandler = (transaction)=>{
    if (!transaction.title || !transaction.amount) return;
    updateTransaction(transaction)
    setEditable(null)

  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg relative select-none" >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Transaction Details</h3>
      </div>
      <div className="border-t border-gray-200" style={{ pointerEvents: !!editable ? "all" : "none" }}>
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="price"
                id="price"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                value={title || ""}
                onChange={(e) => setEditable(prev => ({ ...prev, ...(prev.title = e.target.value) }))}
                autoComplete="off"
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Amount</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div>

                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    value={parseFloat(amount)}
                    onChange={(e) => setEditable(prev => ({ ...prev, ...(prev.amount = e.target.value) }))}
                    autoComplete="off"

                  // readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                      Type
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={type}

                      className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                      <option>Income</option>
                      <option>Expense</option>
                    </select>
                  </div>
                </div>
              </div>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(date).format('Do  MMMM, YY h:mm A')}</dd>
          </div>

        </dl>
        <div className="flex gap-2 justify-between px-4 absolute bottom-6 w-full">
          <button type='button' className='block w-1/3 p-2 rounded-md outline-none bg-red-500 text-white font-semibold tracking-wider hover:bg-red-700 duration-300' onClick={() => deleteHandler(_id)}>Delete</button>
          <button type='button' className='block w-1/3 p-2 rounded-md outline-none bg-green-500 text-white font-semibold tracking-wider hover:bg-green-700 duration-300' onClick={()=>updateHandler(editable)}>Update</button>
        </div>
      </div>
    </div>
  )
}
