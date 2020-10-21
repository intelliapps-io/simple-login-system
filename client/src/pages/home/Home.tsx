import React from "react";
import "./Home.less";
import Title from "antd/lib/typography/Title";
import { Row, Col, Card } from "antd";

interface IProps {

}

export const Home: React.FC<IProps> = props => {
  return (
    <div className="home-root">
      <Title className="home-title">Welcome to My App</Title>
      <Row style={{ width: "100%" }} className="home-cards">
        <Col xs={24} sm={12}>
          <Card
            title={<Title level={4}>Card Title</Title>}
          >
            This is a card!
          </Card>
        </Col>
        <Col xs={24} sm={12}>
        <Card
            title={<Title level={4}>Card Title</Title>}
          >
            This is a card!
          </Card>
        </Col>
      </Row>
      <Row style={{ width: "100%" }} className="home-cards">
        <Col xs={24} sm={12}>
          <Card
            title={<Title level={4}>Card Title</Title>}
          >
            This is a card!
          </Card>
        </Col>
        <Col xs={24} sm={12}>
        <Card
            title={<Title level={4}>Card Title</Title>}
          >
            This is a card!
          </Card>
        </Col>
      </Row>
    </div>
  );
}