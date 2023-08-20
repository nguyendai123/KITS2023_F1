import { Link, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";

import "./Header.css";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Header = ({ page }) => {
  const [displayNavbar, setDisplayNavbar] = useState(false);
  let navigate = useNavigate();
  const onClickMenu = () => {
    setDisplayNavbar(!displayNavbar);
  };

  const onClickCross = () => {
    setDisplayNavbar(false);
  };

  const onClickLogout = () => {
    console.log("logout");
    Cookies.remove("jwt_token");
    return navigate("/login");
  };

  const onClickWebSiteLogo = () => {
    return navigate("/");
  };

  // eslint-disable-next-line react/prop-types
  const { home, shelves, favorite } = page;
  const activeHome = home ? "active-tab" : "";
  const activeShelves = shelves ? "active-tab" : "";
  const activeFavorite = favorite ? "active-tab" : "";

  return (
    <div>
      <div className="header-container">
        <div className="header-website-logo1">
          <Link to="/">
            <>
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
                alt="website logo"
                onClick={onClickWebSiteLogo}
              />
            </>
          </Link>
        </div>
        <ul className="tabs-container">
          <Link className="link" to="/">
            <li className={`list-item  ${activeHome}`}>Home</li>
          </Link>
          <Link className="link" to="/shelf">
            <li className={`list-item ${activeShelves}`}>Bookshelves</li>
          </Link>
          <Link className="link" to="/favorites">
            <li className={`list-item ${activeFavorite}`}>MyFavorites</li>
          </Link>
          <li className="list-item">
            <button
              onClick={onClickLogout}
              className="logout-btn"
              type="button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="header-navbar-responsive-container">
        <div className="header-nav-container">
          <Link to="/">
            <img
              className="header-nav-bar-website-logo"
              src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
              alt="website logo"
              onClick={onClickWebSiteLogo}
            />
          </Link>
          <button
            onClick={onClickMenu}
            className="cross-icon-btn"
            type="button"
          >
            <FiMenu className="menu-icon" />
          </button>
        </div>
        {displayNavbar && (
          <>
            <div className="header-navbar-tabs-container">
              <Link className="link" to="/">
                <h1 className={`list-item home-tab ${activeHome}`}>Home</h1>
              </Link>
              <Link className="link" to="/shelf">
                <h1 className={`bookshelves-tab ${activeShelves}`}>
                  BookShelves
                </h1>
              </Link>
              <Link className="link" to="/favorites">
                <h1 className={`bookshelves-tab ${activeFavorite}`}>
                  MyFavorites
                </h1>
              </Link>
            </div>
            <div className="header-navbar-tabs-container">
              <button
                onClick={onClickLogout}
                className="logout-btn"
                type="button"
              >
                Logout
              </button>
              <button
                onClick={onClickCross}
                className="cross-icon-btn"
                type="button"
              >
                <RiCloseCircleFill className="cross-icon" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
