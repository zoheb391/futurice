// @flow
import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

import styles from './IssueRowStyles.js'
import { IssueProps } from '../IssueTable/flowTypes'


const IssueRow = ({ issue }:IssueProps) => {
    let { nodes: comments } = issue.comments

    const renderCommentsSection = () =>
            <div>
                <h3 style={styles.commentsHeader}> 10 Recent Comments </h3>
                { renderComments() }
            </div>

    const renderComments = () => {
        return comments.map((comment, i) => {
            if(comment.author && comment.bodyHTML){
                return (
                    <div key={i} style={styles.comment}>
                        <strong>{ comment.author.login }</strong>
                        <div style={styles.commentBody}
                            dangerouslySetInnerHTML={{__html: comment.bodyHTML}}>
                        </div>
                    </div>
                )
            } else return null
        })
    }

    return (
        <tr>
            <td style={styles.cell}>
                <div>
                    <i className="exclamation circle icon" style={styles.openIcon}></i>
                </div>
                <div style={styles.title}>
                    <div>{ issue.title }</div>
                    <div style={styles.author}> by { issue.author.login } </div>
                </div>
                <div style={styles.viewDetails}>
                    <Modal trigger={<Button style={styles.modalButton}className="ui black button">View Details</Button>}>
                      <Modal.Header>{issue.title}</Modal.Header>
                        <Modal.Description style={styles.bodyText}>
                            <p
                                dangerouslySetInnerHTML={{__html: issue.bodyHTML}}>
                            </p>
                            { renderCommentsSection() }
                        </Modal.Description>
                    </Modal>
                </div>
            </td>
        </tr>
    )
}

export default IssueRow
