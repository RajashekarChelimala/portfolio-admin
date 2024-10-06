import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const BaseLayout = () => {
  return (
    <>
      <Header />
      <div style={{marginTop:'150px',marginBottom:'150px'}}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
