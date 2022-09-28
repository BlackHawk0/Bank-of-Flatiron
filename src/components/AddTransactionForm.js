import React, {useState} from "react";

function AddTransactionForm({submittedData}) {

  const [formData, setFormData] = useState({date:"", description:"", category:"", amount:0})

  function handleInputChange(e){
    //new object
    const newForm = {...formData, [e.target.name]:e.target.value}
    setFormData(newForm);
  }

  function handleOnSumbit(event){
    event.preventDefault()
    submittedData(formData)
  }

  return (
    <div className="ui segment">
      <form className="ui form"  onSubmit={handleOnSumbit}>
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={handleInputChange}/>
          <input type="text" name="description" value={formData.description} placeholder="Description" onChange={handleInputChange}/>
          <input type="text" name="category" value={formData.category} placeholder="Category" onChange={handleInputChange} />
          <input type="number" name="amount" value={formData.amount} placeholder="Amount" step="0.01"  onChange={handleInputChange}/>
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
