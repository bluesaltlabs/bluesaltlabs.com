
function PageDescription({ className, metaOnly = false, children }) {
  // todo: this could trigger a hook to update the page description too. 
  // todo: hide if metaOnly is true

  return (
    <div className={`text-lg p-1 pb-2 text-gray-300 dark:text-grey-700 ${className ?? ''}`}>
      {children}
    </div>
  )
}

export default PageDescription;