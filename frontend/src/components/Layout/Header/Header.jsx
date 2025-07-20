import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../../../context/CartProvider';
import './Header.css';

const Header = ({ setIsSearchShow }) => {
  const { cartItems } = useContext(CartContext);
  const user = localStorage.getItem('user');
  const { pathname } = useLocation();

  // 👇 dropdown aç/kapat için state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header>
      <div className="global-notification">
        <div className="container">
          <p>
            TÜM ÜRÜNLER İÇİN YAZ İNDİRİMİ VE ÜCRETSİZ TESLİMAT - %70'E VARAN İNDİRİM! ŞİMDİ
            <a href="shop.html"> ALIŞVERİŞ YAPIN</a>
          </p>
        </div>
      </div>

      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>

            <div className="header-left">
              <Link to="/" className="logo">
                CLICK & BUY
              </Link>
            </div>

            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <Link to="/" className={`menu-link ${pathname === '/' && 'active'}`}>
                      ANASAYFA
                    </Link>
                  </li>

                  <li className="menu-list-item megamenu-wrapper">
                    <Link to="/shop" className={`menu-link ${pathname === '/shop' && 'active'}`}>
                      TÜM KATEGORİLER
                      <i className="bi bi-chevron-down"></i>
                    </Link>

                    <div className="menu-dropdown-wrapper">
                      <div className="menu-dropdown-megamenu">
                        <div className="megamenu-links">
                          <div className="megamenu-products">
                            <h3 className="megamenu-products-title">Kadın</h3>
                            <ul className="megamenu-menu-list">
                              <li><a href="#">Giyim</a></li>
                              <li><a href="#">Ayakkabı</a></li>
                              <li><a href="#">Aksesuar</a></li>
                              <li><a href="#">Çanta</a></li>
                              <li><a href="#">İç Giyim</a></li>
                              <li><a href="#">Kozmetik</a></li>
                              <li><a href="#">Spor & Outdoor</a></li>
                            </ul>
                          </div>

                          <div className="megamenu-products">
                            <h3 className="megamenu-products-title">Erkek</h3>
                            <ul className="megamenu-menu-list">
                              <li><a href="#">Giyim</a></li>
                              <li><a href="#">Ayakkabı</a></li>
                              <li><a href="#">Kişisel Bakım</a></li>
                              <li><a href="#">Çanta</a></li>
                            </ul>
                          </div>

                          <div className="megamenu-products">
                            <h3 className="megamenu-products-title">Anne & Çocuk</h3>
                            <ul className="megamenu-menu-list">
                              <li><a href="#">Bebek</a></li>
                              <li><a href="#">Kız Çocuk</a></li>
                              <li><a href="#">Erkek Çocuk</a></li>
                              <li><a href="#">Bebek Bakım</a></li>
                              <li><a href="#">Oyuncak</a></li>
                              <li><a href="#">Beslenme-Emzirme</a></li>
                            </ul>
                          </div>
                        </div>

                        <div className="megamenu-single">
                          <a href="#"><img src="/img/mega-menu.jpg" alt="" width="300" /></a>
                          <h3 className="megamenu-single-title">Elite Üye Olun</h3>
                          <h4 className="megamenu-single-subtitle">Birçok Ayrıcalıktan Yararlanın</h4>
                          <a href="#" className="megamenu-single-button btn btn-sm">Alışveriş Yapın</a>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="menu-list-item">
                    <Link to="/contact" className={`menu-link ${pathname === '/contact' && 'active'}`}>
                      İLETİŞİM
                    </Link>
                  </li>
                </ul>
              </nav>

              <i className="bi-x-circle" id="close-sidebar"></i>
            </div>

            <div className="header-right">
              <div className="header-right-links">
                <div 
                  className="dropdown-wrapper"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link to="/auth" className="header-account">
                    <i className="bi bi-person"></i>
                  </Link>

                  {isDropdownOpen && (
                    <div className="account-dropdown">
                      <ul className="account-dropdown-list">
                        <li><Link to="/account">Giriş</Link></li>
                        <li><Link to="/personal">Hesabım</Link></li>
                        <li><Link to="/order">Geçmiş Siparişlerim</Link></li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <button className="search-button" onClick={() => setIsSearchShow(true)}>
                <i className="bi bi-search"></i>
              </button>

              <div className="header-cart">
                <Link to="/cart" className="header-cart-link">
                  <i className="bi bi-bag"></i>
                  <span className="header-cart-count">{cartItems.length}</span>
                </Link>
              </div>

              {user && (
                <button
                  className="search-button"
                  onClick={() => {
                    if (window.confirm('Çıkış yapmak istediğinize emin misiniz?')) {
                      localStorage.removeItem('user');
                      window.location.href = '/';
                    }
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  setIsSearchShow: PropTypes.func,
};

export default Header;
