import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { BsSearch } from "react-icons/bs";

import Header from "../Header/Header";

import Footer from "../Footer/Footer";
import BookItem from "../BookItem";

import "./index.css";
import { useEffect, useState } from "react";
import { Button, Input, Space } from "antd";
import Item from "antd/es/list/Item";

const bookshelvesList = [
  {
    id: "22526c8e-680e-4419-a041-b05cc239ece4",
    value: "ALL",
    label: "All",
  },
  {
    id: "37e09397-fab2-46f4-9b9a-66b2324b2e22",
    value: "Completed",
    label: "Read",
  },
  {
    id: "2ab42512-3d05-4fba-8191-5122175b154e",
    value: "In_Progress",
    label: "Currently Reading",
  },
  {
    id: "361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8",
    value: "Want_To_Read",
    label: "Want to Read",
  },
];

const bookApiStatuses = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const BookShelves = () => {
  const [activeFilter, setActiveFilter] = useState(bookshelvesList[0].value);
  const [booksApiStatus, setBooksApiStatus] = useState(bookApiStatuses.initial);
  const [booksData, setBooksData] = useState({});
  const [fetchedData, setFetchedData] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilterLabel, setActiveFilterLabel] = useState(
    bookshelvesList[0].label
  );

  useEffect(() => {
    async () => getBooksApiData(), getBooksApiData();
  }, []);
  const user_id = Cookies.get("user_id");
  const updatedBooksList = (booksList) =>
    booksList?.map((eachBook) => ({
      id: eachBook.book.bookID,
      title: eachBook.book.title,
      // genres: eachBook.book.genres.map((item) => item.genreName),
      page: eachBook.book.page,
      summary: eachBook.book.summary,
      rate: eachBook.book.rate,
      readStatus: eachBook.status,
      authorName: eachBook.book.author,
      coverPic: eachBook.book.image,
    }));

  const getBooksApiData = async () => {
    console.log("Getting books");
    setBooksApiStatus(bookApiStatuses.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const booksApi = `http://localhost:8080/api/progresses/${user_id}`;
    // const booksApi = `http://localhost:8080/api/books/1`;
    // const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(booksApi, options);
    if (response.ok === true) {
      const fetchedData1 = await response.json();
      console.log("hhk", fetchedData1);
      setFetchedData(fetchedData1);
      const updatedData = {
        books: updatedBooksList(fetchedData1),
        total: fetchedData1.length,
      };
      console.log("kkk", updatedData);
      setBooksData(updatedData);
      setBooksApiStatus(bookApiStatuses.success);
    } else {
      setBooksApiStatus(bookApiStatuses.failure);
    }
  };

  const onClickRetry = () => {
    getBooksApiData();
  };

  const onChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const searchBooks = (books, searchTerm) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const bookSearch = books?.filter((eachBook) => {
        const lowerCaseTitle = eachBook.book.title.toLowerCase();
        const lowerCaseAuthor = eachBook.book.author.toLowerCase();
        let hasMatchingGenre = false;
        if (Array.isArray(eachBook.book.genres))
          eachBook.book.genres.forEach((genre) => {
            if (genre.genreName.toLowerCase().includes(lowerCaseSearchTerm)) {
              hasMatchingGenre = true;
            }
          });
        console.log("hasMatchingGenre, ", hasMatchingGenre);
        if (hasMatchingGenre) return true;
        return (
          lowerCaseTitle.includes(lowerCaseSearchTerm) ||
          lowerCaseAuthor.includes(lowerCaseSearchTerm)
        );
      });
      let transformedBooks;
      if (Array.isArray(fetchedData)) {
        transformedBooks = bookSearch?.map((eachBook) => ({
          id: eachBook.book.bookID,
          title: eachBook.book.title,
          // genres: eachBook.book.genres.map((item) => item.genreName),
          page: eachBook.book.page,
          summary: eachBook.book.summary,
          rate: eachBook.book.rate,
          readStatus: eachBook.status,
          authorName: eachBook.book.author,
          coverPic: eachBook.book.image,
        }));
      }
      console.log("transformedBooks123", transformedBooks);
      setBooksData({
        books: transformedBooks,
        total: transformedBooks?.length,
      });
    };

    if (fetchedData?.length > 0) searchBooks(fetchedData, search);
  }, [search]);

  const onSearchBooks = () => {
    setSearch(searchInput);
  };

  const RenderBooksProgressView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin color="#8284C7" height={50} width={50} />;
    </div>
  );

  const RenderBooksFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />
      <p className="top-rated-books-failure-heading">
        Something went wrong. Please try Again.
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

  const renderTheListOfBooks = () => {
    const { books } = booksData;
    console.log("book dai", booksData);
    return (
      <ul className="bookList-container">
        {books?.map((eachBook) => (
          <BookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    );
  };

  const renderNoMatchBooks = () => {
    return (
      <div className="no-match-found-container">
        <img
          className="no-match-image"
          src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
          alt="no books"
        />
        <p className="no-match-paragraph">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    );
  };

  const RenderBooksSuccessView = () => {
    console.log("render");
    const { total } = booksData;
    if (total !== 0) {
      return <> {renderTheListOfBooks()} </>;
    }
    return <> {renderNoMatchBooks()} </>;
  };
  console.log(booksApiStatus);
  const renderBooks = () => {
    switch (booksApiStatus) {
      case bookApiStatuses.success:
        return (
          <>
            <RenderBooksSuccessView />
          </>
        );
      case bookApiStatuses.inProgress:
        return (
          <>
            <RenderBooksProgressView />
          </>
        );
      case bookApiStatuses.failure:
        return (
          <>
            <RenderBooksFailureView />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="book-shelves-bg-container-lg">
          <div className="book-shelves-filter-container">
            <h1
              className="bookshelves-heading-bookshelves-heading-lg"
              key="title"
            >
              Bookshelves
            </h1>
            <ul className="filter-un-order-list-container">
              {bookshelvesList.map((eachItem) => {
                const activeFilterClass =
                  activeFilter === eachItem.value ? "active-filter-lg" : "";
                const onClickedFilter = () => {
                  setActiveFilter(eachItem.value);
                  setActiveFilterLabel(eachItem.label);
                  console.log("ffbookdata", fetchedData);
                  if (Array.isArray(fetchedData)) {
                    const filteredBooksCompleted = fetchedData?.filter(
                      (eachBook) =>
                        eachBook.status.toLowerCase() === "completed"
                    );
                    const filteredBooksInProgress = fetchedData?.filter(
                      (eachBook) =>
                        eachBook.status.toLowerCase() === "in_progress"
                    );
                    const filteredBooksWantToRead = fetchedData?.filter(
                      (eachBook) =>
                        eachBook.status.toLowerCase() === "want_to_read"
                    );
                    let transformedBooks;
                    const self = {
                      Completed: filteredBooksCompleted,
                      In_Progress: filteredBooksInProgress,
                      ALL: fetchedData,
                      Want_To_Read: filteredBooksWantToRead,
                    };
                    transformedBooks = self[eachItem.value]?.map(
                      (eachBook) => ({
                        id: eachBook.book.bookID,
                        title: eachBook.book.title,
                        // genres: eachBook.book.genres.map(
                        //   (item) => item.genreName
                        // ),
                        page: eachBook.book.page,
                        summary: eachBook.book.summary,
                        rate: eachBook.book.rate,
                        readStatus: eachBook.status,
                        authorName: eachBook.book.author,
                        coverPic: eachBook.book.image,
                      })
                    );

                    console.log("transformedBooks", transformedBooks);
                    console.log(
                      "transformedBooksCompleted",
                      filteredBooksCompleted
                    );
                    console.log("transformedBookspro", filteredBooksInProgress);
                    console.log(
                      "transformedBooksưant",
                      filteredBooksWantToRead
                    );
                    console.log("eachItem", eachItem.value, eachItem);
                    // setBooksData({
                    //   books:
                    //
                    //       ? filteredBooksCompleted
                    //       : eachItem.value === "In_Progress"
                    //       ? filteredBooksInProgress
                    //       : eachItem.value === "Want_To_Read"
                    //       ? filteredBooksWantToRead
                    //       : fetchedData,
                    //   total: transformedBooks.length,
                    // });
                    setBooksData({
                      books: transformedBooks,
                      total: transformedBooks.length,
                    });
                  }
                };
                return (
                  <li className="active-filter-list-lg" key={eachItem.label}>
                    <button
                      className={`active-filter-list-lg ${activeFilterClass}`}
                      onClick={onClickedFilter}
                      type="button"
                    >
                      {eachItem.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="large-container">
            <Space className="filtered-books-search-input-container-lg">
              <div>
                <h1 className="filtered-books-heading">
                  {activeFilterLabel} Books
                </h1>
              </div>
              <div className="search-input-container">
                <Input
                  placeholder="Search...."
                  type="search"
                  onChange={(e) => onChangeInput(e)}
                  value={searchInput}
                />
                <Button
                  className="search-btn"
                  onClick={() => onSearchBooks()}
                  type="button"
                  testid="searchButton"
                >
                  <BsSearch className="search=icon" />
                </Button>
              </div>
            </Space>
            <div className="renderbookshelves">{renderBooks()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookShelves;
