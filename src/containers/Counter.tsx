import * as React from 'react'

import { useDispatch, useMappedState } from 'redux-react-hook'

import CounterComponent from '../components/Counter'
import { ReduxState } from '../modules'

import { increment, decrement } from '../modules/counter'

type MapProps = {
  count: number
}

const mapProps = ({ counter }: ReduxState): MapProps => ({
  count: counter.count,
})

const Counter = () => {
  const { count } = useMappedState(mapProps)
  const dispatch = useDispatch()

  const onIncrementClick = React.useCallback(() => dispatch(increment()), [
    count,
  ])
  const onDecrementClick = React.useCallback(() => dispatch(decrement()), [
    count,
  ])

  return (
    <CounterComponent
      count={count}
      onDecrementClick={onDecrementClick}
      onIncrementClick={onIncrementClick}
    />
  )
}

export default Counter
