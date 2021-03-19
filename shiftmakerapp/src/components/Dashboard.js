import React, { useState, useEffect } from "react";

import { Row, Col, Card, Avatar, Button } from "antd";
import Nav from "../components/Nav";
import { Redirect } from "react-router-dom";
import { List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faUsers, faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import { faClock, faClipboard } from '@fortawesome/free-regular-svg-icons';

import { connect } from 'react-redux';

function Dashboard(props) {

  const [dashboardLinks, setDashboardLinks] = useState('')
  const [userInfos, setUserInfos] = useState({})
  const [checkFavorisList, setCheckFavorisList] = useState(false);
  const [checkNotesList, setCheckNotesList] = useState(false)

  useEffect(() => {
    const findUser = async () => {
      const data = await fetch(`/dashboard?id=${props.match.params.id}`)
      const body = await data.json()
      setUserInfos(body.user)

      if (body.user.favorisActivites.length > 0) {
        setCheckFavorisList(true)
      }
      if(body.user.notes.length > 0) {
        setCheckNotesList(true)
      }
    }
    findUser()
  }, [])

  const handleClick = (param) => {
    setDashboardLinks(param)
  }
  let time = false;
  if (time) {
    if (!props.idUser) {
      return <Redirect to='/' />
    };
  };

  if (dashboardLinks === "favoris") {
    return (<Redirect to={`/dashboard-favoris/${props.match.params.id}`} />)
  } else if (dashboardLinks === "historique") {
    return (<Redirect to={`/dashboard-historique/${props.match.params.id}`} />)
  } else if (dashboardLinks === "notes") {
    return (<Redirect to={`/dashboard-notes/${props.match.params.id}`} />)
  }

  var listNote;

  if (checkNotesList === false) {
    listNote = <p style={style.messageSiVide}>Pas de notes</p>
  } else {
    listNote = userInfos.notes.slice(0, 2).map((notes, i) => {
      var responsiveOneElement = 12
      if (userInfos.notes.length === 1) {
        responsiveOneElement = 24
      }
      return (<Col xs={24} key={i} lg={responsiveOneElement}>
        <div style={{ marginBottom: 3 }}>
          <p style={{ fontWeight: "bold", textAlign: "center" }}>{notes.title}</p>
          <p style={{ textAlign: "center", marginTop: -10, wordBreak: "break-all" }} >{notes.content}</p>
        </div>
      </Col>)
    })
  }
  var fiches;

  if (checkFavorisList === false) {
    fiches = <p style={style.messageSiVide}>Pas de favoris</p>
  } else {
    fiches = userInfos.favorisActivites.slice(0, 2).map((favoris, i) => {
      var picto;
      if (favoris.digital === true) {
        picto = faDesktop
      } else {
        picto = faUsers
      }

      var resumeDesc = favoris.description

      if(resumeDesc.length > 40 ){
        resumeDesc = resumeDesc.slice(0, 80)+'...'
      }

      return (
        <Col xs={24} lg={12} style={{display: "flex", justifyContent: "center"}} key={i}>
          <Card style={{ width: 200, marginLeft: 20, marginRight: 20, marginBottom: 20, marginTop: 20, backgroundColor: "#fcfcfc" }}>
            <div style={style.cardheads}>
              <Avatar size={30} style={{width: 50}} icon={<FontAwesomeIcon icon={picto} />} />
              <h2 style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 13 }}>{favoris.title}</h2>
            </div>
            <p style={{ fontSize: 12, marginLeft: 40, marginTop: -8}}>{resumeDesc}</p>
            <div style={style.buttons}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: -5, marginLeft: -10 }}>
                <FontAwesomeIcon style={{ fontSize: 10 }} color='#FED200' icon={faClock} />
                <span style={{ marginLeft: 5, fontSize: 10 }}>{favoris.duration} min</span>
              </div>
            </div>
          </Card>
        </Col>
      )
    });
  }
  time = true;

  return (
    <div>
      <Nav />
      <div style={{ marginTop: 80 }}>

        <Row>
          <Col xs={24} lg={12} style={{ display: "flex", justifyContent: "center" }}>
            <div style={style.bloc_div}>
              <p style={{ fontSize: 40 }}>Bienvenue <span style={{fontWeight: "bold"}}>{userInfos.firstname}</span>!</p>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div style={style.bloc_div}>
              <div style={style.insideBox_div}>
              <h2 style={style.h2}>Mes notes <FontAwesomeIcon style={{fontSize: 22, marginLeft: 10}} icon={faClipboard} color='black'/> </h2>
                <Row style={ style.rowStyleCard }>
                  {listNote}
                </Row>
              </div>
              <Button color="primary" onClick={() => handleClick("notes")}>Regarder toutes mes notes</Button>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div style={style.bloc_div}>
              <h2 style={style.h2}>Mon historique</h2>

              <List style={{ boxShadow: "8px 9px 4px rgba(0, 0, 0, 0.25)", marginBottom: 20, borderRadius: 10 }}
                header={<div style={{ fontWeight: "bold", fontSize: 15, textDecoration: "underline" }}>Tous mes ateliers créés</div>}

                bordered
                dataSource={userInfos.tousLesAteliersCréer}
                renderItem={item => (
                  <List.Item>
                    <span style={{fontWeight: "bold", marginRight: 20}}>{item.dateSession}</span> {item.cadrage.title}
                  </List.Item>

                )} />

              <Button color="primary" onClick={() => handleClick("historique")}>Regarder tout mon historique</Button>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div style={style.bloc_div}>
              
              <div style={style.insideBox_div}>
              <h2 style={style.h2}>Mes favoris <FontAwesomeIcon style={{fontSize: 22, marginLeft: 10}} icon={faHeartFull} color='#e74c3c'/></h2>
                
                <Row style={style.rowStyleCard}>
                  {fiches}
                </Row>
              </div>
              <Button color="primary" onClick={() => handleClick("favoris")}>Regarder tous mes favoris</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const style = {
  h3: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  h2: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20
  },
  intro: {
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: 20,
  },
  bloc_div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 20
  },
  insideBox_div: {
    width: 500,
    marginBottom: 20,
    boxShadow: "8px 9px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    border: "1px solid #f0f0f0",
    marginTop: 20
  },
  layout: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },

  frame: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px auto'
  },

  cardheads: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 13,
  },

  buttons: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageSiVide: {
    fontStyle: "italic",
    fontWeight: "bold"

  },
  rowStyleCard: {
    width: 500, 
    marginBottom: 15, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
  }
}

function mapStateToProps(state) {
  console.log(state.idUser);
  return { idUser: state.idUser }
}

export default connect(
  mapStateToProps,
  null
)(Dashboard);
