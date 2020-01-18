import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';

class App extends Component {
  // render is a life cycle method that creates the output
  // whihc is included in Component

  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading: false });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
    // JSX:
    // must always have one parent element
    // always wrapped in one div OR you can use reactFragment (which is like a ghost element)
    //  "className" not "class" is used
    // the "for" attribute => "htmlFor"
  }
}

export default App;
