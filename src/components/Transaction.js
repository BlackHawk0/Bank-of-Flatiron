import React from "react";

function Transaction({id,date,description,category,amount,handleDelete}) {
  function deleteTransaction(id){
    handleDelete(id)
  }
  return (
    <tr key={id}>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td><button onClick={()=> deleteTransaction(id)}>Delete</button></td>
    </tr>
  );
}

export default Transaction;
