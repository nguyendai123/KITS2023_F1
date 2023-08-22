import React from "react";
import bookimage from "../../assets/bookimage.svg";
import star from "../../assets/Star01.svg";
function RatingBookItem() {
  return (
    <div className="rating-book-item">
      <div className="number-book-item">01</div>
      <img src={bookimage} alt="" className="home-book-image-rating" />
      <div className="home-book-rating-content">
        <div className="home-book-rating-des">
          <div className="home-book-rating-name">Borrowed Magic</div>
          <div className="home-book-rating-author">Stephanie Foxe</div>
        </div>
        <div className="home-book-rating-star">
          <img src={star} alt="star" className="star-rating" />
          <img src={star} alt="star" className="star-rating" />
          <img src={star} alt="star" className="star-rating" />
          <img src={star} alt="star" className="star-rating" />
          <img src={star} alt="star" className="star-rating" />
        </div>
      </div>
    </div>
  );
}

export default RatingBookItem;
