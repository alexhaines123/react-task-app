import React from 'react';
import './List.css';
import Task from '../Task/Task';
import CreateTask from '../Task/CreateTask';

const List = (props) => {
    let tasks = (props.tasks) ? props.tasks.map((task, index) => {
        return (
          <Task
          // change={(evt) => {this.listValueChangedHandler(list.listId, evt.target.value)}}
          // update={(evt) => this.listUpdateHandler(list.listId, evt)}
          // delete={() => this.listDeleteHandler(list.listId)}
          key={task.taskId}
          name={task.name}
          description={task.description}
          change={props.taskChange}
          update={props.taskUpdate}
          delete={props.taskDelete}
          move={props.taskMove}
          listId={props.listId}
          taskId={task.taskId}
          lists={props.lists}
        />
        )
    }) : null;

    return (
        <div className="List col-4">
            <h3>{props.name}</h3>
            <form onSubmit={props.update}>
                <fieldset>
                    <p>
                    <input className="col" type="text" onChange={props.change} value={props.name}/>
                    </p>
                    <p>
                    <input className="col"  type="submit" value="Update" />
                    </p>
                </fieldset>
            </form>
            <button className="col" onClick={props.delete}>Delete</button>
            {tasks}
            <CreateTask create={props.taskCreate} listId={props.listId}/>
        </div>
    )
}

export default List;