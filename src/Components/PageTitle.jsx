
function PageTitle({ className, metaOnly = false, children }) {
  // todo: this could trigger a hook to update the page title too. 
  // todo: hide if metaOnly is true

  return (
    <h1 className={`text-4xl font-bold pb-3 mb-2 text-gray-900 dark:text-gray-50 ${className ?? ''}`}>
      {children}
    </h1>
  )
}

export default PageTitle;