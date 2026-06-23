import { BrowserRouter, Route, Routes, useMatch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/home/HomePage'
import WorkDetailPage from './pages/work-detail/WorkDetailPage'
import WorkPage from './pages/work/WorkPage'

function AppRoutes() {
  const isWorkDetailPage = useMatch('/work/:slug')

  return (
    <>
      {!isWorkDetailPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<WorkDetailPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
