
function PageSubtitle({ className, metaOnly = false, children }) {
  // todo: this could trigger a hook to update the page title too. 
  // todo: hide if metaOnly is true

  return (
    <h2 className={`text-xl pb-3 text-slate-900/80 dark:text-slate-50/60 ${className ?? ''}`}>
      {children}
    </h2>
  )
}

export default PageSubtitle;