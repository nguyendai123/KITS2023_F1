import { Link, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";
import { Input, Space, Menu } from "antd";
const { Search } = Input;
import "./Header.css";
import { useState } from "react";
const items = [
  {
    label: (
      <Link className="link" to="/">
        Home
      </Link>
    ),
    key: "home",
  },
  {
    label: (
      <Link className="link" to="/rating">
        Ratings
      </Link>
    ),
    key: "rating",
  },
  {
    label: (
      <Link className="link" to="/shelf">
        Bookshelves
      </Link>
    ),
    key: "shelf",
  },
  {
    label: (
      <Link className="link" to="/genres">
        Genres
      </Link>
    ),
    key: "genres",
  },
  {
    label: (
      <Link className="link" to="/favorites">
        MyFavorites
      </Link>
    ),
    key: "favorites",
  },
  {
    label: (
      <Link className="link" to="/authors">
        Authors
      </Link>
    ),
    key: "authors",
  },
  {
    label: (
      <Link className="link" to="/group">
        Group
      </Link>
    ),
    key: "group",
  },
];
// eslint-disable-next-line react/prop-types
const Header = () => {
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
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

  return (
    <div>
      <div
        className="header-container"
        style={{ display: "flex", alignItems: "center" }}
      >
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
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          style={{ maxWidth: "350px" }}
        />

        <Menu
          style={{
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />

        <button onClick={onClickLogout} className="logout-btn" type="button">
          Logout
        </button>
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
                <h1 className={`list-item home-tab`}>Home</h1>
              </Link>
              <Link className="link" to="/shelf">
                <h1 className={`bookshelves-tab`}>BookShelves</h1>
              </Link>
              <Link className="link" to="/favorites">
                <h1 className={`bookshelves-tab`}>MyFavorites</h1>
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
