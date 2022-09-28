import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {

  const [transaction, setTransaction] = useState([])


  useEffect(()=>{
    fetch('http://localhost:8001/transactions')
      .then(res => res.json())
      .then(data => setTransaction(data))
  }, [])
  

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

  function handleSearch(searchedTerm){
    const newState = transaction.filter(word => word.description.toLowerCase().includes(searchedTerm.toLowerCase()))
    setTransaction(newState)
  }

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
