import React, { useEffect, useState } from "react";
import {Row, Col, Card, Avatar, Button} from 'antd';
import { Link, Redirect } from "react-router-dom";
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop,
  faChalkboard,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { connect } from "react-redux";

  function ChoixActivités(props) {
   
    /* créationdes fonctions de saisies pour création activités par étape*/

    const [fichesByKey, setFichesByKey] = useState([]);
    var etapeSelected = props.etape;
    

    useEffect(() => {
      const addActivities = async (keyword) => {
        /* variable pour distinction filtre recherche sur mot clé dans DB poussée depuis le Onclick*/
        const addActivities = await fetch(`/addactivities?keyword=${keyword}`);
        const response = await addActivities.json();
        //console.log(response);

        console.log(etapeSelected, "etapSctd");

        if (response) {
          setFichesByKey(response.fichesByKeyword);
        }
      };
      addActivities(etapeSelected);
    }, []);

    if (!props.idUser) {
      return <Redirect to='/' />
    };

    
      /* selection du bon appel au redux enf° de l'étape */
      /* reçoit fiche depuis l'appel de la fcontion*/
      const addtoEtape = (fiche) => {
        if ((etapeSelected == "inclusion")) {
          console.log('inclusion');
          props.addActivitiesToInclusion(fiche);
        } else if ((etapeSelected == "emergence")) {
          console.log('emergence');
          props.addActivitiesToEmergence(fiche);
        } else if (etapeSelected == "convergence") {
          console.log("convergence");
          props.addActivitiesToConvergence(fiche);
        } else if (etapeSelected == "declusion") {
          props.addActivitiesToDeclusion(fiche);
          console.log("declusion");
        }
      };

      
   const fiches = fichesByKey.map((fiche, i) => {
     /* ligne 72 dynamiser le link par conditions link */
     
     if(fiche.digital){ var redirection = "murstart"}else{var redirection = "atelier"}
     return (
       <Col xs={24} md={12} lg={8} xl={6} style={style.frame}>
         <Card style={{ width: 350, backgroundColor: "#fcfcfc" }}>
           <div style={style.cardheads}>
             <Avatar
               size={46}
               icon={
                 <FontAwesomeIcon
                   icon={fiche.digital ? faDesktop : faChalkboard}
                 />
               }
             />
             <h2 style={{ fontWeight: "bold", margin: "0 auto" }}>
               {fiche.title}
             </h2>

             <Link to={`/${redirection}` }>
               <Button
                 style={{
                   color: "#fff",
                   background: "#827af4",
                   borderRadius: 100,
                 }}
                 onClick={() => {
                   addtoEtape(fiche);
                 }}
               >
                 Ajouter
               </Button>
             </Link>
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
             >
               <span style={{ color: "#827af4" }}>#{etapeSelected}</span>
             </div>
           </div>
         </Card>
       </Col>
     );
   });

    return (
      <div>
        <Nav />

        <Row style={style.layout}>{fiches}</Row>
      </div>
    );
  };

// Styles

const style = {
    layout: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
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
        justifyContent: 'space-around',
    }
};

function mapStateToProps(state) {
  return { etape : state.etapeSelected, idUser: state.idUser };
}

function mapDispatchToProps(dispatch) {
  return {
    addActivitiesToInclusion: function (fiche) {
      dispatch({
        type: "addActivitiesToInclusion",
        fiche: fiche,
      });
    },
    addActivitiesToDeclusion: function (fiche) {
      dispatch({
        type: "addActivitiesToDeclusion",
        fiche: fiche,
      });
    },
    addActivitiesToEmergence: function (fiche) {
      dispatch({
        type: "addActivitiesToEmergence",
        fiche: fiche,
      });
    },
    addActivitiesToConvergence: function (fiche) {
      dispatch({
        type: "addActivitiesToConvergence",
        fiche: fiche,
      });
    },
    
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChoixActivités);
