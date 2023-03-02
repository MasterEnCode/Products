import { useState } from 'react'
import { useSite } from '../context/SiteProvider'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Radio, Input } from '@material-tailwind/react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const { signUp } = useSite([])

  const [type, setType] = useState()
  const [role, setRole] = useState()

  const registerValidationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    birthDate: yup.date().required('Birth Date is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    pass: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPass: yup
      .string()
      .oneOf([yup.ref('pass')], 'Passwords do not match')
      .required('Confirm password is required')
  })

  const onRegister = (user) => {
    if (!type) {
      setType('blank')
    } else if (!role) {
      setRole('blank')
    } else {
      signUp(user, type, role)
      navigate('/signin', { replace: true })
    }
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
            Sign up to our site
          </h2>
        </div>
        <div className='w-full'>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{
              firstName: '',
              lastName: '',
              type: '',
              birthDate: '',
              email: '',
              pass: '',
              confirmPass: ''
            }}
            onSubmit={(values, { resetForm }) => {
              onRegister(values)
              resetForm({ values: '' })
            }}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <form
                className='mt-8 p-1'
                action='#'
                method='POST'
                onSubmit={handleSubmit}
              >
                <input type='hidden' name='remember' defaultValue='true' />
                <div className='-space-y-px rounded-md shadow-sm  grid grid-cols-1 grid-rows-8'>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='First Name'
                      id='firstName'
                      name='firstName'
                      type='text'
                      onChange={handleChange}
                      value={values.firstName}
                      autoComplete='given-name'
                    />

                    {errors.firstName && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a valid First Name.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Last Name'
                      id='lastName'
                      name='lastName'
                      type='text'
                      onChange={handleChange}
                      value={values.lastName}
                      autoComplete='given-name'
                    />
                    {errors.lastName && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a valid Last Name.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <span className='block text-md font-medium text-slate-700 pb-2'>
                      Gender
                    </span>
                    <div className='flex gap-10'>
                      <Radio
                        id='male'
                        name='type'
                        label='Male'
                        onClick={() => setType('M')}
                        ripple
                      />
                      <Radio
                        id='female'
                        name='type'
                        label='Female'
                        onClick={() => setType('F')}
                        ripple
                      />
                    </div>
                    {type === 'blank' && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a type.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Birth Date'
                      id='birthDate'
                      name='birthDate'
                      type='date'
                      onChange={handleChange}
                      value={values.birthDate}
                    />
                    {errors.birthDate && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a valid Birth Date.
                      </p>
                    )}
                  </label>
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
                  <label className='pb-5'>
                    <Input
                      size='lg'
                      color='indigo'
                      variant='standard'
                      label='Confirm Password'
                      id='confirmPass'
                      name='confirmPass'
                      type='password'
                      onChange={handleChange}
                      value={values.confirmPass}
                    />
                    {errors.confirmPass && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a valid password.
                      </p>
                    )}
                  </label>
                  <label className='pb-5'>
                    <span className='block text-md font-medium text-slate-700 pb-2'>
                      Role
                    </span>
                    <div className='flex gap-10'>
                      <Radio
                        id='admin'
                        name='type'
                        label='Admin'
                        onClick={() => setRole('ADMIN')}
                        ripple
                      />
                      <Radio
                        id='customer'
                        name='type'
                        label='Customer'
                        onClick={() => setRole('CUSTOMER')}
                        ripple
                      />
                    </div>
                    {role === 'blank' && (
                      <p className='mt-2 text-pink-600 text-sm'>
                        Please provide a Role.
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
                    Sign Up
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

export default Signup
