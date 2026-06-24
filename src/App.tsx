import { BrowserRouter, Route, Routes, useMatch, useParams } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/home/HomePage'
import PersonalExplorationsPage from './pages/personal-explorations/PersonalExplorationsPage'
import WorkDetailPage from './pages/work-detail/WorkDetailPage'
import WorkPage from './pages/work/WorkPage'

function WorkDetailRoute() {
  const { slug } = useParams()

  if (slug === 'personal-explorations') {
    return <PersonalExplorationsPage />
  }

  return <WorkDetailPage key={slug} />
}

function AppRoutes() {
  const isWorkDetailPage = useMatch('/work/:slug')

  return (
    <>
      {!isWorkDetailPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
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
