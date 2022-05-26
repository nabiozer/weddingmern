import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
     
      <div className="footer-container__brand">
      <div className="footer-container__socials">
      <a href="https://www.instagram.com/nnphotofilm/" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i></a>
      <a href="https://api.whatsapp.com/send/?phone=905421132503&text&app_absent=0" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a> 
      </div>
        <p><img src="/assets/UI/mainlogo.jpg" alt="mainlogo"></img></p>
        <p>
          <i className="fa-solid fa-copyright"></i> 2022 Nnphotofilm Tüm Hakları
          Saklıdır.
        </p>
      </div>
      <div className="footer-container__contact">
        <p>0542 113 25 03</p>
        <p>nnphotofilm@nnphotofilm.com</p>
        <p>Beykoz/Istanbul</p>
      </div>
    </footer>
  );
};

export default Footer;
