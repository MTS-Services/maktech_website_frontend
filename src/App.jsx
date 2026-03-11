import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './route/router';

function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme='light'
        style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}
      />
    </Router>
  );
}

export default App;
