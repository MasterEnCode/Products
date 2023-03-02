import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Layout from '../components/Layout'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import Products from '../components/Products'
import Product from '../components/Product'
import NewProduct from '../components/NewProduct'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Products />} />
      <Route path='product/:id' element={<Product />} />
      <Route path='signup' element={<Signup />} />
      <Route path='signin' element={<Signin />} />
      <Route path='newProduct' element={<NewProduct />} />
    </Route>
  )
)

export default Router
