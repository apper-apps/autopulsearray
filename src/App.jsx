import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import CarDetailPage from '@/components/pages/CarDetailPage'
import ChatRoomsPage from '@/components/pages/ChatRoomsPage'
import ChatRoomPage from '@/components/pages/ChatRoomPage'
import ComparePage from '@/components/pages/ComparePage'
import NewsPage from '@/components/pages/NewsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-950">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
            <Route path="/chat" element={<ChatRoomsPage />} />
            <Route path="/chat/:roomId" element={<ChatRoomPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  )
}

export default App