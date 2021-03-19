import React, { useEffect, useState } from "react";
import { Row, Col, Card } from 'antd';
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import Nav from './Nav';
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';


function Activités(props) {

  const [fiches, setFiches] = useState([]);

  useEffect(() => {
    const getFiches = async () => {
      const raw = await fetch('/activities/get-theory');
      const response = await raw.json();
      const ficheList = response.fiches;
      setFiches(ficheList);
    };
    getFiches();
  }, []);

  if (!props.idUser) {
    return <Redirect to='/' />
  };

  const allFiches = fiches.map((fiche, i) => {
    return (
      <Col xs={24} md={12} xl={8} xxl={6} style={style.frame}>
        <Card
          style={{
            width: 500,
            backgroundColor: "#fcfcfc",
            borderRadius: 70,
            margin: "auto 15px",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {fiche.title}
          </h2>

          <div style={style.cardBody}>
            <img src={fiche.picto} alt="picto fiche" width="100px" />
            <p style={{ marginLeft: 15 }}>{fiche.description}</p>
          </div>
          <div style={style.buttons}>

            <a href={`/documentPdf/${fiche.pdfName}.pdf`} target="_blank"><EyeOutlined /></a>

            <a href={`/documentPdf/${fiche.pdfName}.pdf`} download={fiche.pdfName}><DownloadOutlined/></a>
          </div>
        </Card>
      </Col>
    );
  });


  return (
    <div>

      <Nav/>
      <h1 style={{ color: '#4ebdb4', textAlign: 'center', fontWeight: 'bold', paddingTop: 80}}>{props.name}, quel concept souhaites-tu revoir ?</h1>
      <Row style={style.layout}>
        {allFiches}
      </Row>

    </div>
  )
};

// Styles

const style = {
  layout: {
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
  },

  frame: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px auto",
  },

  cardBody: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 13,
    marginTop: 20,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: "1.2rem"
  },

};

function mapStateToProps(state) {
  return { idUser: state.idUser, name: state.nameUser }
}

export default connect (
  mapStateToProps, 
  null
)(Activités);
