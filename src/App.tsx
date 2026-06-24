import { BrowserRouter, Navigate, Route, Routes, useLocation, useMatch, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/home/HomePage'
import PersonalExplorationsPage from './pages/personal-explorations/PersonalExplorationsPage'
import WorkDetailPage from './pages/work-detail/WorkDetailPage'

function WorkDetailRoute() {
  const { slug } = useParams()

  if (slug === 'personal-explorations') {
    return <PersonalExplorationsPage />
  }

  return <WorkDetailPage key={slug} />
}

function AppRoutes() {
  const { hash } = useLocation()
  const isWorkDetailPage = useMatch('/work/:slug')

  useEffect(() => {
    if (!hash) return

    const element = document.getElementById(hash.slice(1))
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <>
      {!isWorkDetailPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<Navigate to="/#work" replace />} />
        <Route path="/work/:slug" element={<WorkDetailRoute />} />
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
