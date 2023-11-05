import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Select, Table } from "antd";
import Avatar from "../../Avatar/Avatar";

const { Option } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(2);
  const [selectedItem, setSelectedItem] = useState("");
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
        if (reloadData) {
          setReloadData(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reloadData]);
  console.log("dataSource", dataSource);
  const handleDelete = (key) => {
    console.log("delete", key);
    const newData = dataSource.filter((item) => item.userID !== key);
    console.log("deletenewdata", newData);
    setDataSource(newData);
  };

  const handleAdd = () => {
    if (selectedItem) {
      const newData = {
        key: count.toString(),
        name: selectedItem,
        Co2_Emission: "20",
        Category: `Food`,
      };
      setDataSource([...dataSource, newData]);
      setCount(count + 1);
      setSelectedItem("");
    }
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: "User name",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "image",
      render: (image) => (
        <Avatar srcImage={image} />
        //<Image  alt={image} src={image} />
      ),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "emailAddress",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (_, { roles }) => (
        <>
          {roles?.map((item, idx) => (
            <div key={"roles" + idx}>{item.name}</div>
          ))}
        </>
      ),
    },
    {
      title: "Operation",
      dataIndex: "Operation",
      key: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.userID)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSelectChange = (value) => {
    setSelectedItem(value);
  };

  return (
    <div>
      <Select
        style={{ width: 200, marginRight: 16 }}
        value={selectedItem}
        onChange={(value) => handleSelectChange(value)}
      >
        <Option value="Activity 2">Activity 2</Option>
        <Option value="Activity 3">Activity 3</Option>
        <Option value="Activity 4">Activity 4</Option>
      </Select>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add activity
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource.map((item, idx) => ({ ...item, key: idx }))}
        columns={columns}
      />
    </div>
  );
};

export default App;
