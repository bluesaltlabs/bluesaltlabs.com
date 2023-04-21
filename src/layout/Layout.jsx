import {
  Outlet,
} from "react-router-dom";

import PageContent from './PageContent';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex-row">
      <div className="w-full flex flex-col lg:flex-row flex-grow overflow-hidden">
        <Header />
      
        <PageContent>
          <Outlet />
        </PageContent>

      </div>

      <Footer />
    </div>
  );
}

export default Layout;
