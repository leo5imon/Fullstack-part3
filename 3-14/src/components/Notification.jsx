const Notification = (props) => {
  if (props.errorMessage === null & props.successMessage === null) {
    return null
  }

  if (props.errorMessage === null) return (<div className='success'>{props.successMessage}</div>)
  if (props.successMessage === null) return (<div className='error'>{props.errorMessage}</div>)
}

  export default Notification