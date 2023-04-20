

function PageSection({ className, children }) {
  return (
    <section className={`bg-gray-100 dark:bg-gray-900 mb-4 rounded ${className ?? ''}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

export default PageSection;
