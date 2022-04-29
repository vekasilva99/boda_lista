import React, { useState, useEffect } from "react";
import logo from './logo.png';
import './App.css';
import axios from "axios";

const App=()=> {
  const [invitados, setInvitados] = useState([]);
  const [filtro, setFiltro] = useState(5);
  const [invitadosFiltrados, setInvitadosFiltrados] = useState([]);

  const [loading, setLoading] = useState(true);


  const getInvitados = async () => {
    const options = {
      url: `https://bodabackend.herokuapp.com/invitaciones`,
      method: "GET",
      headers: {},
    };
    let res = await axios(options)
      .then((resp) => {
        console.log(resp);
        if(invitados.length==0){
          setInvitados(resp.data.data);
          setInvitadosFiltrados(resp.data.data);
        }
        

        return { status: 200 };
      })
      .catch((error) => {
        return { status: error.response.status };
      });
    setLoading(false);
    return res;
  };

const getNroInvitados=(invitados)=>{
let aux=0

invitados.map((element)=>{
  aux+=element.invites
})
return aux
}

const getNroRSVP=(invitados)=>{
  let aux=0
  
  invitados.map((element)=>{
    aux+=element.rsvp
  })
  return aux
  }
  const filtrar =(e)=>{
    e.preventDefault()
  console.log('kjnhgyftghjk',e.target.value)
  
    if(e.target.value==='1'){
      console.log("jnhbghbjnkjjj")
      setInvitadosFiltrados(invitados.filter((element)=> {return element.respondido===false}))
    }else if(e.target.value==='2'){
      setInvitadosFiltrados(invitados.filter((element)=> {return element.respondido===true}))
    }else if(e.target.value==='3'){
      setInvitadosFiltrados(invitados.filter((element)=> {return element.respondido===true && element.invites===element.rsvp}))
    }else if(e.target.value ==='4'){
      setInvitadosFiltrados(invitados.filter((element)=> {return element.respondido===true && element.invites!=element.rsvp}))
    }else{
      console.log("jnhbghbjnkjjj")
      setInvitadosFiltrados(invitados)
    }
    setFiltro(e.target.value)
  }
  const getRSVP=(respondido)=>{
if(respondido){
  return "RSVP"
}else{
  return "Sin respuesta"
}
  }

  useEffect(() => {
    setTimeout(() => {
      getInvitados();
    }, 3000);
  }, []);
  return (
    <>
      <div
        className={loading ? "loader-container visible" : "loader-container"}
      >
        <img src={logo} className="logo-load" alt="logo" />
        <div className="overlay"></div>
      </div>
    <div className="App">

        <img src={logo} className="logo" alt="logo" onClick={()=>{filtrar()}} />
        <div className="option-bar">
        <h1>{getNroRSVP(invitados)}/{getNroInvitados(invitados)}</h1>
        <select value={filtro} onChange={(e)=>{e.preventDefault();filtrar(e)}}>
          <option value={'1'}>Sin Responder</option>
          <option value={'2'}>Respondido</option>
          <option value={'3'}>RSVP Completos</option>
          <option value={'4'}>RSVP Incompletos</option>
          <option value={'5'}>Ver Todos</option>
        </select>
        </div>
        <div className="table-container">
          <div className="row titulo">
            <div className="column titulo"><h1>Nombre</h1></div>
            <div className="column titulo"><h1>Invitados</h1></div>
            <div className="column titulo"><h1>Asistencia</h1></div>
            <div className="column titulo"><h1>RSVP</h1></div>
          </div>
          {invitadosFiltrados.length>0 ?
          <>
          {invitadosFiltrados.map((element)=>{
            return    <div className="row">
            <div className="column content first"><h1>{element.titulo}</h1></div>
            <div className="column content"><h1>{element.invites}</h1></div>
            <div className="column content"><h1>{element.rsvp}</h1></div>
            <div className="column content"><h1>{getRSVP(element.respondido)}</h1></div>
          </div>
          })}
          </>:<div className="row"><h2>Lista Vacía</h2></div>}
       
        </div>
    </div>
    </>
  );
}

export default App;
