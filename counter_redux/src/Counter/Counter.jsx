import React from 'react'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {increment,decrement, addValue,reset} from './counterSlice'

const Counter = () => {
    const [value,setValue] = useState(0);
    const count = useSelector(state => state.counter.count)
    const dispatch = useDispatch()
  return (
    <div>
        <p>Counter {count}</p>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        <button onClick={() => dispatch(addValue(Number(value) || 0))}>Add</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}   

export default Counter