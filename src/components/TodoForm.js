import React from 'react';

const TodoForm =(props) =>{
    return (
  <div className='header'>      
<form onSubmit={props.addTask}>
<input type ="text" placeholder="Please enter the task"
value = {props.currentTask}
onChange = {props.updateTask}/>
<button className="addbutton" type="submit"> + </button>
</form>
</div>)
}

export default TodoForm;