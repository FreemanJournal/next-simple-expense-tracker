import ExpenseTracker from "../components/ExpenseTracker";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";


export default function Home({ transactions }) {
  const { loadDB } = useContext(GlobalContext)
  useEffect(() => {
    loadDB(transactions)
  }, [])

  return (
    <>
      <ExpenseTracker />
    </>
  )
}
export async function getServerSideProps(context) {

  const res = await fetch('http://localhost:3000/api/expense-tracker')
  const { data } = await res.json();
  return {
    props: { transactions: data }, // will be passed to the page component as props
  }
}