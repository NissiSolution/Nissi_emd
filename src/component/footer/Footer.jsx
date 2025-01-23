import React from 'react'
import './Footer.css'
export default function Footer() {
  function getCurrentYear() {
    const currentDate = new Date(); // Create a new Date object
    return currentDate.getFullYear(); // Return the current year
  }
  
  // Usage
  const year = getCurrentYear()
  return (
    <footer className="footer">
    <p>@{year} Nissi Engineering Solution Pvt. Ltd.</p>
  </footer>
  )
}
