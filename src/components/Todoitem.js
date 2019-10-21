import React from 'react';

const Todoitem =(props) => {

return(
<li onClick={ () =>{props.clickhandler(props.index)}}  className ={props.details.completed ? 'completed' : ''}>
{props.details.text.name}
<span className = "glyphicon glyphicon-remove-sign" onClick={(evt) => {
evt.stopPropagation();
props.deleteTask(props.index)
}}></span>
 </li>
)
}

export default Todoitem;