import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Avatar } from "antd";
import {
  ReadOutlined,
  LogoutOutlined,
  ToolOutlined,
  FormOutlined,
  UserAddOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import {connect} from 'react-redux'

import "./style.css";



function Nav(props) {

  return (
    <Menu
      style={{
        backgroundColor: "#F9F9F9",
        height: 50,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1rem",
        position: "fixed",
        zIndex: 20,
        top: 0,

      }}
      mode="horizontal"
      theme="light"
    >
      <Menu.Item key="logo">      
          <Image
            height={50}
            style={{ marginTop: 10 }}
            src="/assets/ButterflyAcademy_CouleursPlates_fondClair.svg"
            preview={false}
          />      
      </Menu.Item>
      <Menu.Item
        icon={
          <QuestionCircleOutlined
            style={{ color: "#D18809", fontSize: "1.1rem" }}
          />
        }
      >
        <Link to="/welcome"></Link>
      </Menu.Item>

      <Menu.Item
        key="dashboard"
        icon={<DashboardOutlined style={{ fontSize: "1.2rem" }} />}
      >
        <Link to={`/dashboard/${props.idUser}`}>Dashboard</Link>
      </Menu.Item>

      <Menu.Item
        key="library"
        icon={<ReadOutlined style={{ fontSize: "1.2rem" }} />}
      >
        <Link to="/theorie">Fiches Théorie</Link>
      </Menu.Item>

      <Menu.Item
        key="activities"
        icon={<ToolOutlined style={{ fontSize: "1.2rem" }} />}
      >
        <Link to="/activites">Fiches Activités</Link>
      </Menu.Item>

      <Menu.Item
        key="create"
        icon={<FormOutlined style={{ fontSize: "1.1rem" }} />}
      >
        <Link to="/cadrage">Créer son Atelier</Link>
      </Menu.Item>
      <a href="mailto:pierre.perrin@butterflyandco.eu?subject=Question">
        <Menu.Item
          key="emailus"
          icon={
            <MailOutlined
              style={{ fontSize: "1.1 rem", marginLeft: 50, marginRight: -10 }}
            />
          }
        ></Menu.Item>
      </a>
      <Menu.Item
        key="deconnexion"
        icon={<LogoutOutlined style={{ fontSize: "1.3rem" }} />}
      >
        <Link to="/" onClick={props.logout}>
          Déconnexion
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/Avatar">
          <Avatar
            size="large"
            icon={<UserAddOutlined style={{ fontSize: 30 }} />}
          />
        </Link>
      </Menu.Item>
    </Menu>
  );
}

function mapStateToProps(state) {
  return { idUser: state.idUser }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: function () {
      dispatch({ type: 'logout', user : "" })
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
