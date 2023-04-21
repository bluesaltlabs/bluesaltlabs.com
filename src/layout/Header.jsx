import { NavLink } from 'react-router-dom'
import { navLinks } from '../routes/routes';

function HeaderLink({ to, title, Icon }) {
  return (
    <li title={title}>
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          `block py-2  hover:bg-slate-500/20 dark:hover:bg-slate-50/40 rounded ` +
          `${(isPending ? "bg-gray-500/50 dark:bg-gray-200/50" : isActive ? "bg-slate-500/40 dark:bg-slate-100/20" : "")}`
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
    <div className="lg:w-1/3 xl:1/4 lg:max-w-[350px] w-full flex-shrink flex-grow-0 p-3">
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
          <div className="mx-auto text-xl font-bold tracking-tight xl:text-2xl">
          
            <img
              src="./bluesaltlabs-logo.svg"
              width="100%"
              height="100%"
              alt="BlueSalt Labs Logo"
              title="BlueSalt Labs Logo"
              className="block mx-auto max-w-[120px]"
            />
            <span className=" block mt-4 text-center">BlueSalt Labs</span>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Header;

