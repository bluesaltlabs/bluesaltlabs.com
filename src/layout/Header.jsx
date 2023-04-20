import { NavLink } from 'react-router-dom'

import { navLinks } from '../routes/routes';


// https://codepen.io/ojbravo/pen/npaBdZ

function HeaderLink({ to, title, Icon }) {

  // dark:
    // light:
      // active: blue-100
      // hover: blue-200
      // pending: blue-50
    // dark:
      // active: blue-500
      // hover: blue-600
      // pending: blue-200
  // light:

  return (
    <li title={title}>
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          `block py-2 hover:bg-blue-200 dark:hover:bg-slate-600 rounded ` +
          `${(isPending ? "bg-blue-50 dark:bg-slate-200" : isActive ? "bg-slate-100 dark:bg-slate-500" : "")}`
        }
      >
        <Icon className="w-7 lg:mx-2 mx-4 inline dark:text-white" />
        <span className="hidden lg:inline dark:text-white">{title}</span>
      </NavLink>
    </li>
  )
}

function Header() {
  return (
    <div className="lg:w-1/3 xl:1/4 w-full flex-shrink flex-grow-0 p-3">
      <div className="sticky top-0 p-3 bg-gray-100 dark:bg-gray-900 w-full rounded">
        <ul className="flex lg:flex-col overflow-hidden content-center justify-between">

          {navLinks.map((link, index) => (
            <HeaderLink
              key={index} to={link.to} title={link.title} Icon={link.Icon}
            />
          ))}

        </ul>
      </div>

      <div className="hidden lg:block bg-gray-50 dark:bg-gray-900 text-blue-500 rounded my-3 w-full">
        <div className="max-w-7xl mx-auto py-8 px-4 lg:px-6 xl:py-12 xl:px-8 xl:flex xl:items-center xl:justify-between">
          <div className="mx-auto text-3xl font-extrabold tracking-tight xl:text-4xl">
          
            <img
              src="./bluesaltlabs-logo.svg"
              width="100%"
              height="100%"
              alt="BlueSalt Labs Logo"
              title="BlueSalt Labs Logo"
              className="block mx-auto"
            />
            <span className=" block mt-4 text-center">BlueSalt Labs</span>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Header;

