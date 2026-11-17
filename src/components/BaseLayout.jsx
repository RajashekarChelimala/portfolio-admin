import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from '../ui-elements/ScrollToTopButton';
import AIChatWidget from './AIChatWidget';
import { trackPageView } from '../utils/visitorTracker';

const BaseLayout = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <AIChatWidget />
    </div>
  );
};

export default BaseLayout;
