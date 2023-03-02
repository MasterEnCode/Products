import { useSite } from '../context/SiteProvider'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

const Products = () => {
  const { products, filtered, setProduct } = useSite()
  const navigate = useNavigate()

  const handleProduct = (product) => {
    setProduct(product)
    navigate(`/product/${product.id}`, { replace: true })
  }

  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 px-10 mb-5 mt-5'>
        {filtered.length === 0
          ? _.map(products, (product, index) => (
            <div
              className='w-full p-4 text-center bg-white border border-gray-200 rounded-2xl shadow sm:p-8 hover:shadow-lg'
              key={index}
            >
              <h5 className='mb-2 text-3xl font-bold text-gray-900 '>
                {product.product_name}
              </h5>
              <div className='items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
                <div className='pt-4 pb-2'>
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    {product.category}
                  </span>
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    {product.brand}
                  </span>
                </div>
              </div>
              <div className='p-5'>
                <button
                  onClick={() => handleProduct(product)}
                  className='text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-5 text-center bg-indigo-600 shadow-sm hover:bg-indigo-700'
                >
                  See Detaiils
                </button>
              </div>
            </div>
          ))
          : _.map(filtered, (product, index) => (
            <div
              className='w-full p-4 text-center bg-white border border-gray-200 rounded-2xl  shadow sm:p-8 '
              key={index}
              onClick={() => handleProduct(product)}
            >
              <h5 className='mb-2 text-3xl font-bold text-gray-900 '>
                {product.product_name}
              </h5>
              <div className='items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
                <div className='pt-4 pb-2'>
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    {product.category}
                  </span>
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    {product.brand}
                  </span>
                </div>
              </div>
              <div className='p-5'>
                <button
                  onClick={() => handleProduct(product)}
                  className='text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-5 text-center bg-indigo-600 shadow-sm hover:bg-indigo-700'
                >
                  See Detaiils
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Products
