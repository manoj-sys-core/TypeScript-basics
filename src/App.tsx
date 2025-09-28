import React from 'react'
import Hello from './Basics/start'
import Likes from './Basics/like-rating'
import Todo from './Basics/todo'
import GetData from './Basics/api'

const App = () => {
  return (
    <div>
      <Hello name='Manoj' />
      <Likes head='TypeScript' content='Gooing gud for now'/>
      <Todo />
      <GetData/>
    </div>
  )
}

export default App