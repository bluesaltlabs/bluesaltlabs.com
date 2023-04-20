
function PageTitle({ className, metaOnly = true, children }) {
  // todo: this could trigger a hook to update the page title too. 
  // todo: hide if metaOnly is true

  return (
    <h1 className={`text-4xl font-bold text-gray-900 dark:text-gray-100 ${className ?? ''}`}>
      {children}
    </h1>
  )
}

export default PageTitle;