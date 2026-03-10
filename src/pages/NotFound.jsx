import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the page you're looking for.</p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-black-bg-cta text-white rounded-lg font-medium shadow-sm hover:opacity-90 transition"
          >
            Go to Login
          </button>

          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
