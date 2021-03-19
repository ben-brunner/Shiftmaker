import React, { useState } from "react";
import { Form, Input, Button , Image, Popover, Modal} from 'antd';
import { Link, Redirect } from "react-router-dom";

import "./style.css";
import {
  SaveFilled,
  InfoCircleOutlined,
  PropertySafetyFilled,
  BulbOutlined,
} from "@ant-design/icons";

import {connect} from "react-redux"

function Cadrage(props) {
  

  /* pour formulaire */
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };
  /* ajouts d'info pour les popover   */
  const immateriel =
    "Pensez modes de fonctionnement du groupe, partage d'infos, modes de prise de décision, gestion des désaccords... ";
  const enjeux =
    "Ce qui est à gagner si vous réussissez, au-delà de l'atelier. Pensez dynamique psycho-sociale.";
  const livrables =
    "Concrètement, avec quoi souhaitez-vous repartir de l'atelier ? à qui livrerez-vous votre production ?";

  /*les états pour gérer les questions  */
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");
  const [q7, setQ7] = useState("");

  

  const [isModalVisible, setIsModalVisible] = useState(true);
   const handleOk = () => {
     setIsModalVisible(false);
   };

   const handleCancel = () => {
     setIsModalVisible(false);
   };


   if (!props.idUser) {
    return <Redirect to='/' />
  };



  return (
    <div className="page">
      <Modal
        title="Un mot pour aider"
        mask={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        icon={<BulbOutlined className="icon" />}
      >
        <BulbOutlined className="icon"  />
        Pense à garder une marge de temps entre les différentes séquences
      </Modal>
      <div style={style.title}>
        <Image width={30} src="./assets/Logo.png"/>
        <h2 className="intro" style={{marginLeft: 10}}>
          {props.name}, prenons un moment pour cadrer ton atelier :
        </h2>
      </div>

      <div>
        <Form {...layout} name="basic" initialValues={{ remember: true }}>
          <Form.Item
            label="Quel nom pour ton atelier ?"
            name="Q1"
            rules={[
              {
                required: true,
                message: "vous devez entrer un titre à votre atelier!",
              },
            ]}
          >
            <Input
              placeholder="Un titre pour le retrouver aisément dans son historique"
              onChange={(e) => setQ1(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Quels sont les enjeux ?" name="Q2">
            <Input
              onChange={(e) => setQ2(e.target.value)}
              placeholder="Ce qui est à gagner, à perdre... "
              prefix={
                <Popover title="Enjeux ? " content={enjeux}>
                  <InfoCircleOutlined
                    className="icon"
                    style={{ color: "#D18809" }}
                  />
                </Popover>
              }
            />
          </Form.Item>
          <Form.Item label="Quels sont les livrables attendus ?" name="Q3">
            <Input
              placeholder="Le QUOI ? "
              onChange={(e) => setQ3(e.target.value)}
              prefix={
                <Popover title="Extra information" content={livrables}>
                  <InfoCircleOutlined
                    className="icon"
                    style={{ color: "#D18809" }}
                  />
                </Popover>
              }
            />
          </Form.Item>

          <Form.Item
            label=" Quels apprentissages collectifs souhaitez-vous produire ?"
            name="Q4"
          >
            <Input
              placeholder="L'ambiance, les modes de fonctionnement rêvés..."
              onChange={(e) => setQ4(e.target.value)}
              prefix={
                <Popover
                  title="Apprentissages Collectifs ?"
                  content={immateriel}
                >
                  <InfoCircleOutlined
                    className="icon"
                    style={{ color: "#D18809" }}
                  />
                </Popover>
              }
            />
          </Form.Item>
          <Form.Item label=" Où cela va se dérouler  ?" name="Q5">
            <Input
              placeholder="Visio ? Présentiel ? Extérieur ? ..."
              onChange={(e) => setQ5(e.target.value)}
            />
          </Form.Item>
          <Form.Item label=" Combien de personnes seront présentes ?" name="Q6">
            <Input
              placeholder="Nombre"
              onChange={(e) => setQ6(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label=" Combien de temps au total va durer l'atelier ? "
            name="Q7"
          >
            <Input
              placeholder="En minutes"
              onChange={(e) => setQ7(e.target.value)}
            />
          </Form.Item>
        </Form>
        <div className="modalbutton">
          <Link to="/Atelier">
            <Button
              icon={
                <SaveFilled style={{ color: "#F9F9F9" }} className="icon" />
              }
              style={{
                backgroundColor: "#2182C6",
                borderRadius: 50,
                color: "#F9F9F9",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => props.saveCadrage(q1, q2, q3, q4, q5, q6, q7)}
            >
              Enregistrer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const style = {
  body: {
    backgroundColor: "#F9F9F9",
    height:'100vh'
  },
  formItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    display: "flex",
    justifyContent: "center", 
    alignItems :"center"
  },
};

function mapDispatchToProps(dispatch){
  return {
    saveCadrage :function (q1, q2, q3, q4, q5, q6, q7){
      dispatch({ type: "saveCadrage", q1:q1, q2:q2, q3:q3, q4:q4, q5:q5, q6:q6, q7:q7 });
    }
  }
}

function mapStateToProps(state) {
  return { idUser: state.idUser, name: state.nameUser }
}

export default connect (
  mapStateToProps, 
  mapDispatchToProps
)(Cadrage);

