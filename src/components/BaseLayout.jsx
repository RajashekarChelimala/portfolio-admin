import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from '../ui-elements/ScrollToTopButton';
import AIChatWidget from './AIChatWidget';

const BaseLayout = () => {
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
