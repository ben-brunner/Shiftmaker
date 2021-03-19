import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {Row, Col, Card, Avatar} from 'antd';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDesktop, faHeart as faHeartFull} from '@fortawesome/free-solid-svg-icons';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';

function Activités(props) {
    
    const [fiches, setFiches] = useState([]);
    
    useEffect(() => {
        const getFiches = async () => {
            const raw = await fetch('/activities/get-activities');
            const response = await raw.json();
            const ficheList = response.fiches;
            setFiches(ficheList);
        };
        const getFichesLiked = async () => {
            const raw = await fetch(`/activities/get-liked/${props.idUser}`);
            const response = await raw.json();
            const ficheLikedList = response.fichesLiked;
            props.saveFav(ficheLikedList);
        };
        getFiches();
        getFichesLiked();
    }, []);


    
    const allFiches = fiches.map((fiche, i) => {

        // Redirection si pas de user connecté
        if (!props.idUser) {
            return <Redirect to='/' />
        };

        // Couleur du coeur
        let coeur;
        if (props.myFavorisList.some(e => e._id === fiche._id)) {
            coeur = faHeartFull;
        } else {
            coeur = faHeart;
        };


        // Fonction de like/unlike
        const handleLiked = async (fiche) => {
            if (coeur === faHeart) {
                await fetch('/activities/add-fav', {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `ficheId=${fiche._id}&id=${props.idUser}`
              });
              props.addToFavoris(fiche);
            } else {
                await fetch('/dashboard/favoris/delete', {
                method: 'DELETE',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `idFavoris=${fiche._id}&idUser=${props.idUser}`
            });
            props.deleteToFavoris(fiche._id);
            }
        };
                
        // Conditions pour couleur keywords
        let keyword;
        let code1;
        let code2;
        if (fiche.inclusion) {
            keyword = 'inclusion';
            code1 = <span style={{ color: '#4ebdb4' }} >#{keyword}</span>
        } else if (fiche.déclusion) {
            keyword = 'déclusion';
            code1 = <span style={{ color: '#ba8688' }} >#{keyword}</span>
        } else if (fiche.émergence) {
            keyword = 'émergence';
            code1 = <span style={{ color: '#f6b134' }} >#{keyword}</span>
        } else if (fiche.convergence) {
            keyword = 'convergence';
            code1 = <span style={{ color: '#827af4' }} >#{keyword}</span>
        };

        if (fiche.inclusion && keyword !== 'inclusion' ) {
            code2 = <span style={{ color: '#4ebdb4' }} >#inclusion</span>
        } else if (fiche.déclusion && keyword !== 'déclusion') {
            code2 = <span style={{ color: '#ba8688' }} >#déclusion</span>
        } else if (fiche.émergence && keyword !== 'émergence') {
            code2 = <span style={{ color: '#f6b134' }} >#émergence</span>
        } else if (fiche.convergence && keyword !== 'convergence') {
            code2 = <span style={{ color: '#827af4' }} >#convergence</span>
        };        
        
        

    return (
        <Col key={i} xs={24} md={12} lg={8} xl={6} style={style.frame}>            
            <Card style={{ width: 350, backgroundColor: "#fcfcfc"}}>
                <div style={style.cardheads}>
                    <Avatar size={46} icon={<FontAwesomeIcon icon={fiche.digital ? faDesktop : faUsers } />} />
                    <h2 style={{ fontWeight: 'bold', margin: '0 auto', textAlign: 'center' }}>{fiche.title}</h2>
                </div>
                <p>{fiche.description}</p>
                <div style={style.buttons}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon style={{fontSize: 20}} color='#FED200' icon={faClock} />
                        <span style={{ marginLeft: 5 }}>{fiche.duration} min</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {code1}
                        {code2}
                    </div>
                    <FontAwesomeIcon style={{fontSize: 20, cursor: 'pointer'}} color='#e74c3c' icon={coeur} onClick={() => handleLiked(fiche)} />
                </div>
            </Card>
        </Col>
        )
    });


    return (
    <div>

    <Nav />

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
        alignItems: 'start',
        justifyContent: 'center',
        marginTop: 80
    },

    frame: {
        display: "flex",
        alignItems: 'flex-start',
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
    }
};

function mapStateToProps(state){
  return {myFavorisList: state.favorisList, idUser: state.idUser}
};

function mapDispatchToProps(dispatch){
  return {
    addToFavoris: function(fiche){
      dispatch({ type: 'addToFav',
        fiche: fiche })
    },
    saveFav: function(ficheList){
      dispatch({ type: 'saveFavoris',
        favorisActivites: ficheList })
    },
    deleteToFavoris: function(favorisId){
      dispatch({type: 'deleteFavoris',
        idFavoris: favorisId
      })
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activités);