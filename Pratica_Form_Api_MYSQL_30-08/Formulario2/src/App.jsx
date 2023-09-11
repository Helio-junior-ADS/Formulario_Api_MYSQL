import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    subject: "",
    content: "",
  });
  const [dadosUp, setDadosUp] = useState({
    nome: "",
    email: "",
    subject: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [messageUp, setMessageUp] = useState("");
  const [show, setShow] = useState([]);
  const [idValue, setIdValue] = useState();

  const handleValues = (e) => {
    return setDados((dados) => ({
      ...dados,
      [e.target.name]: e.target.value,
    }));
  };
  const handleValuesUp = (value) => {
    return setDadosUp((dadosUp) => ({
      ...dadosUp,
      [value.target.name]: value.target.value,
    }));
  };
  console.log(dadosUp);

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
    await axios
      .get("http://localhost:3000/message")
      .then((response) => {
        setShow(response.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  /*   useEffect(()=>{
    showById()
  },[]) */

  /*   const showById = async () => {
    return await axios
      .get(`http://localhost:3000/message/${users}`)
      .then((response) => {
        setInf(response.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }; */

  const updateMsg = async () => {
 /*    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const teste = {
      teste: {
        nome: "teste",
        email: "teste",
        subject: "teste",
        content: "teste",
      },
    }; */

    e.preventDefault();

    await axios
      .put(`http://localhost:3000/message/${2}/`, teste, headers)
      .then((response) => {
        setMessageUp(response.data.message);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
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
        <br />
      </form>
      <br />
      <br />
      <h2>UPDATE</h2>

      {messageUp ? <p>{messageUp}</p> : ""}

      <div>
        <label>id: </label>
        <input
          type="text"
          placeholder="Insira id"
          onChange={(evento) => {
            setIdValue(evento.target.value);
          }}
        />
      </div>
      <br />
      <form onSubmit={updateMsg}>
        <label>Nome: </label>
        <input
          type="text"
          name="nome"
          placeholder="Insira seu nome"
          onChange={handleValuesUp}
        />
        <br />
        <br />

        <label>E-mail: </label>
        <input
          type="text"
          name="email"
          placeholder="Insira seu email"
          onChange={handleValuesUp}
        />
        <br />
        <br />

        <label>Subject: </label>
        <input
          type="text"
          name="subject"
          placeholder="Insira seu assunto"
          onChange={handleValuesUp}
        />
        <br />
        <br />

        <textarea
          name="content"
          cols="30"
          rows="10"
          onChange={handleValuesUp}
        ></textarea>
        <br />
        <br />

        <button onClick={updateMsg}>UPDATE NOW</button>
      </form>
      <br />
      <br />
      <button onClick={getAll}>BUSCAR</button>
      <ul>
        {show.map((item) => {
          return (
            <div>
              <li>
                <h2>id:{item.id}</h2>
              </li>
              <li>
                <p>{item.nome}</p>
              </li>
              <li>
                <p>{item.email}</p>
              </li>
              <li>
                <p>{item.subject}</p>
              </li>
              <li>
                <p>{item.content}</p>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
