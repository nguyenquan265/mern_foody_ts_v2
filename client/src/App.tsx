import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout>Home Page</Layout>} />
      <Route path='/user-profile' element={<h1>User profile</h1>} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App
