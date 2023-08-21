import "./GroupPage.css";
import Header from "../Header/Header";
import retryHome from "../../assets/retry-home.svg";
import { SearchOutlined, AudioOutlined } from "@ant-design/icons";
import { Space, Input } from "antd";
import { useState } from "react";
import GroupItemJoined from "../GroupItemJoined/GroupItemJoined";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const GroupPage = () => {
  const [loading, setLoading] = useState(false);
  const onSearch = () => {
    setLoading(!loading);
    console.log(loading);
  };
  return (
    <>
      <Header page="home" />
      <div className="group-container">
        <Space className="group-header">
          <button className="group-retry-home">
            <img src={retryHome} alt="retry" />
          </button>
          <div className="group-title">Group</div>
        </Space>
        <div className="group-search">
          <Search
            prefix={<SearchOutlined />}
            placeholder="input search text"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
            loading={loading}
          />
          <button className="group-create-btn">create new group</button>
        </div>
        <div className="group-body">
          <div className="group-body-left">
            <div>group you joined</div>
            <GroupItemJoined />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
