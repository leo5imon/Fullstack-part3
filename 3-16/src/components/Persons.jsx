const Persons = (props) => {
    const handleDelete = (personId) => {
        props.onDelete(personId);
      };

    return (
        <>
            {props.persons
                .filter((person) => person.name.toLowerCase().includes(props.filter.toLowerCase()))
                .map((person) => (
                    <div key={person.name}>
                        {person.name} {person.number} <button value={person.id} onClick={() => handleDelete(person.id)}>delete</button>
                    </div>
            ))}
        </>
    )
}

export default Persons