import { BrowserRouter, Navigate, Route, Routes, useLocation, useMatch, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/home/HomePage'
import PersonalExplorationsPage from './pages/personal-explorations/PersonalExplorationsPage'
import WorkDetailPage from './pages/work-detail/WorkDetailPage'
import WritingDetailPage from './pages/writing/WritingDetailPage'

function WorkDetailRoute() {
  const { slug } = useParams()

  if (slug === 'personal-explorations') {
    return <PersonalExplorationsPage />
  }

  return <WorkDetailPage key={slug} />
}

function AppRoutes() {
  const { hash, pathname } = useLocation()
  const isWorkDetailPage = useMatch('/work/:slug')
  const isWritingPage = useMatch('/writing/:id')
  const hideNav = Boolean(isWorkDetailPage || isWritingPage)

  useEffect(() => {
    if (!hash) return

    const element = document.getElementById(hash.slice(1))
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0 })
  }, [hash, pathname])

  return (
    <div className={`app-shell${hideNav ? '' : ' app-shell--with-nav'}`}>
      {!hideNav && <Navbar />}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<Navigate to="/#work" replace />} />
          <Route path="/work/:slug" element={<WorkDetailRoute />} />
          <Route path="/writing/:id" element={<WritingDetailPage />} />
        </Routes>
      </div>
    </div>
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
