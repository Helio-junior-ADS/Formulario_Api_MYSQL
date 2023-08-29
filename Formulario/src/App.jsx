import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [dados, setDados] = useState({
    name: "",
    email: "",
    subject: "",
    content: "",
  });
  const [message, setMessage] = useState('');
  const [inf, setInf] = useState([]);

  const handleValue = (e) =>
    setDados((dados) => ({
      ...dados,
      [e.target.name]: e.target.value,
    }));

  const showForm = async (e) => {
    e.preventDefault();

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("http://localhost:3333/message", dados, headers).then((response) =>{

      setMessage(response.data.messagem);

      setDados({
        name: "",
        email: "",
        subject: "",
        content: "",
      })

    }).catch((err) => {
      setMessage(err.response.data.messagem)
    });

   

  };

  const getAll = async () => {
    await axios.get("http://localhost:3333/message").then((response) => {
      setInf(response.data);
      console.log(response.data);
    }).catch((err) => {
      console.log("Error",err);
    });
  }


 

  return (
    <div>
      <h1>Formulário</h1>

      {message ? <p>{ message }</p> : ''}

      <form onSubmit={showForm}>
        <label>Nome: </label>
        <input
          type="text"
          placeholder="Insira seu nome"
          name="name"
          onChange={handleValue}
          value={dados.name}
        />
        <br />
        <br />

        <label>E-mail: </label>
        <input
          type="email"
          placeholder="Insira seu e-mail"
          name="email"
          onChange={handleValue}
          value={dados.email}
        />
        <br />
        <br />

        <label>Assunto: </label>
        <input type="text" placeholder="Insira seu assunto" name="subject" onChange={handleValue} value={dados.subject}/>
        <br />
        <br />

        <label>Conteúdo: </label>
        <textarea
          name="content"
          cols="30"
          rows="10"
          onChange={handleValue}
          value={dados.content}
        ></textarea>
        <br />
        <br />

        <button type="submit">SEND</button>
      </form><br /><br />
      <div>
        <button onClick={getAll}>BUSCAR</button>
        <div>
          <ul>{inf.map((item)=>{
            return (
              <div>
                <li><h2>{item.name}</h2></li>
                <li><p>id:{item.id}</p></li>
                <li><p>Conteúdo:{item.content}</p></li>
              </div>
            )
          })}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
