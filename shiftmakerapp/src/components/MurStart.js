import React, { useState } from "react";
import { Row, Col, Input, Button } from 'antd';
import { Link, Redirect } from "react-router-dom";
import Nav from './Nav';

import { connect } from "react-redux";

function MurStart(props) {

    const [titre, setTitre] = useState('');
    const [temp, setTemp] = useState('');
    const [logo, setLogo] = useState('');
    const [tempLogo, setTempLogo] = useState('');


    const handleSave = () => {
        setTitre(temp);
        setLogo(tempLogo);
        setTemp();
        setTempLogo();

        props.addParamsMur({ titre: temp, logo: tempLogo })

        console.log({ titre: temp, logo: tempLogo });


    };

    let titreDessin;
    if (titre) {
        titreDessin = <h1>{titre}</h1>
    };

    return (
      <div>
        <Nav />
     
        <Row style={style.layout}>
          <Col>
            {titreDessin}
            <img
              src="./assets/mrFrite/mur.png"
              style ={style.mur}
              alt="mur d'humeur"
            ></img>
          </Col>
          <Col>
            <div style={style.inputs}>
              <Input
                style={{ width: 200, marginBottom: 20 }}
                placeholder="Titre atelier"
                onChange={(e) => setTemp(e.target.value)}
                value={temp}
              />

              <Input
                style={{ width: 200, marginBottom: 20 }}
                placeholder="URL Logo"
                onChange={(e) => setTempLogo(e.target.value)}
                value={tempLogo}
              />

              <Link to="/atelier">
                <Button
                  style={{
                    fontSize: 20,
                    marginTop: 20,
                    marginBottom: 20,
                    borderRadius: 20,
                  }}
                  href="#"
                  type="primary"
                  onClick={handleSave}
                >
                  {titreDessin ? "Retour" : "Valider"}
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    );
};

// Styles

const style = {
    layout: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },

    inputs: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mur:{
        width: "70vw",
    }
};

function mapDispatchToProps(dispatch) {
    return {
        addParamsMur: function (param) {
            dispatch({
                type: "addParams",
                settings: param,
            });
        },
    }
}

export default connect(null, mapDispatchToProps)(MurStart);