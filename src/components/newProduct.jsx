import { useSite } from '../context/SiteProvider'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Input } from '@material-tailwind/react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const newProduct = () => {
  const { addProduct } = useSite()

  const navigate = useNavigate()

  const newProductValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    price: yup.string().required('Price is required'),
    category: yup.string().required('Category is required'),
    brand: yup.string().required('Brand is required'),
    image: yup.string().required('Image is required')
  })

  const onCreate = product => {
    addProduct(product)
    navigate('/', { replace: true })
  }

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Create a new Product
          </h2>
        </div>
        <div className='w-full'>
          <Formik
            validationSchema={newProductValidationSchema}
            initialValues={{ name: '', description: '', price: '', category: '', brand: '', image: '' }}
            onSubmit={(values, { resetForm }) => {
              onCreate(values)
              resetForm({ values: '' })
            }}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <form className='mt-8 p-1' action='#' method='POST' onSubmit={handleSubmit}>
                <input type='hidden' name='remember' defaultValue='true' />
                <div className='-space-y-px rounded-md shadow-sm  grid grid-cols-1 grid-rows-6'>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Product Name'
                      id='name'
                      name='name'
                      type='text'
                      onChange={handleChange}
                      value={values.name}
                    />
                    {errors.name && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a product name.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Product Description'
                      id='description'
                      name='description'
                      type='text-area'
                      onChange={handleChange}
                      value={values.description}
                    />
                    {errors.description && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a description.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Product Price'
                      id='price'
                      name='price'
                      type='number'
                      onChange={handleChange}
                      value={values.price}
                    />
                    {errors.price && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a price.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Product Category'
                      id='category'
                      name='category'
                      type='text'
                      onChange={handleChange}
                      value={values.category}
                    />
                    {errors.category && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a category.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Product Brand'
                      id='brand'
                      name='brand'
                      type='text'
                      onChange={handleChange}
                      value={values.brand}
                    />
                    {errors.brand && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a brand.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='URL Product Image'
                      id='image'
                      name='image'
                      type='text'
                      onChange={handleChange}
                      value={values.image}
                    />
                    {errors.image && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a url image.
                      </p>
                    )}
                  </label>
                </div>

                <div className='pt-5'>
                  <button
                    type='submit'
                    className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                      <LockClosedIcon
                        className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                        aria-hidden='true'
                      />
                    </span>
                    Create New Product
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default newProduct
