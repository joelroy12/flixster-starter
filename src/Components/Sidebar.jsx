import React from "react";
import "../Components/Sidebar.css";

function Sidebar({ isOpen, onClose, setPage }) {
  if (!isOpen) return null;

  const handleClick = (page) => {
    setPage(page);
    onClose();
  };

  return (
    <>
      <div className="sidebar" onClick={onClose}></div>
      <nav className="sidebar-modal"> 
      <div className="close-button" onClick={onClose}>
        X
        </div>
        <ul>
            <li onClick={() => handleClick("Home")}>Home</li>
            <li onClick={() => handleClick("Favorites")}>Favorites</li>
            <li onClick={() => handleClick("Watched")}>Watched</li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
