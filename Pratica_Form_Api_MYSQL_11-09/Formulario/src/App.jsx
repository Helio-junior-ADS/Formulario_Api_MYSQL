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
  const [select, setSelect] = useState([]);

  const captureValue = (value) => {
    return setDados((dados) => ({
      ...dados,
      [value.target.name]: value.target.value,
    }));
  };

  const insertValue = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("http://localhost:3333/message", dados, headers)
      .then((response) => {
        setMessage(response.data.message);

        setDados({
          nome: "",
          email: "",
          subject: "",
          content: "",
        })
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  const showMessage = async () => {
    await axios.get('http://localhost:3333/message/').then((response) => {
      setSelect(response.data);
      console.log(response.data)
    }).catch(() => {

    })
  }

  return (
    <div>
      <h2> Formulário</h2>
      {message ? <p>{message}</p> : ""}
      <form onSubmit={insertValue}>
        <label>Nome: </label>
        <input
          type="text"
          name="nome"
          placeholder="Insira seu nome"
          onChange={captureValue}
          value={dados.nome}
        />
        <br />
        <br />

        <label>E-mail: </label>
        <input
          type="email"
          name="email"
          placeholder="Insira seu email"
          onChange={captureValue}
          value={dados.email}
        />
        <br />
        <br />

        <label>Assunto: </label>
        <input
          type="text"
          name="subject"
          placeholder="Insira seu assunto"
          onChange={captureValue}
          value={dados.subject}
        />
        <br />
        <br />

        <textarea
          name="content"
          cols="30"
          rows="10"
          onChange={captureValue}
          value={dados.content}
        ></textarea>
        <br />
        <br />

        <button type="submit">ENVIAR</button><br /><br />
      </form>
      <button onClick={showMessage}>BUSCAR</button>
      <ul>{select.map((item,)=>{
        return(
          <div>
            <h1>{item.id}</h1>
            <li>{item.nome}</li>
            <li>{item.email}</li>
            <li>{item.subject}</li>
            <li>{item.content}</li>
          </div>
        )
      })}</ul>
    </div>
  );
}

export default App;
