import { Typography, Space, Button } from "antd";
const { Text } = Typography;

// eslint-disable-next-line react/prop-types
function Profile({ setUser }) {
  return (
    <>
      <Space>
        <Text style={{ color: "white", textAlign: "center" }}>
          {"username".toUpperCase()}
        </Text>

        <Text style={{ color: "white", textAlign: "center" }} strong>
          position
        </Text>
      </Space>
    </>
  );
}
export default Profile;
