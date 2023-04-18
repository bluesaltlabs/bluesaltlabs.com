import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { routes } from '../routes/routes';

import PageContent from './PageContent';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <BrowserRouter>
      <div className="flex-row h-full">
        <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
          <Header />
        
          <PageContent>
            <Routes>
              { Object.keys(routes).map((route, index) => (
                <Route key={index} path={routes[route].path} element={routes[route].element} />
              ))}
            </Routes>
          </PageContent>

        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default Layout;
