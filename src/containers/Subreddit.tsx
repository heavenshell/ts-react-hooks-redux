import * as React from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import * as yup from 'yup'

import SubredditComponent from '../components/Subreddit'
import { connector, useSubreddit, MapProps, MapDispatch } from './useSubreddit'

const validationSchema = yup.object().shape({
  subreddit: yup.string().required(),
})

type Props = RouteComponentProps & MapProps & MapDispatch

const Subreddit = withRouter(
  connector((props: Props) => {
    const { onLinkClick, onSubmit } = useSubreddit(props)
    return (
      <SubredditComponent
        initialValues={{ subreddit: props.subreddit }}
        onSubmit={onSubmit}
        onLinkClick={onLinkClick}
        validationSchema={validationSchema}
        isLoading={props.isLoading}
        posts={props.posts}
      />
    )
  })
)

export default Subreddit
