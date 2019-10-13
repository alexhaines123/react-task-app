import React, {useState} from 'react';

const CreateTask = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription ] = useState('');
    return (
        <div className="CreateTask col">
            <h5>Create new task</h5>
            <form onSubmit={(evt) => {props.create(evt, name, description, props.listId)}}>
                <p>
                    <label>
                        Name
                        <input onChange={(evt) => setName(evt.target.value)} className="col" type="text" value={name}/>
                    </label>
                </p>
                <p>
                <label>
                    Description
                    <input onChange={(evt) => setDescription(evt.target.value)} className="col" type="text" value={description}/>
                </label>
                </p>
                <p><input className="col" type="submit" value="Create" /></p>
            </form>
        </div>
    )
}

export default CreateTask;