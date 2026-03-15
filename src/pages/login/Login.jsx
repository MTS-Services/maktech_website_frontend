/**
 * Demo Login Page Component
 * 
 * This is a demonstration login page that displays:
 * - Demo credentials prominently for testing
 * - Login form UI (non-functional for demo purposes)
 * - Navigation button to admin dashboard
 * 
 * Purpose:
 * This page serves as the entry point to the admin dashboard.
 * In production, this would include actual authentication logic.
 * 
 * Demo Credentials:
 * - Email: admin@test.com
 * - Password: 123
 */

import { useNavigate } from 'react-router-dom'
import { MdLogin } from 'react-icons/md'

const Login = () => {
  const navigate = useNavigate()

  /**
   * Handle demo login navigation
   * In production, this would validate credentials and authenticate
   */
  const handleLogin = () => {
    // Navigate to admin dashboard
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-bg-cta rounded-full mb-4">
              <MdLogin className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">
              MakTech Dashboard Access
            </p>
          </div>

          {/* Demo Credentials Card */}
          <div className="bg-orange-50 border-l-4 border-orange-bg-cta p-4 mb-6 rounded">
            <div className="flex items-start">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-orange-bg-cta" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800 mb-2">
                  Demo Credentials
                </h3>
                <div className="text-sm text-orange-700 space-y-1">
                  <p><strong>Email:</strong> admin@test.com</p>
                  <p><strong>Password:</strong> 123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form (Demo - Non-functional) */}
          <div className="space-y-4 mb-6">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="admin@test.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-bg-cta focus:border-transparent transition-all"
                defaultValue="admin@test.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-bg-cta focus:border-transparent transition-all"
                defaultValue="123"
              />
            </div>
          </div>

          {/* Continue to Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-orange-bg-cta text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <MdLogin className="text-xl" />
            Continue to Login
          </button>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>This is a demo login page.</p>
            <p className="mt-1">Click the button above to access the dashboard.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white text-sm">
          <p>© 2024 MakTech. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
