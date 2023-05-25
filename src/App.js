import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, InputGroup } from "react-bootstrap";
import axios from "axios";



function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data,setdata] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const [action,setAction] = useState("");

  


const handleCreate = async (e)=>{
  e.preventDefault();
  const newForm={"name":e.target[1].value,"code":e.target[0].value,"description":e.target[2].value}
  console.log(newForm);

  /*const res = await fetch("http://chatdoc.eastus.cloudapp.azure.com:8000/api/form",{
    "method":"POST",
    "headers":{"Content-Type":"application/json"},
    "body":newForm
  });*/

  axios.post("http://chatdoc.eastus.cloudapp.azure.com:8000/api/form",newForm).then(()=>{
    setShow(false);
    fetchForms();
  });
}

const fetchForms = async ()=>{
  const response =await fetch("http://chatdoc.eastus.cloudapp.azure.com:8000/api/form");
  const forms = await response.json();
  console.log(forms);

  setdata(forms);
  setFilteredData(forms);
}






useEffect(()=>{
  fetchForms();
},[])

  return (
    <>
    <div className="p-3">
    <h1 className="text-center mt-4 mb-4">Formularios</h1>
      <div class="row">
        <div class="col-2">
          <Button variant="primary" onClick={handleShow} className="mb-2">
            Añadir
          </Button>
        </div>
        <div class="col-10">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buscar en formularios"
              aria-label="Buscar en formularios"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              Buscar
            </Button>
          </InputGroup>
        </div>
      </div>

      <Table striped bordered hover>
        <thead className="bg-secondary text-white">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((form)=>{
            return(<tr>
                      <td>{form.code}</td>
                      <td>{form.name}</td>
                      <td>{form.description}</td>
                      <td>
                        <Button variant="primary">Edit</Button>
                        <Button variant="secondary" type="button" onClick={()=>{

                            console.log("Elminando:" + form.id);
                            axios.delete(`http://chatdoc.eastus.cloudapp.azure.com:8000/api/form/${form.id}`).then(()=>{
                              fetchForms();
                            });;

                        }}>Delete</Button>
                      </td>
            </tr>)
          })}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir nuevo formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Code</Form.Label>
              <Form.Control type="text" placeholder="Código" />
              <Form.Text className="text-muted">Error código</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Nombre" />
              <Form.Text className="text-muted">Error Nombre</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Descripcción" />
              <Form.Text className="text-muted">Error Descripcción</Form.Text>
            </Form.Group>

            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    
    </>
  );
}

export default App;
