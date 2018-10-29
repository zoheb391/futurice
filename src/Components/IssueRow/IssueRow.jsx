// @flow
import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

import { IssueProps } from '../IssueTable/flowTypes'


const IssueRow = ({ issue }:IssueProps) => {
    let { nodes: comments } = issue.comments

    const renderCommentsSection = () =>
            <div>
                <h3> 10 Recent Comments </h3>
                { renderComments() }
            </div>

    const renderComments = () => {
        return comments.map((comment, i) => {
            if(comment.author && comment.bodyHTML){
                return (
                    <div key={i}>
                        <strong>{ comment.author.login }</strong>
                        <div
                            dangerouslySetInnerHTML={{__html: comment.bodyHTML}}>
                        </div>
                    </div>
                )
            } else return null
        })
    }

    return (
        <tr>
            <td>
                <div>
                    <i className="exclamation circle icon"></i>
                </div>
                <div>
                    <div>{ issue.title }</div>
                    <div> by { issue.author.login } </div>
                </div>
                <div>
                    <Modal trigger={<Button className="ui black button">View Details</Button>}>
                      <Modal.Header>{issue.title}</Modal.Header>
                        <Modal.Description>
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
