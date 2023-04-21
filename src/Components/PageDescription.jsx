
function PageDescription({ className, metaOnly = false, children }) {
  // todo: this could trigger a hook to update the page description too. 
  // todo: hide if metaOnly is true

  return (
    <div className={`text-lg p-1 pb-2 text-slate-800/80 dark:text-slate-50/90 ${className ?? ''}`}>
      {children}
    </div>
  )
}

export default PageDescription;