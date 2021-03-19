import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "./murDisplayResult.css";


export default function Mur(props) {

  // Connexion Socket.io
  const socket = socketIOClient("http://localhost:3000/");

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [count5, setCount5] = useState(0);
  const [count6, setCount6] = useState(0);
  const [count7, setCount7] = useState(0);
  const [count8, setCount8] = useState(0);
  const [count9, setCount9] = useState(0);
  const [count10, setCount10] = useState(0);
  const [count11, setCount11] = useState(0);
  const [count12, setCount12] = useState(0);
  const [count13, setCount13] = useState(0);
  const [count14, setCount14] = useState(0);

  // UseEffect qui récupère les votes à l'ouverture de la page
  useEffect(() => {
    socket.emit('getCounts');
    socket.on('counts', (voteCountImg1, voteCountImg2, voteCountImg3, voteCountImg4, voteCountImg5, voteCountImg6, voteCountImg7, voteCountImg8, voteCountImg9, voteCountImg10, voteCountImg11, voteCountImg12, voteCountImg13, voteCountImg14)=> {
      setCount1(voteCountImg1);
      setCount2(voteCountImg2);
      setCount3(voteCountImg3);
      setCount4(voteCountImg4);
      setCount5(voteCountImg5);
      setCount6(voteCountImg6);
      setCount7(voteCountImg7);
      setCount8(voteCountImg8);
      setCount9(voteCountImg9);
      setCount10(voteCountImg10);
      setCount11(voteCountImg11);
      setCount12(voteCountImg12);
      setCount13(voteCountImg13);
      setCount14(voteCountImg14);
    });
  }, []);

  // Ecoutes du back Socket
  useEffect(() => {
    socket.on('countImg1', (voteCountImg1)=> {
      setCount1(voteCountImg1);
    });
  }, [count1]);
  useEffect(() => {
    socket.on('countImg2', (voteCountImg2)=> {
      setCount2(voteCountImg2);
    });
  }, [count2]);
  useEffect(() => {
    socket.on('countImg3', (voteCountImg3)=> {
      setCount3(voteCountImg3);
    });
  }, [count3]);
  useEffect(() => {
    socket.on('countImg4', (voteCountImg4)=> {
      setCount4(voteCountImg4);
    });
  }, [count4]);
  useEffect(() => {
    socket.on('countImg5', (voteCountImg5)=> {
      setCount5(voteCountImg5);
    });
  }, [count5]);
  useEffect(() => {
    socket.on('countImg6', (voteCountImg6)=> {
      setCount6(voteCountImg6);
    });
  }, [count6]);
  useEffect(() => {
    socket.on('countImg7', (voteCountImg7)=> {
      setCount7(voteCountImg7);
    });
  }, [count7]);
  useEffect(() => {
    socket.on('countImg8', (voteCountImg8)=> {
      setCount8(voteCountImg8);
    });
  }, [count8]);
  useEffect(() => {
    socket.on('countImg9', (voteCountImg9)=> {
      setCount9(voteCountImg9);
    });
  }, [count9]);
  useEffect(() => {
    socket.on('countImg10', (voteCountImg10)=> {
      setCount10(voteCountImg10);
    });
  }, [count10]);
  useEffect(() => {
    socket.on('countImg11', (voteCountImg11)=> {
      setCount11(voteCountImg11);
    });
  }, [count11]);
  useEffect(() => {
    socket.on('countImg12', (voteCountImg12)=> {
      setCount12(voteCountImg12);
    });
  }, [count12]);
  useEffect(() => {
    socket.on('countImg13', (voteCountImg13)=> {
      setCount13(voteCountImg13);
    });
  }, [count13]);
  useEffect(() => {
    socket.on('countImg14', (voteCountImg14)=> {
      setCount14(voteCountImg14);
    });
  }, [count14]);

/* calcul des % et des proportions de styles */

var totalVotes = count1 + count2 + count3 + count4 +count5+ count6 + count7 +count8 +count9 + count10+count11+count12+count13+count14;
props.passToParent(totalVotes);

var countTable = [count1, count2, count3, count4, count5, count6, count7, count8, count9, count10, count11, count12, count13, count14];

var size = [];
for(var i = 1; i<15; i++){

 var sizeBubble = Math.round((countTable[i-1] / totalVotes) * 40 + 20);
 size.push(sizeBubble)
 
}




var styles = [  {
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[0],
    height: size[0],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 130,
    left: 500,
  },
  {
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[1],
    height: size[1],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 200,
    left: 450,
  },
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[2],
    height: size[2],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 210,
    left: 580,
  },
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[3],
    height: size[3],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 200,
    left: 680,
  },
 {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[4],
    height: size[4],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 220,
    left: 280,
  },
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[5],
    height: size[5],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 350,
    left: 580,
  },
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[6],
    height: size[6],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 340,
    left: 180,
  },
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[7],
    height: size[7],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 340,
    left: 690,
  },
   {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[8],
    height: size[8],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 400,
    left: 95,
  },
   {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[9],
    height: size[9],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 480,
    left: 220,
  },
   {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[10],
    height: size[10],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 360,
    left: 500,
  },
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[11],
    height: size[11],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 460,
    left: 330,
  },
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[12],
    height: size[12],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 520,
    left: 410,
  },
   {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5A81C",
    width: size[13],
    height: size[13],
    borderRadius: "50%",
    fontWeight: "bold",

    position: "absolute",
    top: 500,
    left: 580,
  },];

  var styles2 = []
  console.log(countTable[1], "tablecount");
  
for(var j =0; j<14;j++){
    console.log(countTable[j], "countable");
if (countTable[j] == 0) {
  styles2[j] = { display: "none" };
} else {
  styles2[j] = styles[j];
  console.log("prout");
}
  }
  console.log(styles2, "style")

  return (
    <div style={style.body}>
      <div style={style.layout}>
        <div style={styles2[0]}> {count1} </div>
        <div style={styles2[1]}> {count2} </div>
        <div style={styles2[2]}> {count3} </div>
        <div style={styles2[3]}> {count4} </div>
        <div style={styles2[4]}> {count5} </div>
        <div style={styles2[5]}> {count6} </div>
        <div style={styles2[6]}> {count7} </div>
        <div style={styles2[7]}> {count8} </div>
        <div style={styles2[8]}> {count9} </div>
        <div style={styles2[9]}> {count10} </div>
        <div style={styles2[10]}> {count11} </div>
        <div style={styles2[11]}> {count12} </div>
        <div style={styles2[12]}> {count13} </div>
        <div style={styles2[13]}> {count14} </div>
      </div>
    </div>
  );
  
}


const style = {
  body: {},
  layout: {
    marginLeft: "auto",
    marginRight: "auto",

    backgroundImage: "url('./assets/mrFrite/mur.png')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    width: 800,
    height: 600,
    position: "relative",
  },
  marge: {
    marginRight: "auto",
    marginLeft: "auto",
  },

  positionButton: {
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
  },
};