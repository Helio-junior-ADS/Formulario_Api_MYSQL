import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    subject: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [show, setShow] = useState([]);

  const handleValues = (e) => {
    return setDados((dados) => ({
      ...dados,
      [e.target.name]: e.target.value,
    }));
  };

  const showMsg = async (e) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    e.preventDefault();

    await axios
      .post("http://localhost:3000/message", dados, headers)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        console.log("Error", err);
      });

    setDados({
      nome: "",
      email: "",
      subject: "",
      content: "",
    });
  };

  const getAll = async () => {

    await axios.get('http://localhost:3000/message').then((response)=>{
      setShow(response.data)
    }).catch((err)=>{
      console.log('Error',err)
    })
  };

  return (
    <div>
      <h2>Formulário</h2>

      {message ? <p>{message}</p> : ""}

      <form onSubmit={showMsg}>
        <label>Nome: </label>
        <input
          type="text"
          placeholder="Insira seu nome"
          name="nome"
          value={dados.nome}
          onChange={handleValues}
        />
        <br />
        <br />

        <label>E-mail: </label>
        <input
          type="email"
          placeholder="Insira seu e-mail"
          name="email"
          value={dados.email}
          onChange={handleValues}
        />
        <br />
        <br />

        <label>Subject: </label>
        <input
          type="text"
          placeholder="Insira seu assunto"
          name="subject"
          value={dados.subject}
          onChange={handleValues}
        />
        <br />
        <br />

        <textarea
          cols="30"
          rows="10"
          name="content"
          value={dados.content}
          onChange={handleValues}
        ></textarea>
        <br />
        <br />

        <button type="submit">ENVIAR</button>
      </form><br /><br />
      <button onClick={getAll}>BUSCAR</button>
      <ul>{show.map((item)=>{
        return(
          <div>
            <li><p>{item.subject}</p></li>
            <li><p>{item.nome}</p></li>
            <li><p>{item.content}</p></li>
          </div>
        )
      })}</ul>
    </div>
  );
}

export default App;
