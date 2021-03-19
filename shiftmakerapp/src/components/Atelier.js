import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Card, Avatar, Button, Divider, List, Modal } from "antd";
import { faDesktop, faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PlusCircleFilled, DownloadOutlined, LogoutOutlined, SaveOutlined } from "@ant-design/icons";


import "./style.css";
import "./cardatelier.css";

import { connect } from 'react-redux'


function Atelier(props) {
  const [etape, setEtape] = useState();
  const [codeSession, setCodeSession] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabledButtonSave, setDisabledButtonSave] = useState(false)
  const [isDisabledLaunchButton, setIsdisableLaunchButton] = useState(true)

  /* intégration des données du redux dans le cadrage */

  var answersList = props.dataCadrageList;

  //console.log(props.params);

  var settingsMur

  if (props.params != null) {

    //console.log(props.params.titre);

    settingsMur =
      <div>
        <h4>titre: {props.params.titre}</h4>
        <h4>logo: {props.params.logo}</h4>
      </div>
  }

  /* gérer le noms Atelier en BDD*/
  var atelierName = answersList[0];

  const handleClickSave = async () => {
    const ladate = new Date();
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    var date = ladate.toLocaleDateString("fr-FR", options);
    const data = await fetch(
      `/atelier/save?atelierName=${atelierName}&atelierDate=${date}&idUser=${props.idUser}`
    );

    const body = await data.json()

    setCodeSession(body.codeSession.code)
    props.addCodeSession(body.codeSession.code)

    setDisabledButtonSave(true)

    setIsModalVisible(true);
    setIsdisableLaunchButton(false)

  };



  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  var questionList = [
    "Nom",
    "Enjeux",
    "Livrables",
    "Apprentissages Collectifs",
    "Lieu",
    "Nbre Personnes",
    "Durée",
  ];


  /* fusion de la liste des réponses avec les thèmes pour utilisation DIVIDER ET liste ITEM */
  var dataList = [];

  var answer;

  for (var i = 0; i < questionList.length; i++) {
    answer = questionList[i] + " : " + answersList[i];

    dataList.push(answer);
  }

  if (!props.idUser) {
    return <Redirect to='/' />
  };



  /* gestion de l'affichages des nouvelles activités par étape  */
  /* activités inclusion*/
  var activitiesInclusion = props.activitiesInclusion;

  var buttonStart;



  if (activitiesInclusion[0] === undefined) {
    var displayActivitiesInclusion = (
      <h4 className="nochoice">Aucune Activité Choisie</h4>
    );
  } else {
    
    var displayActivitiesInclusion = activitiesInclusion.map((fiche, i) => {
      if (fiche.title === "Mur d'humeur") {
        buttonStart = (
          <Link to="/murparticipant">
            <Button
              style={{
                backgroundColor: "#70C047 ",
                borderRadius: 50,
                marginBottom: 15,

                border: "none",
                color: "#F9F9F9",
              }}
              disabled={isDisabledLaunchButton}
              ghost={isDisabledLaunchButton}
            >
              Lancer 
            </Button>
          </Link>
        );
      }
      return (
        <div className=" addactivities margecard">
          <Card className="cardChoose margecard">
            <div style={style.cardheads}>
              <Avatar
                size={46}
                icon={
                  <FontAwesomeIcon
                    icon={fiche.digital ? faDesktop : faChalkboard}
                  />
                }
                style={{ marginRight: 20 }}
              />

              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontWeight: "bold", margin: "0 auto" }}>
                  {fiche.title}
                </h3>
                {settingsMur}
              </div>
            </div>
            <p>{fiche.content}</p>
            <div style={style.buttons}>
              {buttonStart}
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  style={{ fontSize: 20 }}
                  color="#FED200"
                  icon={faClock}
                />
                <span style={{ marginLeft: 5 }}>{fiche.duration} min</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              ></div>
              <DownloadOutlined />
            </div>
          </Card>
        </div>
      );
    });
  }
  /* activités Emergence*/
  var activitiesEmergence = props.activitiesEmergence;

  if (activitiesEmergence[0] === undefined) {
    var displayActivitiesEmergence = (
      <h4 className="nochoice">Aucune Activité Choisie</h4>
    );
  } else {
    var displayActivitiesEmergence = activitiesEmergence.map((fiche, i) => {
      return (
        <div className=" addactivities margecard">
          <Card className="cardChoose margecard">
            <div style={style.cardheads}>
              <Avatar
                size={46}
                icon={
                  <FontAwesomeIcon
                    icon={fiche.digital ? faDesktop : faChalkboard}
                  />
                }
              />
              <h3 style={{ fontWeight: "bold", margin: "0 auto" }}>
                {fiche.title}
              </h3>
            </div>
            <p>{fiche.content}</p>
            <div style={style.buttons}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  style={{ fontSize: 20 }}
                  color="#FED200"
                  icon={faClock}
                />
                <span style={{ marginLeft: 5 }}>{fiche.duration} min</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              ></div>

              <DownloadOutlined />
            </div>
          </Card>
        </div>
      );
    });
  }
  /* activités convergence*/
  var activitiesConvergence = props.activitiesConvergence;

  if (activitiesConvergence[0] === undefined) {
    var displayActivitiesConvergence = (
      <h4 className="nochoice">Aucune Activité Choisie</h4>
    );
  } else {
    var displayActivitiesConvergence = activitiesConvergence.map((fiche, i) => {
      return (
        <div className=" addactivities margecard">
          <Card className="cardChoose margecard">
            <div style={style.cardheads}>
              <Avatar
                size={46}
                icon={
                  <FontAwesomeIcon
                    icon={fiche.digital ? faDesktop : faChalkboard}
                  />
                }
              />
              <h3 style={{ fontWeight: "bold", margin: "0 auto" }}>
                {fiche.title}
              </h3>
            </div>
            <p>{fiche.content}</p>
            <div style={style.buttons}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  style={{ fontSize: 20 }}
                  color="#FED200"
                  icon={faClock}
                />
                <span style={{ marginLeft: 5 }}>{fiche.duration} min</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              ></div>

              <DownloadOutlined />
            </div>
          </Card>
        </div>
      );
    });
  }
  /*etape declusion*/
  var activitiesDeclusion = props.activitiesDeclusion;

  if (activitiesDeclusion[0] === undefined) {
    var displayActivitiesDeclusion = (
      <h4 className="nochoice">Aucune Activité Choisie</h4>
    );
  } else {
    var displayActivitiesDeclusion = activitiesDeclusion.map((fiche, i) => {

      if (fiche.title === "Mur d'humeur") {
        buttonStart = (
          <Link to="/murparticipant">
            <Button
              style={{
                backgroundColor: "#70C047 ",
                borderRadius: 50,
                marginBottom: 15,

                border: "none",
                color: "#F9F9F9",
              }}
              disabled={isDisabledLaunchButton}
              ghost={isDisabledLaunchButton}
            >
              Lancer l'activité
            </Button>
          </Link>
        );
      }

      return (
        <div className=" addactivities margecard">
          <Card className="cardChoose margecard">
            <div style={style.cardheads}>
              <Avatar
                size={46}
                icon={
                  <FontAwesomeIcon
                    icon={fiche.digital ? faDesktop : faChalkboard}
                  />
                }
              />
              <h3 style={{ fontWeight: "bold", margin: "0 auto" }}>
                {fiche.title}
              </h3>
            </div>
            <p>{fiche.content}</p>
            <div style={style.buttons}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {buttonStart}
                <FontAwesomeIcon
                  style={{ fontSize: 20 }}
                  color="#FED200"
                  icon={faClock}
                />
                <span style={{ marginLeft: 5 }}>{fiche.duration} min</span>
              </div>
             
              
              <DownloadOutlined />
            </div>
          </Card>
        </div>
      );
    });
  }

  return (
    <div>
      <Nav />
      <Row className="rowetape" style={{ marginTop: 80 }}>
        <Col xs={20} md={12} lg={5} className=" box inclusion ">
          <h3 className="etapetitle">INCLUSION</h3>
          <div
            className="addactivities"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to="/choix">
              <Button
                icon={<PlusCircleFilled className="icon" />}
                style={{
                  backgroundColor: "#BEC2C2 ",
                  borderRadius: 50,

                  border: "none",
                  color: "#F9F9F9",
                }}
                onClick={() => {
                  setEtape("inclusion");
                  props.selectEtape("inclusion");
                }}
                disabled={disabledButtonSave}
                ghost={disabledButtonSave}
              >
                Ajouter Activité
              </Button>
            </Link>
          </div>
          {displayActivitiesInclusion}
          <div style={style.arrowright}></div>
        </Col>

        <Col xs={20} md={12} lg={5} className=" box emergence">
          <h3 className="etapetitle">EMERGENCE</h3>
          <div className="addactivities">
            <Link to="/choix">
              <Button
                icon={<PlusCircleFilled className="icon" />}
                onClick={() => {
                  setEtape("emergence");
                  props.selectEtape("emergence");
                }}
                style={{
                  backgroundColor: "#BEC2C2 ",
                  borderRadius: 50,

                  border: "none",
                  color: "#F9F9F9",
                }}
                disabled={disabledButtonSave}
                ghost={disabledButtonSave}
              >
                Ajouter Activité
              </Button>
            </Link>
          </div>
          {displayActivitiesEmergence}
          <div style={style.arrowright}></div>
        </Col>

        <Col xs={20} md={12} lg={5} className=" box convergence">
          <h3 className="etapetitle">CONVERGENCE</h3>
          <div className="addactivities">
            <Link to="/choix">
              <Button
                icon={<PlusCircleFilled className="icon" />}
                onClick={() => {
                  setEtape("convergence");
                  props.selectEtape("convergence");
                }}
                style={{
                  backgroundColor: "#BEC2C2 ",
                  borderRadius: 50,

                  border: "none",
                  color: "#F9F9F9",
                }}
                disabled={disabledButtonSave}
                ghost={disabledButtonSave}
              >
                Ajouter Activité
              </Button>
            </Link>
          </div>
          {displayActivitiesConvergence}
          <div style={style.arrowright}></div>
        </Col>

        <Col xs={20} md={12} lg={5} className=" box declusion">
          <h3 className="etapetitle">DECLUSION</h3>
          <div className="addactivities">
            <Link to="/choix">
              <Button
                icon={<PlusCircleFilled className="icon" />}
                onClick={() => {
                  setEtape("declusion");
                  props.selectEtape("declusion");
                }}
                style={{
                  backgroundColor: "#BEC2C2 ",
                  borderRadius: 50,

                  border: "none",
                  color: "#F9F9F9",
                }}
                disabled={disabledButtonSave}
                ghost={disabledButtonSave}
              >
                Ajouter Activité
              </Button>
            </Link>
          </div>
          {displayActivitiesDeclusion}
          <div style={style.arrowright}></div>
        </Col>

        <Col xs={20} md={12} lg={4} className=" box cadrage">
          <Divider orientation="left">CADRAGE</Divider>

          <List
            size="small"
            bordered
            dataSource={dataList}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <div className="addactivities">
            
            <Button
              icon={<SaveOutlined className="icon" />}
              onClick={handleClickSave}
              style={{
                backgroundColor: "#70C047 ",
                borderRadius: 50,
                border: "none",
                color: "#F9F9F9",
              }}
              disabled={disabledButtonSave}
              ghost={disabledButtonSave}
            >
              Enregistrer
            </Button>

          </div>
          <p style={{ marginLeft: 30 }}>Code: {codeSession}</p>

          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  fontSize: 40,
                  marginTop: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Votre code session:
              </p>
              <p style={{ textAlign: "center", fontSize: 30 }}>{codeSession}</p>
            </div>
          </Modal>
        </Col>
      </Row>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    dataCadrageList: state.dataCadrage,
    fiche: state.activitieAdded,
    selectedEtape: state,
    idUser: state.idUser,
    activitiesDeclusion: state.activitiesDeclusion,
    activitiesInclusion: state.activitiesInclusion,
    activitiesEmergence: state.activitiesEmergence,
    activitiesConvergence: state.activitiesConvergence,
    params: state.paramsMur
  };
}

const style = {
  layout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  frame: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px auto",
  },

  cardheads: {
    display: "flex",

    marginBottom: 13,
  },

  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowright: {
    width: 0,
    height: 0,
    borderTop: "15px solid transparent",
    borderBottom: "15px solid transparent",
    borderLeft: "30px solid #F9F9F9",
    marginRight: -20,
    position: "absolute",
    bottom: 10,
    right: 0,
  },
};
function mapDispatchToProps(dispatch) {
  return {
    selectEtape: function (etape) {
      dispatch({
        type: "selectEtape",
        etape: etape,

      });
    },

    addCodeSession: function (code) {
      dispatch({
        type: "saveCode",
        code: code
      })
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Atelier)


