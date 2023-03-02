import { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'

const SiteContext = createContext()

export function useSite () {
  return useContext(SiteContext)
}

const SiteProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [product, setProduct] = useState({})

  useEffect(() => {
    axios.get('http://localhost:3000/items')
      .then(function (response) {
        setProducts(response.data)
      })
      .catch(function (error) {
      // handle error
        console.log(error)
      })
  }, [])
  // eslint-disable-next-line no-undef
  const userLogged = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (userLogged) {
      setUser(userLogged)
      console.log(userLogged)
    }
  }, [])

  const signUp = (user, type, role) => {
    axios.post('http://localhost:3000/register', {
      first_name: user.firstName,
      last_name: user.lastName,
      birth_date: user.birthDate,
      gender: type,
      email: user.email,
      password: user.pass,
      role
    }).then(function (response) {

    }).catch(function (error) {
      // handle error
      console.log(error)
    })
  }

  const signIn = (user) => {
    axios.post('http://localhost:3000/login', {
      email: user.email,
      password: user.pass
    }).then(function (response) {
      setUser(response.data.infoUser)
      // eslint-disable-next-line no-undef
      localStorage.setItem('user', JSON.stringify(response.data.infoUser))
    }).catch(function (error) {
      // handle error
      console.log(error)
    })
  }

  const addProduct = (product) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
    axios.post('http://localhost:3000/items', {
      isActive: true,
      product_name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      image: product.image,
      __v: 0
    }, config).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      // handle error
      console.log(error)
    })
  }

  return (
    <SiteContext.Provider
      value={{
        user,
        product,
        products,
        filtered,
        setUser,
        setProduct,
        setFiltered,
        signIn,
        signUp,
        addProduct
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export default SiteProvider
