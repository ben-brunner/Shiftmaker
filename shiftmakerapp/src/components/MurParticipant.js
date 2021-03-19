import React, {useEffect, useState } from "react";
import {connect} from 'react-redux';
import {Carousel, Button, Image, Row, Col} from "antd"
import { CheckCircleOutlined } from "@ant-design/icons";
import socketIOClient from "socket.io-client";
import Mur from './Mur';
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";


function MurParticipant(props) {
  
  // Connexion Socket.io
  const socket = socketIOClient("http://localhost:3000/");

  const [disableButton, setDisableButton] = useState(false);
  const [titre, setTitre] = useState(`Mur d'humeur`);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
      socket.on('titre', (titre) => {
      setTitre(titre);
      })
    }, [titre]);

  if (!props.idUser) {
    socket.emit('TitreMurParticipant');
  };
  
  if (props.idUser) {
    socket.emit('titreMur', (props.paramsMur.titre));
  };

  const childCallback = (value) => {
    setTotalVotes(value)
  };

  /* Emotion choisie par le participant */
  let imageNumber = 1;
  const choiceFeel = () => {

    if (imageNumber === 1) {
      socket.emit('IncrementImg1');
    } else if (imageNumber === 2) {
      socket.emit('IncrementImg2');
    } else if (imageNumber === 3) {
      socket.emit('IncrementImg3');
    } else if (imageNumber === 4) {
      socket.emit('IncrementImg4');
    } else if (imageNumber === 5) {
      socket.emit('IncrementImg5');
    } else if (imageNumber === 6) {
      socket.emit('IncrementImg6');
    } else if (imageNumber === 7) {
      socket.emit('IncrementImg7');
    } else if (imageNumber === 8) {
      socket.emit('IncrementImg8');
    } else if (imageNumber === 9) {
      socket.emit('IncrementImg9');
    } else if (imageNumber === 10) {
      socket.emit('IncrementImg10');
    } else if (imageNumber === 11) {
      socket.emit('IncrementImg11');
    } else if (imageNumber === 12) {
      socket.emit('IncrementImg12');
    } else if (imageNumber === 13) {
      socket.emit('IncrementImg13');
    } else if (imageNumber === 14) {
      socket.emit('IncrementImg14');
    };

    setDisableButton(true);
  };

  /* Carousel renvoie le numéro de la photo dans onChange */
  const onChange = (picture) => {
    imageNumber = picture + 1;
    console.log(imageNumber);
  };

  const contentStyle = {
    height: "60vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: " #2182C6",
  };

  /* création du carroussel code à copier pour mur.js*/
  var PhotoArray = [];
  for (var i = 1; i < 15; i++) {
    var picture = `${i}_MrFrite.png`;
    PhotoArray.push(picture);
  };

  var carroussel = PhotoArray.map((image)=>{
      var src = "./assets/mrFrite/"+image
      return (
        <div>
          <div style={contentStyle}>
            <Image
              width={"40vh"}
              src={src}
              preview={false}
            />
          </div>
        </div>
      );

  })

  return (
    <Row style={style.mur}>
      <Col lg={15}>
        <div style={style.affichage}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent:"start",
                alignItems: "center",
              }}
            >
              {props.codeSession ? (
                <h6 style={{ color: "#fff" ,   
                   marginRight: 100,
                    //  marginLeft: 30,
                  }}>
                  Code session:{" "}
                  <span
                    style={{
                      fontSize: 17,
                      marginTop: 0,
                   
                    }}
                  >
                    {props.codeSession}
                  </span>
                </h6>
              ) : null}
              <h2
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: 0,
                  //marginRight: "auto",
                  marginLeft: 50,
                }}
              >
                {props.paramsMur.titre ? props.paramsMur.titre : titre}{" "}
              </h2>
            </div>
          </div>
          <Mur passToParent={childCallback} />
          {props.idUser ? (
            <div>
              <h3 style={{ color: "#fff", fontWeight: "bold", marginTop: 0, textAlign: 'center'}}>
                {" "}
                Nombre total de participants: {totalVotes}{" "}
              </h3>
              <Link to={`/atelier`} style={style.positionButton}>
                <Button
                  icon={
                    <LogoutOutlined
                      style={{ color: "#F61008" }}
                      className="icon"
                    />
                  }
                  style={{
                    backgroundColor: "#F9F9F9",
                    borderRadius: 50,
                    color: "#F61008",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  QUITTER
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </Col>

      {!props.idUser ? (
        <Col lg={9}>
          <div className=" inclusioncolor mhboxchoice ">
            <div className="titleMH"> Quelle est ton humeur du moment ?</div>
            <div>
              <Carousel afterChange={onChange}>{carroussel}</Carousel>
            </div>
            <div className="centerbox">
              <Button
                icon={
                  <CheckCircleOutlined
                    style={{ color: "#F9F9F9" }}
                    className="icon"
                  />
                }
                style={{
                  backgroundColor: "#70C047",
                  borderRadius: 50,
                  color: "#F9F9F9",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={choiceFeel}
                disabled={disableButton}
                ghost={disableButton}
              >
                Choisir
              </Button>
            </div>
          </div>
        </Col>
      ) : null}
    </Row>
  );
}

const style = {
  mur: {
   
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  affichage: {
    backgroundColor: "#F5A81C",
  },
  marge: {
    marginRight: "auto",
    marginLeft: "auto",
  },

  positionButton: {
    display: "flex",
    justifyContent: "center",
  },
};




function mapStateToProps(state){
  return {idUser: state.idUser, paramsMur: state.paramsMur, codeSession: state.codeSession}
};

export default connect(
  mapStateToProps,
  null
)(MurParticipant);