import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {

  // handle transaction state
  const [transaction, setTransaction] = useState([])

// fetch data from the api
  useEffect(()=>{
    fetch('http://localhost:8001/transactions')
      .then(res => res.json())
      .then(data => setTransaction(data))
  }, [])
  
  // sort the transaction ls=ist alphabetically based on catagory element
  const sortedList = transaction.sort((a, b) => {
      let category1 = a.category.toUpperCase();
      let category2 = b.category.toUpperCase();
      if (category1 < category2) {
        return -1;
      }
      if (category1 > category2) {
        return 1;
      }
      return 0;
    });

  // add a transaction to the database
  function handleAddition(newTransaction){
    // setTransaction(transaction => [...transaction, newTransaction])
    fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTransaction)
    })
    .then(res => res.json())
    .then(data => setTransaction(updatedTransaction => [...updatedTransaction,data]))
    .catch(err => console.log(err))
  }

  // filter rendered data based on searched description
  function handleSearch(searchedTerm){
    const newState = transaction.filter(word => word.description.toLowerCase().includes(searchedTerm.toLowerCase()))
    setTransaction(newState)
  }

  // delete an element from the db
  function handleDeletion(id){
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setTransaction(transaction => transaction.filter(trans => trans.id !== id)))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Search searched={handleSearch}/>
      <AddTransactionForm submittedData={handleAddition}/>
      <TransactionsList list={sortedList} onDeletion={handleDeletion}/>
    </div>
  );
}

export default AccountContainer;
