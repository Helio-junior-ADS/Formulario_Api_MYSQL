import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [user, setUser] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(()=>{
    getUsers();
  },[])

  const getUsers = () => {
    axios.get('http://localhost:3333/message/').then((response)=>{
     /*  console.log(response.data[0].nome) */
      setUser(response.data)
      setNome(response.data[0].nome)
      setEmail(response.data[0].email)
      setSubject(response.data[0].subject)
      setContent(response.data[0].content)
      setUserId(response.data[0].id)

    }).catch((err)=>{
      console.log("Error",err)
    })
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3333/message/${id}`).then((response)=>{
      console.log(response.data.message);
      getUsers()
    }).catch(()=>{

    })

  }
  
  const selectUser = (id) => {
    const item = user[id-1];
    setNome(item.nome);    
    setEmail(item.email);
    setSubject(item.subject);
    setContent(item.content);
  }

  const updateUser = () => {
    const item = {nome,email,subject,content}
    const headers = {
      headers : {
        "Content-Type":"application/json"
      }
    }
    axios.put(`http://localhost:3333/message/${userId}`,item,headers).then((response)=>{
      console.warn(response.data.message);
      getUsers()
    }).catch((err)=>{
      console.warn("Error",err);
    });
  }

  return (
    <div>
     <h1>Atualização de FORMULÁRIO com API</h1>
     <table border='1' >
      <tbody>
        <tr>
          <td>ID</td>
          <td>NOME</td>
          <td>E-MAIL</td>
          <td>ASSUNTO</td>
          <td>CONTEÚDO</td>
        </tr>
        {
          user.map((item,i)=>(
            <tr key={i}>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.email}</td>
            <td>{item.subject}</td>
            <td>{item.content}</td>
            <td><button onClick={()=> deleteUser(item.id)}>Delete</button></td>
            <td><button onClick={()=>selectUser(item.id)}>Update</button></td>
            
          </tr>
          ))
        }
      </tbody>
     </table><br /><br />
     <div>
      <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}} /><br/><br/>
      <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} /><br/><br/>
      <input type="text" value={subject} onChange={(e)=>{setSubject(e.target.value)}} /><br/><br/>
      <input type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} /><br/><br/>
      <button onClick={updateUser}>Update User</button>
     </div>
    </div>
  )
}

export default App
