import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/home/HomePage'
import WorkDetailPage from './pages/work-detail/WorkDetailPage'
import WorkPage from './pages/work/WorkPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<WorkDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
