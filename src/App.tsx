import React from 'react'
import Hello from './Basics/start'
import Likes from './Basics/like-rating'
import Todo from './Basics/todo'

const App = () => {
  return (
    <div>
      <Hello name='Manoj' />
      <Likes head='TypeScript' content='Gooing gud for now'/>
      <Todo />
    </div>
  )
}

export default App