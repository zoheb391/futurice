type CommentProps = {
    author: {
        login: string
    },
    bodyHTML: string,
}

type IssueProps = {
    author: {
        login: string
    },
    bodyHTML: string,
    title: string,
    comments: {
        nodes: Array<?CommentProps>,
    }
}

type IssueTableState = {
    issues: Array<?IssueProps>,
}

export type { IssueTableState, IssueProps }
