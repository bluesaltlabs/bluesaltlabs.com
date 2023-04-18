

export function PageSection({ children }) {
  return (
    <div className="bg-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}

export default PageSection;
