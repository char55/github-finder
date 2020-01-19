import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV != 'production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
class App extends Component {
  // render is a life cycle method that creates the output
  // whihc is included in Component

  state = {
    users: [],
    loading: false,
    showClear: false,
    showReset: false
  };

   componentDidMount() {
    this.resetUsers()
  }

  // search users for inputed text - if text empty: resets to all
  searchUsers = async (searchText) => {
    this.setState({loading: true})
    const res = 
    searchText === '' ?
    await axios.get(`https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    : await axios.get(`https://api.github.com/search/users?q=${searchText}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
    this.setState({ 
                    users: searchText === '' ? res.data : res.data.items, 
                    loading: false,  
                    showClear: searchText === '' ? false : true, 
                    showReset:  searchText === '' ? false :true
                  })
  } 

  // show all users
  resetUsers = async () => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    this.setState({ users: res.data, loading: false,  showClear: false, showReset: false });
  }

  // clears users from state
  clearUsers = async() => {
    this.setState({ loading: true });
    this.setState({users: [], loading: false, showClear: false})
  }
  render() {

    const {showClear, showReset, loading, users} = this.state

    return (
      <div>
        <Navbar />
        <div className="container">
          <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClear={showClear} 
            resetUsers={this.resetUsers}
            showReset={showReset}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
