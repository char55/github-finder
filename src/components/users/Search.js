
import React, { Component } from 'react'


export default class Search extends Component {
    state = {
        text: ''
    }

    onChange = e => this.setState({[e.target.name] : e.target.value}) 
    onSubmit = e => {
        this.props.searchUsers(this.state.text)
        e.preventDefault()
        this.setState({text: ''})
    }

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit} className="form">
                <input 
                    value={this.state.text} 
                    onChange={this.onChange}
                    type="text" 
                    name="text" 
                    placeholder="Search Users..."
                />
                <input 
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />
            </form>
        </div>
        )
    }
}
