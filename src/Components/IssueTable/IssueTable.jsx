// @flow
import React, { Component } from 'react'
import IssueRow from '../../Components/IssueRow'
import getIssues from '../../Services/IssueService'

import styles from './IssueTableStyles.js'
import { IssueTableState } from './flowTypes.js'


class IssueTable extends Component<{}, IssueTableState>{
    state = {
        issues: [],
        searchTerm: '',
    }

    componentWillMount(){
        getIssues() // todo: implement caching service + pagination
            .then(response => {
                let issues = response.data.data.repository.issues.nodes
                this.setState({ issues })
            })
            .catch(err => { // todo: implement error state
                console.log(err)
            });
    }

    handleSearchChange(event: SyntheticInputEvent<EventTarget>): void{
        this.setState({ searchTerm: event.target.value})
    }

    toggleSortBy(){
        this.setState({ issues: this.state.issues.reverse() })
    }

    render(){
        let { issues, searchTerm }:IssueTableState =  this.state

        const renderRows = () => {
            return issues
                .map((issue,i) => {
                   let title = issue.title
                   return title.includes(searchTerm)
                       ? <IssueRow key={i} issue={issue}  />
                       : null
                   })
        }

        const renderLoading = () =>
            <tr>
                <td style={styles.loading}>Loading....</td>
            </tr>

        return (
            <table className="ui one column padded fixed unstackable table">
                <thead className="full-width">
                    <tr>
                        <th style={ styles.header }>
                            <span> Open Issues </span>
                            <span className="ui input">
                                <input
                                    onChange={this.handleSearchChange.bind(this)}
                                    placeholder="..Search"/>
                            </span>
                            <div className="ui toggle checkbox">
                                  <input
                                      type="checkbox"
                                      onChange={this.toggleSortBy.bind(this)} />
                                  <label>Oldest</label>
                            </div>
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
