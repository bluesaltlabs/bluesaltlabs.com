

export function PageContent({ children }) {
  return (
    <main role="main" className="w-full flex-grow p-3 overflow-auto">
      {children}
    </main>
  )
}

export default PageContent;
