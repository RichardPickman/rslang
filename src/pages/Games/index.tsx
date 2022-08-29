import Layout from "../../components/Layout";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <Layout>
      <Space>
        <Link to="audiocall">
          <Button type="primary">Audiocall</Button>
        </Link>
      </Space>
    </Layout>
  );
};

export default Games;
