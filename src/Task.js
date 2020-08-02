import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';

class Task extends React.Component {
    state = {
        content: this.props.content,
        currentInput: this.props.content,
        duedate: this.props.date,
        currentDate: this.props.date,
        currentDateObj: this.props.dateObj,
        strike: false,
        editing: false,
    }

    clickHandler = () => {
        let copy = !this.state.strike;
        this.setState({strike: copy})
    }

    strikethrough = () => {
        let c = this.state.content;
        if (this.state.strike) {
            return (<div style={{textDecorationLine: 'line-through'}}>{c}</div>)
        } else {
            return (<div>{c}</div>)
        }
    }

    inputHandler = (event) => {
        this.setState({currentInput: event.target.value})
    }

    dateHandler = (event) => {
        this.setState({currentDateObj: event})
        let d = dateFormat(event, "dddd, mmmm dS, yyyy");
        this.setState({currentDate: d})
    }

    switchEditingMode = () => {
        let c = !this.state.editing;
        this.setState({editing: c})
    }

    submitHandler = () => {
        let c = this.state.currentInput;
        this.setState({content: c})
        let d = this.state.currentDate;
        this.setState({duedate: d})
        this.switchEditingMode();
    }

    editName = () => {
        if (this.state.editing) {
            return (
                <div>
                    <input value={this.state.currentInput} onChange={this.inputHandler} />
                    <DatePicker selected={this.state.currentDateObj} onChange={this.dateHandler} />
                    <button onClick={this.submitHandler}>save</button>
                    <button onClick={this.switchEditingMode}>cancel</button>
                </div>
            )
        } else {
            return (
                <div>
                    {this.strikethrough()}
                    Due {this.state.duedate}
                    <button onClick={this.switchEditingMode}>edit</button>
                </div>
            )
        }
    }

    render = () => {
        return (
            <div class='task'>
                <div>
                    <button onClick={this.clickHandler}>◯</button>
                    {this.editName()}
                    <button onClick = {this.props.deleteFunc}>delete task</button>
                </div>
            </div>
        )
    }
}

export default Task