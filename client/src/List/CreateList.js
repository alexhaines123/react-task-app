import React from 'react';
import './List.css';

const CreateList = (props) => {
    return (
        <div className="CreateList container">
            <h3>Create new list</h3>
            <form onSubmit={props.create}>
                <p><input className="col" type="text" onChange={props.change} value={props.value}/></p>
                <p><input className="col" type="submit" value="Create" /></p>
            </form>
        </div>
    )
}

export default CreateList;