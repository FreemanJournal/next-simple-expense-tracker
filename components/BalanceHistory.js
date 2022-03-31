import React, { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'
import * as IoIoIcons from "react-icons/io"

export default function BalanceHistory() {
    const { transactions,deleteTransactions } = useContext(GlobalContext)
    const incomeTransactions = transactions?.filter((t) => t.type === 'Income')
    const expenseTransactions = transactions?.filter((t) => t.type === 'Expense')
    const totalIncome = incomeTransactions?.reduce((accumulator, currentValue) => (accumulator += currentValue.amount), 0)
    const totalExpense = expenseTransactions?.reduce((accumulator, currentValue) => (accumulator += currentValue.amount), 0)
    let balance = totalIncome - totalExpense

    return (
        <div>
            <div className="balance">

                <div className='text-left py-2'>
                    <h4 className=''>Your Balance</h4>
                    <h1 className='text-2xl font-bold'>{`${balance < 0 ? "-" : ""}$${Number(Math.abs(balance))}`}</h1>
                </div>
            </div>
            <div className='flex gap-10 text-2xl p-3 w-full justify-evenly shadow-md bg-white rounded-lg'>
                <div>
                    <h4 className='font-bold'>Income</h4>
                    <p className='text-green-500'>{`$${totalIncome}`}</p>
                </div>
                <hr className='border-slate-300 shadow-inner  rounded-2xl border-l-2 h-16' />

                <div>
                  1 
                    <h4 className='font-bold'>{ balance < 0 ? 'Debt' : 'Expense'}</h4>
                   
                    <p className='text-red-500'>${totalExpense}</p>
                </div>
            </div>
            <div>
                <h3 className='text-left font-bold text-xl my-1'>History</h3>
                <ul className='history overflow-y-scroll h-52'>
                    {
                        transactions?.map((transaction, i) => {
                            const { id,type, des, amount } = transaction
                            return (
                                <li key={i} className={`tranInHis bg-white my-4 p-2 flex justify-between rounded-md font-semibold shadow-lg border-r-8 ${type === 'Income' ? "border-green-400" : "border-red-400"} relative`} onClick={() => deleteTransactions(id)} ><span className='delIcon duration-300'><IoIoIcons.IoIosRemoveCircleOutline /></span>
                                    <span className='ml-3'>{des}</span>
                                    <span>{`${type === 'Income' ? "" : "-"}$${amount}`}</span>
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
        </div>
    )
}
