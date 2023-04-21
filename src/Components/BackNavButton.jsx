import { NavLink } from "react-router-dom";

function BackNavButton({ to, className, children, ...rest}) {

  return (
    <NavLink
      to={to}
      className={`inline-block px-3 py-1 mb-2 text-sm text-semibold text-gray-50 bg-slate-500/70 dark:bg-slate-200/30 hover:bg-slate-500/50 hover:dark:bg-slate-200/60 rounded shadow hover:shadow-md hover:dark:shadow-lg ${className ?? ''}`}
      {...rest}
    >
      {children}
    </NavLink>
  )
}

export default BackNavButton;
