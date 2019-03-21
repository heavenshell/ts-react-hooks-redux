import { useCallback, useEffect } from 'react'

import { parse } from 'query-string'
import { RouteComponentProps } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { Props as ViewProps } from '../components/Subreddit'
import { ReduxState } from '../modules'
import { fetchSubreddit, queries } from '../modules/subreddit'

type MapProps = {
  isLoading: boolean
  posts?: any[]
  subreddit: string
}

const mapProps = ({ location }: RouteComponentProps) => ({
  subreddit,
}: ReduxState): MapProps => {
  const { value } = parse(location.search)
  const posts = queries.getPosts(subreddit.children)
  return { isLoading: subreddit.isLoading, posts, subreddit: value }
}

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
  dispatch: ThunkDispatch<ReduxState, null, AnyAction>
}

const useSubredditEffect = ({
  location: { search },
  dispatch,
}: RouteComponentProps & UseSubredditEffectProps) => {
  const { value } = parse(search)
  useEffect(() => {
    if (value) {
      dispatch(fetchSubreddit(value))
    }
  }, [value])
}

export const useSubreddit = ({
  location,
  history,
  match,
}: RouteComponentProps) => {
  const { isLoading, posts, subreddit } = useMappedState(
    useCallback(mapProps({ location, history, match }), [location.search])
  )

  const dispatch = useDispatch()
  const { onLinkClick, onSubmit } = useSubredditHandlers({
    history,
    location,
    match,
  })

  useSubredditEffect({
    history,
    location,
    match,
    dispatch,
  })

  return { isLoading, posts, subreddit, onLinkClick, onSubmit }
}
