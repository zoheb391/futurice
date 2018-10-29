import axios from 'axios'
import { get } from '../Lib/config'

const token = get("REACT_APP_TOKEN")

const issueQuery = `{
                        repository(owner:"facebook", name:"react") {
                            issues(first:50, states: OPEN) {
                                nodes {
                                    title,
                                    bodyHTML,
                                    author{
                                      login
                                    },
                                    comments(first: 10){
                                      nodes{
                                        bodyHTML,
                      					author{
                                          login
                                        }
                                      }
                                    }
                                 }
                            }
                        }
                    }`

const getIssues = () =>
     axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-type': 'Application/graphql'
            },
        data: {
            'query': issueQuery
        }
    })

export default getIssues
