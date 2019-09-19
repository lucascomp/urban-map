import React, { useState } from 'react';
import SearchBox from '../SearchBox';
import Sidebar from '../Sidebar';

const Menu = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const onMenuClick = () => {
    setShowSidebar(true);
  };

  const onSidebarClose = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <SearchBox onMenuClick={onMenuClick} />
      <Sidebar showSidebar={showSidebar} onClose={onSidebarClose} />
    </>
  );
};

export default Menu;
