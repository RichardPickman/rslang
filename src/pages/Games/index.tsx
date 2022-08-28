import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, DatePicker, Space, version, message, Alert } from "antd";
import { Link } from "react-router-dom";
import { DataEntity } from "rc-tree/lib/interface";

const Games = () => {
  const [date, setDate] = useState(null);

  const handleChange = (value: any) => {
    // message.info(`Selected Date: ${value ? value : "None"}`);
    setDate(value);
  };
  return (
    <Layout>
      <>
        <p>Games</p>
        <Space>
          {/* <Link to="audiocall">
            <Button type="primary">Audiocall</Button>
          </Link> */}
          {/* <Button onClick={handleChange} type="primary">
            push
          </Button> */}
          <DatePicker onChange={handleChange} />
          <div style={{ marginTop: 200 }}>
            {/* Selected Date: {date ? String(date) : "None"} */}
              <Alert message="Selected Date" description={date ? String(date) : 'None'} />
          </div>
        </Space>
      </>
    </Layout>
  );
};

export default Games;
