import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from '../routes/routes';

import PageContent from './PageContent';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <BrowserRouter>
      <div className="flex-row">
        <div className="w-full flex flex-col lg:flex-row flex-grow overflow-hidden">
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
