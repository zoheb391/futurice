import React, { Component } from 'react'
import IssueTable from './Components/IssueTable'

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <IssueTable />
      </div>
    );
  }
}

export default App;
