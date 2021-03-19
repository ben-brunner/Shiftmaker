import React, { useEffect, useState } from "react";


import Nav from "../components/Nav";
import { Row, Col, Card, Button, Modal, Input } from "antd";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from "react-router-dom";

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { EditOutlined } from "@ant-design/icons";

function DashboardFavoris(props) {

  const [notesEmpty, setNotesEmpty] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleNote, setTitleNote] = useState('')
  const [contentNote, setContentNote] = useState('')
  

  useEffect(() => {

    const findUser = async () => {
      const data = await fetch(`/dashboard?id=${props.match.params.id}`)
      const body = await data.json()
      if (body.user.notes === undefined) {
        setNotesEmpty(false)
      } else {
        props.saveNotes(body.user.notes)
        setNotesEmpty(true)
      }
    }
    findUser()

  }, [])

  const handleClickDelete = async (idNote) => {

    props.deleteToNotes(idNote)

    const deleteReq = await fetch('/dashboard/notes/delete', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `idUser=${props.idUser}&idNote=${idNote}`
    })

  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    const data = await fetch('/dashboard/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titleFromFront=${titleNote}&contentFromFront=${contentNote}&idUser=${props.idUser}`
    })
    const body = await data.json()
    props.addToNotes({title: titleNote, content: contentNote})

    setTitleNote('');
    setContentNote('');

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!props.idUser) {
    return <Redirect to='/' />
  };

  var notesDisplay;

  if(notesEmpty == false){

    notesDisplay = <p>Pas de notes</p>

  }else{
    var notesDisplay = props.myNotesList.map((note, i) => {

      return (
        <Col xs={24} lg={12} key={i} style={{ marginTop: 10, display: "flex", alignItems: "center", marginBottom: 30 }}>
          <Card style={style.cardNotes}>
            <h2 style={{ fontWeight: 'bold', fontSize: 18, marginTop: 5, textAlign: "center" }}>{note.title}</h2>
            <p style={{ fontSize: 13, marginTop: -8, wordBreak: "break-all" }}>{note.content}</p>
          </Card>
          <FontAwesomeIcon style={{ fontSize: 20, marginLeft: 20 }} color='black' icon={faTrashAlt} onClick={() => handleClickDelete(note._id)} />
  
        </Col>
      )
    })
  }

  return (
    <div>
      <Nav />

      <Row>
        <Col
          xs={24}
          lg={24}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={style.h2}>Mes Notes</h2>
          <div style={style.bloc_div}>
            <Button
              color="primary"
              onClick={() => showModal()}
              icon={<EditOutlined  />}
            >
              Ajoutez une note
            </Button>
            <Modal
              title="Ajoutez une note"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h3 style={{ textAlign: "center" }}>Titre:</h3>
              <Input
                className="Login-input"
                onChange={(e) => setTitleNote(e.target.value)}
                value={titleNote}
                placeholder="titre"
              />
              <h3 style={{ textAlign: "center" }}>Description</h3>
              <Input
                className="Login-input"
                onChange={(e) => setContentNote(e.target.value)}
                value={contentNote}
                placeholder="description"
                style={{ width: 400, height: 200 }}
              />
            </Modal>
            <Row
              style={{ width: 800, display: "flex", justifyContent: "center" }}
            >
              {notesDisplay}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const style = {
  h2: {
    fontWeight: "bold",
    fontSize: 60,
    marginTop: 60,
    textAlign: "center"
  },
  bloc_div: {
    width: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  insideBox_div: {
    height: 200,
    width: 500,
    marginBottom: 20,
    boxShadow: "8px 9px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  cardNotes: {
    width: 350,
    boxShadow: "8px 9px 4px rgba(0, 0, 0, 0.25)",
    wordBreak: "break-all",
    display: "flex",
    justifyContent: "center"
  }
}

function mapStateToProps(state) {
  return { myNotesList: state.notesList, idUser: state.idUser }
}

function mapDispatchToProps(dispatch) {
  return {

    saveNotes: function (notesList) {
      dispatch({
        type: 'saveNotes',
        notes: notesList
      })
    },
    addToNotes: function (newNote) {
      dispatch({
        type: 'addNotes',
        noteInput: newNote
      })
    },
    deleteToNotes: function (IdNote) {
      dispatch({
        type: 'deleteNotes',
        idNote: IdNote
      })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardFavoris);