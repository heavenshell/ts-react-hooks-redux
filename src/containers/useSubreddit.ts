import { useEffect } from 'react'

import { parse } from 'query-string'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { Props as ViewProps } from '../components/Subreddit'
import { ReduxState } from '../modules'
import { fetchSubreddit, queries, SubRedditModel } from '../modules/subreddit'

export type MapProps = {
  isLoading: boolean
  posts?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  subreddit: string
}

const mapProps = (
  { subreddit }: ReduxState,
  { location }: RouteComponentProps
): MapProps => {
  const { value } = parse(location.search)
  const posts = queries.getPosts(subreddit.children)
  return { isLoading: subreddit.isLoading, posts, subreddit: value }
}

export type MapDispatch = {
  fetchSubreddit: (subreddit: string) => Promise<SubRedditModel>
}

const mapDispatch = (
  dispatch: ThunkDispatch<ReduxState, null, AnyAction>
): MapDispatch => ({
  fetchSubreddit: subbreddit => dispatch(fetchSubreddit(subbreddit)),
})

export const connector = connect(
  mapProps,
  mapDispatch
)

const useSubredditHandlers = ({ history, location }: RouteComponentProps) => {
  const onSubmit: ViewProps['onSubmit'] = data => {
    const { value } = parse(location.search)
    if (value === data.subreddit) {
      return
    }

    const nextPath = `/subreddit?value=${data.subreddit}`
    return history.push(nextPath)
  }

  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    permalink: string
  ) => {
    event.preventDefault()
    return window.open(`https://www.reddit.com/${permalink}`)
  }

  return { onLinkClick, onSubmit }
}

type UseSubredditEffectProps = {
  fetchSubreddit: MapDispatch['fetchSubreddit']
}

const useSubredditEffect = ({
  location: { search },
  fetchSubreddit,
}: RouteComponentProps & UseSubredditEffectProps) => {
  const { value } = parse(search)
  useEffect(() => {
    if (value) {
      fetchSubreddit(value)
    }
  }, [value])
}

export const useSubreddit = ({
  location,
  history,
  match,
  fetchSubreddit,
}: RouteComponentProps & UseSubredditEffectProps) => {
  const { onLinkClick, onSubmit } = useSubredditHandlers({
    history,
    location,
    match,
  })

  useSubredditEffect({
    history,
    location,
    match,
    fetchSubreddit,
  })

  return { onLinkClick, onSubmit }
}
