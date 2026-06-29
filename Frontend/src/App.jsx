import { useState } from 'react'
import Components from './index.js'
import { Route, Routes } from 'react-router-dom'
import PublicRoute from './Components/PublicRoute.jsx'
import PrivateRoute from './Components/PrivateRoute.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<PublicRoute><Components.GetStarted /></PublicRoute>}
        />
        <Route
          path='/signup'
          element={<PublicRoute><Components.Signup /></PublicRoute>}
        />
        <Route
          path='/login'
          element={<PublicRoute><Components.Login /></PublicRoute>}
        />
        <Route path="/profile" element={<PrivateRoute><Components.ProfileLayout /></PrivateRoute>}>
          <Route index element={<Components.Stats />} />
          <Route path="stats" element={<Components.Stats />} />
          <Route path="lists" element={<Components.Lists />} />
          <Route path="reviews" element={<Components.Reviews />} />
          <Route path="clubs" element={<Components.Clubs />} />
        </Route>

        <Route
          path='/home'
          element={<PrivateRoute><Components.Home /></PrivateRoute>}
        />

        <Route
          path='/search'
          element={<PrivateRoute><Components.Search /></PrivateRoute>}
        />

        <Route
          path='/clubs_public'
          element={<PrivateRoute><Components.Clubs_Public /></PrivateRoute>}
        />

      </Routes>

    </>
  )
}

export default App
