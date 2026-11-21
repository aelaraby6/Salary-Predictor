import { useState } from 'react'
import Navbar from './components/Navbar'
import PredictPage from './pages/PredictPage'

export default function App() {
  const [activePage, setActivePage] = useState('predict')

  return (
    <div className="min-h-screen bg-cream font-sans text-ink">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {activePage === 'predict' && <PredictPage />}
    </div>
  )
}