import * as React from 'react'

import { RouteComponentProps } from 'react-router-dom'
import * as yup from 'yup'

import SubredditComponent from '../components/Subreddit'
import { useSubreddit } from './useSubreddit'

const validationSchema = yup.object().shape({
  subreddit: yup.string().required(),
})

const Subreddit = (route: RouteComponentProps) => {
  const { isLoading, onLinkClick, onSubmit, posts, subreddit } = useSubreddit(
    route
  )
  return (
    <SubredditComponent
      initialValues={{ subreddit }}
      onSubmit={onSubmit}
      onLinkClick={onLinkClick}
      validationSchema={validationSchema}
      isLoading={isLoading}
      posts={posts}
    />
  )
}

export default Subreddit
