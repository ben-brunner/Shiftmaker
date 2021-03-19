import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {Input, Button, Row, Col, message} from 'antd';
import { connect } from 'react-redux';


function Home(props) {

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstTime, setFirstTime] = useState(false);
    const [logParticipant, setLogParticipant] = useState('');
    const [isParticipant, setIsParticipant] = useState(false);
    const [userInfos, setUserInfos] = useState({})


     /* Error Pop-up */
    let error = '';
    const warning = () => {
      console.log("erreur 1")
        message.warning(error);
    };

    // Sign In
    const handleSignIn = async () => {

    if (signInEmail !== '' && signInPassword !== '') {
      const raw = await fetch('/users/sign-in', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `email=${signInEmail}&password=${signInPassword}`
      });
      const response = await raw.json();
      const checkUser = response.userFound;
      console.log(`First time or not ? ${response.firstTime}`);
      setFirstTime(response.firstTime);
      setUserInfos(response.user)
      console.log(response.user);
      if (checkUser) {
        setIsLoggedIn(true);
        props.userLoggedIn(response.user._id);
        props.addName(response.user.firstname)
      } else {
       
        error = 'Email ou mot de passe incorrect';
        warning();
      };

    } else {
      
      error = 'Merci de renseigner les deux champs de connexion';
      warning();
    }
  };

    if (isLoggedIn && !firstTime) {
    return <Redirect to={`/dashboard/${userInfos._id}`} />
  } else if (isLoggedIn && firstTime) {
    return <Redirect to='/Welcome' />
  };

    // Connexion Participant
    const handleParticipant = async () => {
        if (logParticipant !== '') {
        const raw = await fetch('/users/join-in', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `code=${logParticipant}`
      });
      const rep = await raw.json();
      const checkCode = rep.match;
      if (checkCode) {
        setIsParticipant(true);
      } else {
        error = 'Code incorrect';
        warning();
      };
    } else {
      error = 'Merci de renseigner un code session';
      warning();
    }
  };

  if (isParticipant) {
    return <Redirect to='/murparticipant' />
  };

  return (

        <Row style={style.login}>
            <Col xs={24} md={12} style={style.butterfly}>    

                {/* Logo et texte d'accueil */}
                    <span style={{ color: '#000', fontWeight:'bold', fontSize: 22, marginBottom: 20 }}>Rejoins-nous, nouveau <span style={{ fontSize: 40 }}>Shiftmaker !</span></span>
                    <span style={{ color: '#000', fontWeight:'bold', fontSize: 22 }}>Nous allons t'aider à créer des ateliers "collectivement intelligents" pour que tu puisses ensuite les mettre en œuvre !</span>

            </Col>

            <Col xs={24} md={12} style={style.inputs}>

                {/* Champs login */}
                    <h1>Connexion</h1>

                    <Input style={{ marginBottom: 30, width: 300 }} placeholder="Email" onChange={(e) => setSignInEmail(e.target.value)} value={signInEmail} />

                    <Input.Password style={{ marginBottom: 20, width: 300}} placeholder="Mot de passe" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />

                    <Button href="#" type="primary" onClick={handleSignIn}>Se connecter</Button>



                {/* Champs participants */}
                    <h1 style={{ marginTop: 100 }}>Participant ? Rejoins ta session</h1>

                    <Input style={{ marginBottom: 30, width: 300 }} placeholder="Code session" onChange={(e) => setLogParticipant(e.target.value)} value={logParticipant}/>

                    <Button href="#" type="primary" onClick={handleParticipant}>Rejoindre session</Button>
                    
            </Col>
        </Row>
    
  );
}

// Styles

const style = {
    login: {
        display: "flex",
        flexDirection: 'row',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fafafa"
    },

    butterfly: {
        backgroundImage: "url('./assets/Logo.png')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: '50%',
        textAlign: 'center',
        padding: "50px",
    },

    inputs: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
};


// Redux
function mapDispatchToProps(dispatch) {
  return {
    userLoggedIn: function (userId) {
      dispatch({ type: 'addIdUser', user: userId })
    },
    addName: function(name){
      console.log(name);
      dispatch({type: 'saveName', name: name})
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
  )(Home);