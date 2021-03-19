import React, { useEffect, useState } from "react";


import Nav from "../components/Nav";
import { Row, Col } from "antd";
import { List } from 'antd';

import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


function DashboardHistorique(props) {

  const [userInfos, setUserInfos] = useState({})

  useEffect(() => {

    const findUser = async () => {
      const data = await fetch(`/dashboard?id=${props.match.params.id}`)
      const body = await data.json()
      setUserInfos(body.user)
    }
    findUser()

  }, [])

  var listHistorique;

  if (!props.idUser) {
    return <Redirect to='/' />
  };

  if (userInfos === undefined) {

    listHistorique = <p>pas d'atelier créers</p>

  } else {
    listHistorique = <List style={{ boxShadow: "8px 9px 4px rgba(0, 0, 0, 0.25)" }}
    header={<div style={{ fontWeight: "bold", fontSize: 20 }}>Tous mes ateliers créés</div>}

    bordered
    dataSource={userInfos.tousLesAteliersCréer}
    renderItem={item => (
      <List.Item>
        <p style={{fontWeight: "bold", marginTop: 10}}>{item.dateSession}</p> {item.cadrage.title}
      </List.Item>

    )}
  />
    
  }


  return (
    <div>
      <Nav />

      <Row>
        <Col lg={24}>
          <div style={style.bloc_div}>
            <h2 style={style.h2}>Mon historique</h2>
            {listHistorique}
          </div>
        </Col>
      </Row>

    </div >
  );
}

const style = {
  h2: {
    fontWeight: "bold",
    fontSize: 60
  },
  bloc_div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 100
  },

}

function mapStateToProps(state) {
  return { idUser: state.idUser }
}

export default connect(
  mapStateToProps,
  null
)(DashboardHistorique);

