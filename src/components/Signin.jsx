import { useSite } from '../context/SiteProvider'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Input } from '@material-tailwind/react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
  const { signIn } = useSite()

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    pass: yup.string().required('Password is required')
  })

  const onLogin = user => {
    signIn(user)
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
            Sign in to your account
          </h2>
        </div>
        <div className='w-full'>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', pass: '' }}
            onSubmit={(values, { resetForm }) => {
              onLogin(values)
              resetForm({ values: '' })
            }}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <form className='mt-8 p-1' action='#' method='POST' onSubmit={handleSubmit}>
                <input type='hidden' name='remember' defaultValue='true' />
                <div className='-space-y-px rounded-md shadow-sm  grid grid-cols-1 grid-rows-1'>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Email address'
                      id='email'
                      name='email'
                      type='text'
                      onChange={handleChange}
                      value={values.email}
                      autoComplete='email'
                    />
                    {errors.email && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a valid email address.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Password'
                      id='pass'
                      name='pass'
                      type='password'
                      onChange={handleChange}
                      value={values.pass}
                    />
                    {errors.pass && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a valid password.
                      </p>
                    )}
                  </label>
                </div>

                <div className='flex items-center justify-between p-5'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-2 block text-sm text-gray-900'
                    >
                      Remember me
                    </label>
                  </div>

                  <div className='text-sm'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Forgot your password?
                    </a>
                  </div>
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
                    Sign in
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

export default Signin
