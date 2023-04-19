
function PageTitle({ metaOnly = true, children }) {
  // todo: this could trigger a hook to update the page title too. 
  // todo: hide if metaOnly is true

  return (
    <h1 className="text-4xl font-bold text-gray-100 dark:text-grey-900">{children}</h1>
  )
}

export default PageTitle;