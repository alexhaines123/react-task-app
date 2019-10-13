import React, {useState} from 'react';
import './Task.css';

const Task = (props) => {
    // Using hooks, very handy!
    const [newListId, setNewListId] = useState(props.lists[0].listId);

    return (
        <div className="Task col-sm">
            <h5>{props.name}</h5>
            <p>{props.description}</p>
            <form onSubmit={(evt) => props.update(evt, props.taskId, props.listId)}>
                <p><input className="col" type="text" onChange={(evt) => props.change(evt.target.value, 'name', props.taskId, props.listId)} value={props.name}/></p> 
                <p><input className="col" type="text" onChange={(evt) => props.change(evt.target.value, 'description', props.taskId, props.listId)} value={props.description}/></p>
                <p><input className="col" type="submit" value="Update" /></p>
            </form>
            <p>
            <button className="col" onClick={() => props.delete(props.taskId, props.listId)}>Delete</button>
            </p>
            <form onSubmit={(evt) => props.move(evt, newListId, props.taskId)}>
                <p>
                    <select className="col" onChange={(evt) => setNewListId(evt.target.value)}>
                        {props.lists.map(( list, index ) => {
                            return (
                                <option className="col" key={index} value={list.listId}>{list.name}</option>
                            )
                        })}
                    </select>
                </p>
                <p>
                    <input className="col" type="submit" value="Move" />
                </p>
            </form>
        </div>
    )
}

export default Task;