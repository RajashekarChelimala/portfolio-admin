import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const BaseLayout = () => {
  return (
    <>
      <Header />
      <div className="my-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
