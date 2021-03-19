import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Row, Col, Button, Modal  } from "antd";
import Nav from "./Nav";
import {
  PlusCircleFilled,
  ForwardFilled, 
} from "@ant-design/icons";
import { Redirect } from "react-router-dom";

import "./style.css";


function Welcome(props) {


  /* pour la bonne gestion d'une seule modale */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);
 
  const showModal = (n) => {
    if(n===1){setIsModalVisible(true)
    }else if(n===2){ setIsModalVisible2(true)
    }else if(n===3){ setIsModalVisible3(true)
    }else if(n===4){ setIsModalVisible4(true)
    }
      }

  const handleOk = (n) => {
      setIsModalVisible(false);
      setIsModalVisible2(false);
      setIsModalVisible3(false);
      setIsModalVisible4(false);
  
}
  const handleCancel = (n) => {
     setIsModalVisible(false);
     setIsModalVisible2(false);
     setIsModalVisible3(false);
     setIsModalVisible4(false);
  };

  let time = false;
  if (time) {
    if (!props.idUser) {
      return <Redirect to='/' />
    };
  };

  time = true;
return (
  <div>
    <Nav />
    <div>
      <Row style={{ marginTop: 50}}>
        <Col span={24}>
          <h2 className="intro">Bienvenue <span style={{ marginLeft: 5, fontSize: 30 }}>{props.name} !</span></h2>

          <p className="intro">
            Nous allons pouvoir ensemble créer des ateliers en Intelligence
            Collective.
          </p>
          <p className="text">
            <p>
              Nous créerons toujours des ateliers en 4 grandes étapes :{" "}
              <b>INCLUSION, EMERGENCE, CONVERGENCE, DECLUSION</b>
            </p>
            Tu pourras trouver des <b>Fiches Théorie </b> pour alimenter ton savoir,
            et des <b>Fiches Activités </b> pour alimenter chaque grande étape.
          </p>
          <Link to={`/dashboard/${props.idUser}`}>
            <Button
              icon={<ForwardFilled className="icon" />}
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                backgroundColor: "#70C047",
                borderRadius: 50,
              }}
              size="large"
            >
              PASSER
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="rowetape">
        <Col xs={20} md={12} lg={5} className="box inclusion">
          <h3 className="etapetitle"> INCLUSION</h3>
          <p className="text">
            L'inclusion est un moment clé de la réussite de ton atelier.
            <div className="modalbutton">
              <Button
                onClick={() => showModal(1)}
                icon={<PlusCircleFilled className="icon" />}
                style={{
                  backgroundColor: "#1A6499",
                  borderRadius: 50,
                  border: "none",
                  color: "#F9F9F9",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                d'informations
              </Button>
            </div>
            <Modal
              title="Inclusion"
              mask={false}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div>
                <p>
                  L'inclusion a plusieurs fonctions :
                  <ol>
                    <li>Créer le groupe, générer la dynamique collective</li>
                    <li>
                      Dans une partie plus liée au travail à réaliser, Répondre
                      à 4 questions pour le groupe
                      <ul>
                        <li> quels objectifs ? </li>
                        <li> combien de temps cela va durer ?</li>
                        <li> qu'est ce qui est attendu de moi ?</li>
                        <li> comment cela va se passer ?</li>
                      </ul>
                    </li>
                  </ol>
                  Cette étape doit prendre au minimum 15% de ton temps total
                  d'atelier
                </p>
              </div>
            </Modal>
            <p>
              Tu pourras choisir entre différentes activités, notamment pour
              créer la dynamique de groupe nécessaire.
              <p style={style.hashtag}>
                Toutes les activités de cette étape avec :
                <p style={style.centre}>
                  <b> #inclusion</b>
                </p>
              </p>
            </p>
          </p>

          <div style={style.arrowright}></div>
        </Col>
        <Col xs={20} md={12} lg={5} className="box emergence">
          <h3 className="etapetitle">EMERGENCE</h3>
          <p className="text">
            L'émergence est l'étape de ton atelier dans lequel ton groupe produit
            de grandes quantités d'informations et d'idées pour atteindre ton
            objectif
            <div className="modalbutton">
              <Button
                onClick={() => showModal(2)}
                icon={<PlusCircleFilled className="icon" />}
                style={{
                  backgroundColor: "#5EA33A",
                  borderRadius: 50,
                  border: "none",
                  color: "#F9F9F9",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                d'informations
              </Button>
            </div>
            <Modal
              title="Emergence"
              mask={false}
              visible={isModalVisible2}
              onOk={handleOk}
              onCancel={handleOk}
            >
              <div>
                <p>
                  Dans un premier temps, vous pourrez produire un maximum
                  d’idées. Cette phase est plus particulièrement la phase de
                  divergence de créativité.
                </p>
                <p>
                  Dans cette étape, vous pourrez aussi créer une phase
                  d'incubation. C'est une phase pendant laquelle, les idées sont
                  "malaxées", croisées afin de créer des idées plus puissantes
                  encore.
                </p>
              </div>
            </Modal>
            <p>Tu pourras choisir entre différentes activités.</p>
            <p style={style.hashtag}>
              Toutes les activités de cette étape avec :
              <p style={style.centre}>
                <b> #emergence</b>
              </p>
            </p>
          </p>
          <div style={style.arrowright}></div>
        </Col>
        <Col xs={20} md={8} lg={5} className="box convergence">
          <h3 className="etapetitle">CONVERGENCE</h3>
          <p className="text">
            L'étape de convergence va permettre de réduire le nombre d’idées et
            d'aller vers la prise de décisions.
            <div className="modalbutton">
              <Button
                onClick={() => showModal(3)}
                icon={<PlusCircleFilled className="icon" />}
                style={{
                  backgroundColor: "#C58717",
                  borderRadius: 50,
                  border: "none",
                  color: "#F9F9F9",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                d'informations
              </Button>
            </div>
            <Modal
              title="Convergence"
              mask={false}
              visible={isModalVisible3}
              onOk={handleOk}
              onCancel={handleOk}
              style={{}}
            >
              <div>
                <p>
                  Cette étape a pour but de se rapprocher progressivement des
                  pistes que le groupe souhaite retenir.{" "}
                  <p>
                    C’est lors de cette étape que tu devras faire fructifier les
                    oppositions entre participants. Ces tensions sont
                    essentielles au processus créatif pour produire de nouvelles
                    idées, fruit de l’association improbable d’idées.
                  </p>{" "}
                  En phase de convergence, on se réfère aux objectifs, on
                  améliore les idées, on juge constructivement, on cherche
                  l’inédit et on est déterminé.
                  <p>
                    C'est une étape difficile à animer car elle amène parfois
                    beaucoup d'inconfort entre les participants.
                  </p>
                </p>
              </div>
            </Modal>
            <p>
              Cette étape nécessite de bien choisir les activités en lien avec
              les processus de décision que le groupe est en mesure de conduire.
            </p>
            <p style={style.hashtag}>
              Toutes les activités de cette étape avec :
              <p style={style.centre}>
                <b> #convergence</b>
              </p>
            </p>
          </p>
          <div style={style.arrowright}></div>
        </Col>
        <Col xs={20} md={8} lg={5} className="box declusion">
          <h3 className="etapetitle">DECLUSION</h3>
          <p className="text">
            L'étape de déclusion marque à son tour la fin de l’espace-temps du
            collectif.
            <div className="modalbutton">
              <Button
                onClick={() => showModal(4)}
                icon={<PlusCircleFilled className="icon" />}
                style={{
                  backgroundColor: "#B62254",
                  borderRadius: 50,
                  border: "none",
                  color: "#F9F9F9",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                d'informations
              </Button>
            </div>
            <Modal
              title="Convergence"
              mask={false}
              visible={isModalVisible4}
              onOk={handleOk}
              onCancel={handleOk}
              style={{}}
            >
              <div>
                <p>
                  <p>
                    Le temps de déclusion agit sur la dynamique de groupe, et sur la place de chacun. Ainsi, elle peut se réaliser en
                    deux temps : expression individuelle et activité collective.{" "}
                    <p>
                      La phase de déclusion favorise l’ancrage des connaissances
                      acquises pendant le travail collectif. L’activité consiste
                      à proposer une narration des différentes étapes franchies
                      puis de consacrer un temps individuel pour que chacun
                      puisse imaginer des applications possibles avant de les
                      partager en collectif.
                    </p>
                    La déclusion peut être l’occasion d’exprimer trois aspects :
                    ce que je retiens/mon coup de cœur, ce qui serait à
                    améliorer et expression libre. Ce temps peut être suivi
                    d’une courte activité collective pour prendre en compte
                    l’énergie du groupe.
                  </p>
                </p>
              </div>
            </Modal>
            <p>
              Ainsi lors de la création des ateliers tu pourras définir comment
              tu vas permettre au groupe de prendre soin de lui.
            </p>
            <p style={style.hashtag}>
              Toutes les activités de cette étape avec :
              <p style={style.centre}>
                <b> #declusion</b>
              </p>
            </p>
          </p>
          <div style={style.arrowright}></div>
        </Col>
        <Col xs={20} md={8} lg={4} className="box cadrage">
          <h3
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            CADRAGE
          </h3>
          <div className="text">
            <p>
              Pour assurer la réussite d'un atelier, un cadrage est nécessaire.{" "}
            </p>
            <p>
              Nous t'aiderons à réaliser ce cadrage à l'aide d'une série de
              questions.
            </p>
            <p>
              Ainsi lors de la création des ateliers tu pourras toujours
              garder en vue toutes les informations nécessaires afin de choisir
              les bonnes activités
            </p>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

}

/*définition  de style pour aérer le code */
const style = {
 
 
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
 
 
  hashtag: { marginTop: 50, marginBottom: 50, textAlign:"justify" },
  centre: { textAlign: "center", fontSize: "1.1rem" },
  
};

function mapStateToProps(state) {
  console.log(state.idUser);
  return { idUser: state.idUser, name: state.nameUser }
}

export default connect(
  mapStateToProps,
  null
)(Welcome);