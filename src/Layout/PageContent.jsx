

export function PageContent({ children }) {
  return (
    <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  )
}

export default PageContent;
