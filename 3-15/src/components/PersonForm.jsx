const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
            name: <input value={props.valueName} onChange={props.handleName}/>
        </div>
        <div>
            number: <input value={props.valueNumber} onChange={props.handleNumber}/>
        <div/>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm