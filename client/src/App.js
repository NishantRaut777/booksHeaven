import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';

import Mycart from './pages/Mycart/Mycart';
import SingleBook from './pages/SingleBook/SingleBook';
import Search from './pages/Search/Search';
import Checkout from './pages/Checkout/Checkout';
import Myprofile from './pages/Myprofile/Myprofile';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import CategoryBooks2 from './pages/CategoryBooks2/CategoryBooks2';
import AuthorBooks from './pages/AuthorBooks/AuthorBooks';
import VerifyOtp from './pages/VerifyOtp/VerifyOtp';
import ResendOTP from './pages/ResendOTP/ResendOTP';


const queryClient = new QueryClient()

function App() {
  return (
   <>
    <QueryClientProvider client={queryClient}>

    
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path='/verify-otp' element={<VerifyOtp />}  />
          <Route path='/resendOtp' element={<ResendOTP /> } />

          <Route path='/verify' element={<VerifyEmail />} />

          <Route 
            path='/'
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />

          <Route 
            path='/mycart'
            element={
              <ProtectedRoute>
                <Mycart />
              </ProtectedRoute>
            }
          />

          <Route 
            path='/category-books'
            element={
              <CategoryBooks2 />
            }
          />

          <Route 
            path='/checkout'
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route 
            path='/book/:bookId'
            element={
              <SingleBook />
            }
          />

          <Route 
            path='/booksSearch'
            element={
              <Search />
            }
          />

          <Route 
            path='/myprofile'
            element={
              <Myprofile />
            }
          />

          <Route 
            path='/authorBooks'
            element={
              <AuthorBooks />
            }
          />

        </Routes>
      </Router>

    <ReactQueryDevtools initialIsOpen={false} />
    
    </QueryClientProvider>
   </>
  );
}

export default App;