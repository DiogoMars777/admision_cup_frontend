import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000, style: { background: '#333', color: '#fff', borderRadius: '10px', fontSize: '14px', padding: '12px' } }} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
