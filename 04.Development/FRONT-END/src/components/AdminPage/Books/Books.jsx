import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";

const Books = () => {
  const [books, setbooks] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then((response) => response.json())
      .then((data) => {
        setbooks(data);
        if (reloadData) {
          setReloadData(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reloadData]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newbook, setNewbook] = useState({
    id: "",
    name: "",
    image: "",
    author: "",
    isbn: "",
    summary: "",
    averageRating: "",
    page: "",
  });
  const [editingbook, setEditingbook] = useState(null);

  const columns = [
    {
      title: "Tên sách",
      dataIndex: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
    },
    {
      title: "Tóm tắt",
      dataIndex: "summary",
    },
    {
      title: "Trang",
      dataIndex: "page",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => editbook(record)}>
            Sửa đổi
          </Button>
          <Button type="danger" onClick={() => cancelbook(record)}>
            Hủy bỏ
          </Button>
        </div>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    if (newbook.name) {
      const formData = new FormData();
      formData.append("title", newbook.name);
      formData.append("imageFile", imageFile);
      formData.append("author", newbook.author);
      formData.append("isbn", newbook.isbn);
      formData.append("summary", newbook.summary);
      formData.append("page", newbook.page);

      if (editingbook) {
        // Edit existing book

        const bookId = editingbook.bookID;

        // Assume the book has an "id" property
        fetch(`http://localhost:8080/api/books/${bookId}`, {
          method: "PUT",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            const updatedbooks = books.map((item) => {
              if (item.id === bookId) {
                return data;
              }
              return item;
            });
            setbooks(updatedbooks);
            setEditingbook(null);

            setReloadData(true);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // Add new book
        fetch("http://localhost:8080/api/books/add", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setbooks((prevbooks) => [...prevbooks, data]);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      setIsModalVisible(false);
      setNewbook({
        name: "",
        image: null,
        author: "",
        isbn: "",
        summary: "",
        page: "",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewbook({
      name: "",
      image: "",
      author: "",
      isbn: "",
      summary: "",
      page: "",
    });
    setEditingbook(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewbook((prevbook) => ({
      ...prevbook,
      [name]: value,
    }));
  };
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "File ở đây???");
    setImageFile(file);
  };

  const editbook = (book) => {
    // console.log(book,"Có gì ở đây ?")
    // console.log(book.image,"Có image ở đây không?")
    setIsModalVisible(true);
    setNewbook({
      id: book.id,
      name: book.title,
      imageFile: book.image,
      author: book.author,
      isbn: book.isbn,
      summary: book.summary,
      page: book.page,
    });
    // eslint-disable-next-line no-undef
    setEditingbook(book);
    // setEditingImageFile(book.image);
  };

  const cancelbook = (book) => {
    fetch(`http://localhost:8080/api/books/${book.bookID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setbooks((prevbooks) => prevbooks.filter((item) => item !== book));
        } else {
          console.error("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm sách
      </Button>
      <Table dataSource={books} columns={columns} />

      <Modal
        title="Thêm sách"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Tên sách">
            <Input
              name="name"
              value={newbook.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Ảnh">
            <Input name="imageFile" type="file" onChange={handleFileChange} />
            <Input value={newbook.imageFile} readOnly />
          </Form.Item>
          <Form.Item label="Tác giả">
            <Input
              name="author"
              value={newbook.author}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="ISBN">
            <Input
              name="isbn"
              value={newbook.isbn}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Tóm tắt">
            <Input
              name="summary"
              value={newbook.summary}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Số trang">
            <Input
              name="page"
              value={newbook.page}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Books;
