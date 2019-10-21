import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todoitem from './components/Todoitem.js'
import TodoForm from './components/TodoForm.js'
import  firebase from './firebase.js';




class Todolist extends React.Component{
constructor(){
super();
this.changeStatus = this.changeStatus.bind(this);
this.updateTask= this.updateTask.bind(this);
this.addTask= this.addTask.bind(this);
this.deleteTask= this.deleteTask.bind(this);



this.state = {
    
    tasks : [],
    currentTask : '',
   
}
}

componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = firebase.database().ref('tasks');
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), name: snapshot.key };
      this.setState({ tasks: [message].concat(this.state.tasks) });
    })
  }



deleteTask(index){
    console.log(index)
let tasks =this.state.tasks;
tasks.splice(index ,1);
this.setState({
    tasks:tasks
})
}
addTask(evt){
    evt.preventDefault();

    let tasks = this.state.tasks;
    let currentTask = this.state.currentTask;
    firebase.database().ref('tasks').push({
         name :currentTask,
        completed : false
    })
    
    this.setState({
        tasks :tasks,
        currentTask : ''
    });

}

updateTask(newValue){
this.setState({
currentTask : newValue.target.value
})}




changeStatus(index){
   // console.log(this.state.tasks[index]);
var tasks = this.state.tasks;
var task = tasks[index];
task.completed = !task.completed;
this.setState({tasks:tasks})

}

render(){
return(
    <section>
        <TodoForm
        currentTask={this.state.currentTask}
        updateTask = {this.updateTask}
        addTask = {this.addTask}/>
<ol>
     { this.state.tasks.map((task , index) => {
     return <Todoitem
      key={task.name}
      index = {index}
      deleteTask ={this.deleteTask}
      clickhandler={this.changeStatus}
      details={task}/>
    }
    )}
</ol>
</section>
)
}
} 



ReactDOM.render(<Todolist/>,document.getElementById("root"))
