// @flow
import React, { Component } from 'react';
import getIssues from '../../Services/IssueService'

class IssueTable extends Component{
    state = {
        issues: [],
    }

    componentWillMount(){
        getIssues() // todo: implement caching service
            .then(response => {
                let issues = response.data.data.repository.issues.nodes
                console.log(issues)
                this.setState({ issues })
            })
            .catch(err => { // todo: implement error state
                console.log(err)
            });
    }


    render(){
        let { issues } =  this.state

        const renderRows = () => {
            return <div> hi </div>
        }

        const renderLoading = () =>
            <tr>
                <td>Loading....</td>
            </tr>

        return (
            <table className="ui one column padded fixed unstackable table">
                <thead className="full-width">
                    <tr>
                        <th>
                            <span> Open Issues </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { issues.length < 1 ? renderLoading() : renderRows() }
                </tbody>
            </table>
        )
    }
}

export default IssueTable
