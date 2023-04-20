
function PageDescription({ metaOnly = false, children }) {
  // todo: this could trigger a hook to update the page description too. 
  // todo: hide if metaOnly is true

  return (
    <p className="text-lg pt-2 pb-3 px-1 text-gray-200 dark:text-grey-800">{children}</p>
  )
}

export default PageDescription;