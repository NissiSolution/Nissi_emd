import React from 'react'
import './Burger.css'
export default function Burger({isOpen}) {
  return (
    <div>
      <div className="hamburger">
        <div className="burger burger1"></div>
        <div className="burger burger2"></div>
        <div className="burger burger3"></div>
      </div>
      <style jsx>
        {`
          .burger1 {
            transform-origin: 0% 0%;
            transition: transform 0.4s ease-in-out;
            transform: ${isOpen ? "rotate(45deg)" : "rotate(0)"};
          }
          .burger2 {
            transition: transform 0.2s ease-in-out;
            transform: ${isOpen ? "translateX(100%)" : "translateX(0)"};
            opacity: ${isOpen ? 0 : 1};
          }
          .burger3 {
            transform-origin: 0% 100%;
            transition: transform 0.4s ease-in-out;
            transform: ${isOpen ? "rotate(-45deg)" : "rotate(0)"};
          }
        `}
      </style>
    </div>
  );
}
