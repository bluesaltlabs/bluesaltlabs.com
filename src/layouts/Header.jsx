import { NavLink } from 'react-router-dom'

import { navLinks } from '../routes/routes';


// https://codepen.io/ojbravo/pen/npaBdZ

function HeaderLink({ to, title, Icon }) {

  return (
    <li title={title}>
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          `block py-2 hover:bg-indigo-300 rounded ` +
          `${(isPending ? "bg-indigo-100" : isActive ? "bg-indigo-200" : "")}`
        }
      >
        <Icon className="w-7 lg:mx-2 mx-4 inline" />
        <span className="hidden lg:inline">{title}</span>
      </NavLink>
    </li>
  )
}

function Header() {
  return (
    <div className="lg:w-1/3 xl:1/4 w-full flex-shrink flex-grow-0 p-4">
      <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
        <ul className="flex lg:flex-col overflow-hidden content-center justify-between">

          {navLinks.map((link, index) => (
            <HeaderLink
              key={index} to={link.to} title={link.title} Icon={link.Icon}
            />
          ))}

        </ul>
      </div>
{/* 
      <div className="bg-gray-50 rounded-xl border my-3 w-full">
        <div className="max-w-7xl mx-auto py-8 px-4 lg:px-6 xl:py-12 xl:px-8 xl:flex xl:items-center xl:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 xl:text-4xl">
            <span className="block text-indigo-600 overflow-ellipsis">
              {/ * todo: bluesalt labs logo svg. get from other project? * /}
              BlueSaltLabs
            </span>
          </h2>
        </div>
      </div>
*/}
    </div>
  )
}

export default Header;

