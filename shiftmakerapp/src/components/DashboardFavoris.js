import React, {useEffect, useState} from "react";


import Nav from "../components/Nav";
import { Row, Col, Card, Avatar } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faChalkboard, } from '@fortawesome/free-solid-svg-icons';
import { faClock, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Redirect } from "react-router-dom";


import {connect} from 'react-redux'




function DashboardFavoris(props) {

  const [favorisEmpty, setFavorisEmpty] = useState(false)

  useEffect(() => {

    console.log(props.match.params.id);

    const findUser = async() => {
      const data = await fetch(`/dashboard?id=${props.match.params.id}`)
      const body = await data.json()
      if(body.user.favorisActivites === undefined){
        setFavorisEmpty(true)
      }else{
        props.saveFavoris(body.user.favorisActivites)
      }
    }
    findUser()
  }, [])

  const handleClickDelete = async (favorisId) => {
    props.deleteToFavoris(favorisId)

    const deleteReq = await fetch('/dashboard/favoris/delete', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `idUser=${props.idUser}&idFavoris=${favorisId}`
    })

  }

  if (!props.idUser) {
    return <Redirect to='/' />
  };

  var fiches;

  if(favorisEmpty === undefined) {
    fiches = <p>pas de favoris</p>
  } else{
    fiches = props.myFavorisList.map((favoris, i) => {

      var picto;
  
      if(favoris.digital === true){
  
        picto = faDesktop
      }else{
        picto = faChalkboard
      }

      var resumeDesc = favoris.description

      if(favoris.description.length > 40 ){
        resumeDesc = resumeDesc.slice(0, 80)+'...'
      }

      return (
        <Col xs={24} lg={12} style={{ marginBottom: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Card style={{ width: 320, backgroundColor: "#fcfcfc", display: "flex", justifyContent: "center" }}>
            <div style={style.cardheads}>
              <Avatar size={46} icon={<FontAwesomeIcon icon={picto} />} />
              <h2 style={{ fontWeight: 'bold', marginLeft: 20, fontSize: 18, marginTop: 5 }}>{favoris.title}</h2>
            </div>
            <p style={{ fontSize: 13, marginLeft: 50, marginTop: -8, wordBreak: "break-all" }}>{resumeDesc}</p>
            <div style={style.buttons}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 30 }}>
                <FontAwesomeIcon style={{ fontSize: 17 }} color='#FED200' icon={faClock} />
                <span style={{ marginLeft: 5, fontSize: 12 }}>{favoris.duration} min</span>
              </div>
            </div>
          </Card>
          <FontAwesomeIcon style={{ fontSize: 20, marginLeft: 20, marginRight: 20 }} color='black' icon={faTrashAlt} onClick={() => handleClickDelete(favoris._id)} />
        </Col>
      )
    });
  }

  return (
    <div>
      <Nav/>

      <Row>
        <Col lg={24}>
          <div style={style.bloc_div}>
            <h2 style={style.h2}>Mes favoris</h2>
            <div style={style.insideBox_div}>
              <Row style={{ width: 700, marginTop: 40 }}>
                {fiches}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

    </div >
  );
}

const style = {

  cardheads: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 13,
  },

  h2: {
    fontWeight: "bold",
    fontSize: 60
  },
  bloc_div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 60
  },
  insideBox_div: {

    width: 800,
    boxShadow: "8px 9px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
}


function mapStateToProps(state){
  return {myFavorisList: state.favorisList, idUser:state.idUser}
}

function mapDispatchToProps(dispatch){
  return {
    
    saveFavoris: function(favoris){
      dispatch({type: 'saveFavoris',
        favorisActivites: favoris
      })
    },
    deleteToFavoris: function(favorisId){
      dispatch({type: 'deleteFavoris',
        idFavoris: favorisId
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardFavoris);
