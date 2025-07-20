import React from "react";
import Policy from "../Policy/Policy";
import "./Footer.css";

const Footer = () => {
  return (
    <React.Fragment>
      <Policy />
      <footer className="footer">
        <div className="subscribe-row">
          <div className="container">
            <div className="footer-row-wrapper">
              <div className="footer-subscribe-wrapper">
                <div className="footer-subscribe">
                  <div className="footer-subscribe-top">
                    <h3 className="subscribe-title">
                      Yeni ürünler, indirimler ve daha fazlası hakkında bilgi
                    almak için <br></br> e-posta abonesi olun.
                    </h3>
                    <p className="subscribe-desc">
                      İlk 500 TL ve üzeri siparişinizde 50 TL indirim sağlayan bir
                    kuponu e-postayla size göndereceğiz.
                    </p>
                  </div>
                  <div className="footer-subscribe-bottom">
                    <form>
                      <input
                        type="text"
                        placeholder="E-posta adresinizi girin"
                      />
                      <button className="btn">Abone Ol</button>
                    </form>
                    <p className="privacy-text">
                      Abone olarak Şartlar & Koşullarımızı ve{" "}
                      <a href="#">
                        Gizlilik & Çerez Politikamızı kabul etmiş olursunuz.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="footer-contact-wrapper">
                <div className="footer-contact-top">
                  <h3 className="contact-title">
                    Yardıma mı ihtiyacınız var? <br />
                    (+90) 123 45 67
                  </h3>
                  <p className="contact-desc">
                    08:00 - 19:00 arası hizmetinizdeyiz.
                  </p>
                </div>
                <div className="footer-contact-bottom">
                  <div className="download-app">
                    <a href="#">
                      <img src="/img/footer/app-store.png" alt="" />
                    </a>
                    <a href="#">
                      <img src="/img/footer/google-play.png" alt="" />
                    </a>
                  </div>
                  <p className="privacy-text">
                    <strong>Alışveriş Uygulaması:</strong> Siparişlerinizi yönetin
                  ve ödeme bilgilerini kaydedin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="widgets-row">
          <div className="container">
            <div className="footer-widgets">
              <div className="brand-info">
                <div className="footer-logo">
                  <a href="index.html" className="logo">
                    CLICK & BUY
                  </a>
                </div>
                <div className="footer-desc">
                  <p>
                    {" "}
                    Keyifli bir alışveriş deneyimi için yanınızdayız.
                  </p>
                </div>
                <div className="footer-contact">
                  <p>
                    <a href="tel:555 555 55 55">(+90) 123 45 67</a> –{" "}
                    <a href="mailto:info@example.com">info@click-buy.com</a>
                  </p>
                </div>
              </div>
              <div className="widget-nav-menu">
                <h4>Bilgi</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Hakkımızda</a>
                  </li>
                  <li>
                    <a href="#">Gizlilik Politikası</a>
                  </li>
                  <li>
                    <a href="#">İade Politikası</a>
                  </li>
                  <li>
                    <a href="#">Kargo Politikası</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Hesabım</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Kontrol Paneli</a>
                  </li>
                  <li>
                    <a href="#">Siparişlerim</a>
                  </li>
                  <li>
                    <a href="#">Favorilerim</a>
                  </li>
                  <li>
                    <a href="#">Hesap Detayları</a>
                  </li>
                  <li>
                    <a href="#">Siparişlerimi Takip Et</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Alışveriş</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Marka</a>
                  </li>
                  <li>
                    <a href="#">Çok Satanlar</a>
                  </li>
                  <li>
                    <a href="#">Fırsat Ürünleri</a>
                  </li>
                  <li>
                    <a href="#">En Yeniler</a>
                  </li>
                  <li>
                    <a href="#">Satış Ürünleri</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Kategoriler</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Kadın</a>
                  </li>
                  <li>
                    <a href="#">Erkek</a>
                  </li>
                  <li>
                    <a href="#">Anne & Çocuk</a>
                  </li>
                  <li>
                    <a href="#">Giyim</a>
                  </li>
                  <li>
                    <a href="#">Ayakkabı</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-row">
          <div className="container">
            <div className="footer-copyright">
              <div className="site-copyright">
                <p>
                  Copyright 2025 © Click & Buy Theme. All right reserved.
                </p>
              </div>
              <a href="#">
                <img src="/img/footer/cards.png" alt="" />
              </a>
              <div className="footer-menu">
                <ul className="footer-menu-list">
                  <li className="list-item">
                    <a href="#">Gizlilik Politikası</a>
                  </li>
                  <li className="list-item">
                    <a href="#">Şartlar ve Koşullar</a>
                  </li>
                  <li className="list-item">
                    <a href="#">İade Politikası</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
