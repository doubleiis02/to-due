import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import blank from './Icons/blank.png'
import checked from './Icons/checked.png'

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
                <div className='inputandeditbuttons'>
                    <div className='editinput'>
                        <input value={this.state.currentInput} onChange={this.inputHandler} />
                    </div>
                    <div className='editbuttons'>
                        <DatePicker id='datepicker' selected={this.state.currentDateObj} onChange={this.dateHandler} />
                        <button onClick={this.submitHandler}>save</button>
                        <button onClick={this.switchEditingMode}>cancel</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='content'>
                    <div>
                        <div className='contenttext'>
                            {this.strikethrough()}
                        </div>
                        <div>
                            Due {this.state.duedate}
                        </div>
                    </div>
                </div>
            )
        }
    }

    editButton = () => {
        if (this.state.editing) {
            return;
        } else {
            return (<button onClick={this.switchEditingMode}>edit</button>)
        }
    }

    changeButton = () => {
        if (this.state.strike) {
            return (<button className='imageicon' onClick={this.clickHandler}><img id='checked' alt='' src={checked}/></button>)
        } else {
            return (<button className='imageicon' onClick={this.clickHandler}><img id='blank' alt='unchecked' src={blank}/></button>)
        }
    }

    render = () => {
        return (
            <div className='task'>
                <div>
                    <div className='buttonandcontent'>
                        <div>
                            {this.changeButton()}
                        </div>
                        <div>
                            {this.editName()}
                        </div>
                        <div>
                            {this.editButton()}
                            <button onClick = {this.props.deleteFunc}>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task