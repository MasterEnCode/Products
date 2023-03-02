import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  Squares2X2Icon,
  XMarkIcon,
  SquaresPlusIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavLink, Outlet } from 'react-router-dom'
import { useSite } from '../context/SiteProvider'
import _ from 'lodash'

const solutions = [
  {
    name: 'New Products',
    description: 'Create a new product and start selling it today.',
    href: '/newProduct',
    icon: SquaresPlusIcon
  },
  {
    name: 'Our Products',
    description: "See our products and choose the one that's right for you.",
    href: '/',
    icon: Squares2X2Icon
  }
]

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const Layout = () => {
  const { user, setUser, products, setFiltered, setProduct } = useSite([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    const productsF = [...products]
    const searcher = _.filter(productsF, (producto) => {
      return producto.product_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    })
    setFiltered(searcher)
  }

  const handleLogout = () => {
    setUser()
    // eslint-disable-next-line no-undef
    localStorage.removeItem('user')
  }

  return (
    <Popover className='isolate  bg-white'>
      <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
        <svg
          className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
          viewBox='0 0 1155 678'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
            fillOpacity='.3'
            d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
          />
          <defs>
            <linearGradient
              id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
              x1='1155.49'
              x2='-78.208'
              y1='.177'
              y2='474.645'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#9089FC' />
              <stop offset={1} stopColor='#FF80B5' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className='mx-auto max-w-10xl'>
        <div className='flex flex-row items-center justify-between border-b-2 bg-white py-6 pl-6'>
          <div className='basis-1/2 justify-start lg:w-0 lg:flex-1'>
            <NavLink to='/' replace>
              <span className='sr-only'>Your Company</span>
              <img
                className='h-8 w-auto sm:h-10'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                alt=''
              />
            </NavLink>
          </div>

          <Popover.Group
            as='nav'
            className='hidden space-x-10 md:flex basis-1/4 mr-5'
          >
            <Popover className='relative'>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-zinc-900',
                      'group inline-flex items-center rounded-md bg-transparent text-base font-medium hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    )}
                  >
                    <span>Product Options</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-zinc-900',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden='true'
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2'>
                      <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                          {user
                            ? (
                                solutions.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className='-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50'
                                    onClick={() => setProduct({})}
                                  >
                                    <NavLink to={item.href} replace />
                                    <item.icon
                                      className='h-6 w-6 flex-shrink-0 text-indigo-600'
                                      aria-hidden='true'
                                    />
                                    <div className='ml-4'>
                                      <p className='text-base font-medium text-gray-900'>
                                        {item.name}
                                      </p>
                                      <p className='mt-1 text-sm text-gray-500'>
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                ))
                              )
                            : (
                              <a
                                key={solutions[1].name}
                                href={solutions[1].href}
                                className='-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50'
                                onClick={() => setProduct({})}
                              >
                                <NavLink to={solutions[1].href} replace />
                                <div className='ml-4'>
                                  <p className='text-base font-medium text-gray-900'>
                                    {solutions[1].name}
                                  </p>
                                  <p className='mt-1 text-sm text-gray-500'>
                                    {solutions[1].description}
                                  </p>
                                </div>
                              </a>
                              )}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          <form className='w-full sm:w-full md:w-full pr-10 lg:w-4/12'>
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only'
            >
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search Mockups, Logos...'
                value={searchTerm}
                onChange={handleChange}
                required
              />
              <button
                type='submit'
                className='text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
              >
                Search
              </button>
            </div>
          </form>

          {/* Burguer menu */}
          <div className='-my-2 -mr-1 md:hidden'>
            <Popover.Button className='inline-flex items-center justify-center rounded-md bg-red p-5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
              <span className='sr-only'>Open menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>
          {!user
            ? (
              <div className='hidden items-center justify-end pr-6 md:flex md:flex-1 lg:w-0'>
                <NavLink
                  to='/signin'
                  replace
                  className='whitespace-nowrap text-base font-medium text-zinc-900 hover:text-gray-900'
                >
                  Sign In
                </NavLink>
                <NavLink
                  to='/signup'
                  replace
                  className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                >
                  Sign Up
                </NavLink>
              </div>
              )
            : (
              <div className='hidden items-center justify-end pr-6 md:flex md:flex-1 lg:w-0'>
                <p className='whitespace-nowrap text-base font-medium text-zinc-900 hover:text-gray-900'>
                  {user.first_name} {user.last_name}
                </p>
                <NavLink
                  to='/'
                  replace
                  onClick={handleLogout}
                  className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                >
                  Log Out
                </NavLink>
              </div>
              )}
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu open state. */}
      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden'
        >
          <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className='px-5 pt-5 pb-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                    alt='Your Company'
                  />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='mt-10'>
                <nav className='grid gap-y-8'>
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-m-3 flex items-center rounded-md p-3 hover:bg-gray-50'
                    >
                      <item.icon
                        className='h-6 w-6 flex-shrink-0 text-indigo-600'
                        aria-hidden='true'
                      />
                      <span className='ml-3 text-base font-medium text-gray-900'>
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className='space-y-6 py-6 px-5'>
              {!user
                ? (
                  <div>
                    <NavLink
                      to='/signup'
                      replace
                      className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                    >
                      Sign up
                    </NavLink>
                    <p className='mt-6 text-center text-base font-medium text-gray-500'>
                      Existing customer?{' '}
                      <NavLink
                        to='/signin'
                        replace
                        className='text-indigo-600 hover:text-indigo-500'
                      >
                        Sign in
                      </NavLink>
                    </p>
                  </div>
                  )
                : (
                  <div>
                    <NavLink
                      to='/'
                      replace
                      onClick={handleLogout}
                      className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                    >
                      Log Out
                    </NavLink>
                    <p className='mt-6 text-center text-base font-medium text-gray-500'>
                      Wellcome{' '}
                      <NavLink
                        to='/signin'
                        replace
                        className='text-indigo-600 hover:text-indigo-500'
                      >
                        {user.first_name} {user.last_name}
                      </NavLink>
                    </p>
                  </div>
                  )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
      <div className='mx-auto'>
        <Outlet />
      </div>
    </Popover>
  )
}

export default Layout
