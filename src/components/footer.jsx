import React from 'react';
import '../Css/footer.css'; // Optional: If you want to add specific styles for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Al-Shara School. All rights reserved.</p>
      <p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
      <p>1234 Al-Shara Road, Kumbakonam, TamilNadu, 612101</p>
    </footer>
  );
};

export default Footer;
