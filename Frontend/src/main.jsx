import React from 'react'
import ReactDOM from "react-dom/client"
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';  // This is where Tailwind is imported
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/user/Profile.jsx'
import AdminRoutes from './pages/admin/AdminRoutes.jsx'
import UserList from './pages/admin/UserList.jsx'
import CategoryList from './pages/admin/CategoryList.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import AllProducts from './pages/admin/AllProducts.jsx'
import UpdateProduct from './pages/admin/UpdateProduct.jsx'
import Home from './pages/Home.jsx'
//import Demo from './pages/test/Demo.jsx'
import Favourites from './pages/Products/Favourites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/user/Cart.jsx'
import Shop from './pages/Shop.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrder.jsx'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import Order from './pages/Orders/Order.jsx'
import MyOrders from './pages/user/MyOrders.jsx'
import OrderList from './pages/admin/OrderList.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    < Route path='/' element= {< App />}  >
      <Route path='/login' element= {< Login />} />
      <Route path='/signup' element= { < Register />} />
      <Route path='/' element = {<Home />} index={true} />
      <Route path='/product/:id' element = {<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/shopping' element={<Shop />} />

      {/* testing route */}
      {/* <Route path='/demo' element={<Demo />} /> */}

      {/*This route will be available only for users who are logged in */}
      <Route path='' element = {< PrivateRoute />}>
        <Route path='/profile' element = {< Profile />} />
        <Route path='/favourite' element={<Favourites />} />
        <Route path='/checkout' element= {<Shipping />} />
        <Route path='/placeOrder' element= {<PlaceOrder />} />
        <Route path='/order/:id' element= {<Order />} />
        <Route path='/orders' element= {<MyOrders />} />
      </Route>

      {/*admin routes */}
      <Route path='/admin' element={<AdminRoutes />}>
      <Route path='userslist' element={<UserList />}/>
      <Route path='categoryList' element={<CategoryList />} />
      <Route path='productlist' element= {<ProductList />} />
      <Route path='allproducts' element= {<AllProducts />} />
      <Route path='updateproduct/:id' element= {<UpdateProduct />} />
      <Route path='orderlist' element= {<OrderList />} />
      <Route path='dashboard' element= {<AdminDashboard />} />
      </Route>

    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
)
