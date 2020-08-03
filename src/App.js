import React from 'react';
import './App.scss';
import Task from './Task.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import add from './Icons/add.png'

class App extends React.Component {
  state = {
    currentInput: "",
    listOfTasks: [],
    currentDateObj: new Date(),
    currentDate: dateFormat(new Date(), "dddd, mmmm dS, yyyy"),
    listOfDates: [],
    listOfDateObjs: [],
    listLength: 0,
    openInput: false,
  }

  flipOpenInput = () => {
    let c = !this.state.openInput;
    this.setState({openInput: c})
  }

  taskAdder = () => {
    if (this.state.openInput === false) {
      return (<button className='imageicon' onClick={this.flipOpenInput}><img src={add}/></button>)
    } else {
      return (
        <div className='taskadder'>
          <div>
            <input placeholder='I have to...' className='inputbar' value={this.state.currentInput} onChange={this.inputHandler} />
          </div>
          <div className='taskaddericongroup'>
            <DatePicker className='taskaddericon' id='datepicker' selected={this.state.currentDateObj} onChange={this.newDateHandler} />
            <button className='taskaddericon' onClick={this.submitHandler}>add</button>
            <button className='taskaddericon' onClick={this.flipOpenInput}>cancel</button>
          </div>
        </div>
      )
    }
  }

  inputHandler = (event) => {
    this.setState({currentInput: event.target.value})
  }

  newDateHandler = (event) => {
    this.setState({currentDateObj: event})
    let date = dateFormat(event, "dddd, mmmm dS, yyyy");
    this.setState({currentDate: date})
  }

  submitHandler = () => {
    let newCopy = this.state.listOfTasks;
    newCopy.push(this.state.currentInput);
    this.setState({listOfTasks: newCopy})
    let dateCopy = this.state.listOfDates;
    dateCopy.push(this.state.currentDate);
    this.setState({listOfDates: dateCopy})
    let dateObjCopy = this.state.listOfDateObjs;
    dateObjCopy.push(this.state.currentDateObj);
    this.setState({listOfDateObjs: dateObjCopy})
    let numCopy = this.state.listLength;
    numCopy++;
    this.setState({listLength: numCopy})
  }

  deleteTask = (index) => {
    let newCopy = this.state.listOfTasks;
    newCopy.splice(index, 1);
    this.setState({listOfTasks: newCopy})
    let dateCopy = this.state.listOfDates;
    dateCopy.splice(index, 1);
    this.setState({listOfDates: dateCopy})
    let dateObjCopy = this.state.listOfDateObjs;
    dateObjCopy.splice(index, 1);
    this.setState({listOfDateObjs: dateObjCopy})
    let numCopy = this.state.listLength;
    numCopy--;
    this.setState({listLength: numCopy})
  }

  deleteAllTasks = () => {
    this.setState({listOfTasks: []})
    this.setState({listOfDates: []})
    this.setState({listOfDateObjs: []})
    this.setState({listLength: 0})
  }

  deleteAllTasksButton = () => {
    if (this.state.listLength > 0) {
      return (<button onClick={this.deleteAllTasks}>delete all tasks</button>)
    } else {
      return;
    }
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">

          <h1>To-Due</h1>
          <div className='body'>
            <div className='row'>
              {this.deleteAllTasksButton()}
            </div>
            <div className='row'>
              {
                this.state.listOfTasks.map((task, index) => {
                  // for every 'task' in list, return a Task with content 'task' and key 'index'
                  return <Task content={task} key={index} date={this.state.listOfDates[index]} dateObj={this.state.listOfDateObjs[index]} deleteFunc = {() => {this.deleteTask(index)}} />
                })
              }
            </div>
            <div className='row'>
              {this.taskAdder()}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
