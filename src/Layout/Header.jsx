import { Link } from 'react-router-dom'


import {
  HomeIcon,
  IdentificationIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  BriefcaseIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'

function HeaderLink({ to, title, Icon }) {

  return (
    <li className="py-2 hover:bg-indigo-300 rounded">
      <Link to={to}>
      <div>
        <Icon className="w-7 sm:mx-2 mx-4 inline" />
        <span className="hidden sm:inline">{title}</span>
      </div>
      </Link>
    </li>
  )
}

function Header() {
  return (
    <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
      <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
        <ul className="flex sm:flex-col overflow-hidden content-center justify-between">

          {/* todo: add active class when page is navigated to.  */}
          <HeaderLink to="/" title="Home" Icon={HomeIcon} />
          <HeaderLink to="/about" title="About" Icon={IdentificationIcon} />
          <HeaderLink to="/blog" title="Blog" Icon={NewspaperIcon} />
          <HeaderLink to="/projects" title="Projects" Icon={CommandLineIcon} />
          <HeaderLink to="/resume" title="Resume" Icon={BriefcaseIcon} />
          <HeaderLink to="/contact" title="Contact" Icon={ChatBubbleLeftRightIcon} />
          
        </ul>
      </div>
      <div className="bg-gray-50 rounded-xl border my-3 w-full">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-indigo-600 overflow-ellipsis">
              {/* todo: bluesalt labs logo svg. get from other project? */}
              BlueSaltLabs
            </span>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Header;

