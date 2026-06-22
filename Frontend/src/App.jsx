import { useState } from 'react'
import Components from './index.js'
import { Route , Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route
          path='/'
          element= {<Components.GetStarted />}  
        />
        <Route 
          path='/signup'
          element= {<Components.Signup />}
        />
        <Route 
          path='/login'
          element= {<Components.Login />}
        />
        <Route 
          path='/profile'
          element= {<Components.Profile />}
        />

        <Route 
          path='/home'
          element= {<Components.Home />}
        />

        <Route 
          path='/search'
          element= {<Components.Search />}
        />

        <Route 
          path='/clubs_public'
          element= {<Components.Clubs_Public />}
        />

      </Routes>
      
    </>
  )
}

export default App
