import { BsFillStarFill, BsFillHeartFill } from "react-icons/bs";
import FavoriteContext from "../../Context/FavoriteContext";
import { useNavigate } from "react-router-dom";

import "./index.css";
import { useContext } from "react";

const BookItem = (props) => {
  let navigate = useNavigate();
  const onClickBookItem = () => {
    const { bookDetails } = props;
    const { id } = bookDetails;
    return navigate(`/books/${id}`);
  };
  const { bookDetails } = props;
  const { id, title, readStatus, rate, authorName, coverPic } = bookDetails;
  const value = useContext(FavoriteContext);
  const { onToggleFavorite, favoriteList } = value;
  const isChecked = favoriteList.find((eachItem) => eachItem.id === id);
  console.log("isCheckedbook item", isChecked);
  const onChangeFavorite = () => {
    console.log("bookdetail", bookDetails);
    onToggleFavorite(bookDetails);
    console.log("favoriteList", favoriteList);
    console.log("onToggleFavorite", onToggleFavorite);
  };
  return (
    <li className="book-item-list-container">
      <div className="book-item-btn">
        <button
          className="book-item-btn"
          onClick={onClickBookItem}
          type="button"
        >
          <img className="book-item-cover-pic" src={coverPic} alt={title} />
        </button>
      </div>
      <div className="book-item-details-card-container">
        <h1 className="book-item-title">{title}</h1>
        <p className="book-item-author-name">{authorName}</p>
        <div className="book-item-avg-rating-container">
          <div className="book-item-avg-rating">Avg Rating</div>
          <BsFillStarFill className="book-item-start-icon" />
          <p className="book-item-rating">{rate}</p>
        </div>
        <p className="book-item-status-heading">
          Status: <span className="book-item-status">{readStatus}</span>
        </p>
        <input
          className="favorite-input"
          onChange={onChangeFavorite}
          id={id}
          isChecked={isChecked}
          type="checkBox"
        />
        <label htmlFor={id}>
          <div className="favorite-container">
            <p className="book-item-status-heading">MyFavorite</p>
            {isChecked ? (
              <BsFillHeartFill className="favorite-icon-selected" />
            ) : (
              <BsFillHeartFill className="favorite-icon" />
            )}
          </div>
        </label>
      </div>
    </li>
  );
};

export default BookItem;
