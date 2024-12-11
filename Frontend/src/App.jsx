import {Outlet} from "react-router-dom"
import Navigation from "./pages/auth/Navigation.jsx"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/Footer.jsx";


function App() {

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <ToastContainer   
        position="top-center" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover  />
      <Navigation />
      <main className="flex-grow py-3" >
        <Outlet />
      </main>
      <Footer />
      </div>
    </>
  )
}

export default App
