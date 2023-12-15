const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.value} onChange={props.handle}/>
        </div> 
    )
}

export default Filter