// @flow
import React, { Component } from 'react'
import IssueRow from '../../Components/IssueRow'
import getIssues from '../../Services/IssueService'

import styles from './IssueTableStyles.js'
import { IssueTableState } from './flowTypes.js'


class IssueTable extends Component<{}, IssueTableState>{
    state = {
        issues: [],
    }

    componentWillMount(){
        getIssues() // todo: implement caching service + pagination
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
        let { issues }:IssueTableState =  this.state

        const renderRows = () => {
            return issues
                .map((issue,i) => {
                   return <IssueRow key={i} issue={issue} />
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
                        <th style={ styles.header } >
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
