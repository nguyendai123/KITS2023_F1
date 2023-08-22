import Cookies from "js-cookie";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TailSpin } from "react-loader-spinner";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Input } from "antd";
import "./Home.css";
import { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import RatingBookItem from "../RatingBookItem/RatingBookItem";
import { Button, Modal } from "antd";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items_comments = [
  {
    key: "1",

    children: <p>{text}</p>,
  },
];
const items = [
  {
    label: (
      <a
        className="
    dropdown-item
    d-flex
    justify-content-around
    align-items-center
    fs-7
  "
        href="#"
      >
        Edit Post
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        className="
    dropdown-item
    d-flex
    justify-content-around
    align-items-center
    fs-7
  "
        href="#"
      >
        Delete Post
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const topRatedApiStatuses = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  const [topRatedApiStatus, setTopRatedApiStatus] = useState(
    topRatedApiStatuses.initial
  );
  const [openComment, setOpenComment] = useState(false);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    getTopRatedBooks();
  }, []);

  const getTopRatedBooks = async () => {
    setTopRatedApiStatus(topRatedApiStatuses.inProgress);

    const topRatedBooksApi = "https://apis.ccbp.in/book-hub/top-rated-books";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(topRatedBooksApi, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      const booksList = fetchedData.books;
      const updatedData = booksList.map((eachBook) => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }));
      setTopRatedApiStatus(topRatedApiStatuses.success);
      setTopRatedBooks(updatedData);
    } else {
      setTopRatedApiStatus(topRatedApiStatuses.failure);
    }
  };

  const onClickRetry = () => {
    getTopRatedBooks();
  };

  const onClickFindBooks = () => {
    return navigate("/shelf");
  };

  const RenderSliderSuccessView = () => {
    return (
      <Slider {...settings}>
        {topRatedBooks.map((eachBook) => {
          const { id, title, coverPic, authorName } = eachBook;
          const onClickedTopRatedBook = () => {
            navigate(`/books/${id}`);
          };

          return (
            <div className="top-rated-home-item-container" key={id}>
              <button
                onClick={onClickedTopRatedBook}
                className="top-rated-card-btn"
                type="button"
              >
                <div className="top-rated-home-image-container">
                  <img
                    className="top-rated-home-image"
                    src={coverPic}
                    alt={title}
                  />
                </div>
                <h1 className="top-rated-home-name">{title}</h1>
                <p className="top-rated-home-author">{authorName}</p>
              </button>
            </div>
          );
        })}
      </Slider>
    );
  };

  const RenderSliderProgressView = () => (
    <div className="loader-container">
      <TailSpin color="#8284C7" height={50} width={50} />;
    </div>
  );

  const RenderSliderViewFailure = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading">
        Something Went wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={() => onClickRetry()}
        type="button"
      >
        Try Again
      </button>
    </div>
  );
  const renderSlider = () => {
    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return (
          <>
            <RenderSliderSuccessView />
          </>
        );
      case topRatedApiStatuses.inProgress:
        return (
          <>
            <RenderSliderProgressView />
          </>
        );
      case topRatedApiStatuses.failure:
        return (
          <>
            <RenderSliderViewFailure />
          </>
        );
      default:
        return null;
    }
  };
  const handleClickComment = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      <Header />
      <div className="home-page-container">
        <div className="home-page-left-container">
          <h1 className="home-heading" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          {/* <Input
            style={{ margin: "10px 0" }}
            type="text"
            className="input-home"
            placeholder="Tạo bài viết của bạn"
            onClick={renderNewPost}
          /> */}
          <div className="home-add-newpost bg-white p-3 mt-3 rounded border shadow mb-3">
            {/* avatar */}
            <div className="d-flex" type="button">
              <div className="p-1">
                <img
                  src="https://source.unsplash.com/collection/happy-people"
                  alt="avatar"
                  className="rounded-circle me-2"
                  style={{
                    width: "38px",
                    height: "38px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <button
                className="form-control rounded-pill border-0 pointer pe-auto"
                onClick={() => setOpen(true)}
              >
                <input
                  type="text"
                  role="button"
                  className="input-home-add-post form-control rounded-pill border-0 bg-gray pointer pe-auto"
                  placeholder="What's on your mind, John dai?"
                  data-bs-toggle="modal"
                  data-bs-target="#createModal"
                />
              </button>
              <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
              >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
              </Modal>
            </div>

            <div className="d-flex flex-column flex-lg-row mt-3">
              {/* a 1 */}
              <div
                className="
                      dropdown-item
                      rounded
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                type="button"
              >
                <i className="fas fa-video me-2 text-danger" />
                <p className="m-0 text-muted">Book</p>
              </div>
              {/* a 2 */}
              <div
                className="
                      dropdown-item
                      rounded
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                type="button"
              >
                <i className="fas fa-photo-video me-2 text-success" />
                <p className="m-0 text-muted">Photo/Video</p>
              </div>
              {/* a 3 */}
              <div
                className="
                      dropdown-item
                      rounded
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                type="button"
              >
                <i className="fas fa-smile me-2 text-warning" />
                <p className="m-0 text-muted">Feeling/Activity</p>
              </div>
            </div>
          </div>
          {/* p 1 */}
          <div>
            <PostCard />
            <PostCard />
          </div>
        </div>
        <div className="home-page-right-container">
          <div className="home-top-rated-container">
            <div className="top-rated-heading-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
            </div>
            <div className="home-rating-book">
              <RatingBookItem />
              <RatingBookItem />
              <RatingBookItem />
            </div>
            {/* <div className="slick-container">{renderSlider()}</div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
