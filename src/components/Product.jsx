import { useSite } from '../context/SiteProvider'

const Product = () => {
  const { user, product } = useSite()
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='grid grid-rows-2 md:grid-cols-4 gap-4 mt-32 w-3/4 p-4 bg-white border border-gray-200 rounded-lg shadow'>
          <div className='sm:col-span-4 md:col-span-4 lg:col-span-1 row-span-2 lg:-mt-14 lg:-ml-52'>
            <img className='rounded-3xl lg:rounded-full border-l-8 border-purple-900' src={product.image} />
          </div>
          <div className='sm:col-span-4 md:col-span-4 lg:col-span-3 m-auto'>
            <h5 className='align-middle mb-2 text-5xl lg:text-7xl font-bold text-gray-900'>
              {product.product_name}
            </h5>
          </div>
          <div className=' sm:col-span-4 md:col-span-3'>
            <p className='mb-5 text-base text-gray-500 sm:text-lg lg:text-2xl text-center '>
              {product.description}
            </p>
            <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4 justify-around'>
              <div className='pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  {product.category}
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  {product.brand}
                </span>
              </div>
            </div>
            <div className='flex items-center justify-around pt-5'>
              <span className='text-3xl font-bold text-gray-900'>
                ${product.price}
              </span>
              {user && (
                <a
                  href='#'
                  className='text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-20 py-5 text-center bg-indigo-600 shadow-sm hover:bg-indigo-700'
                >
                  Add to cart
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
