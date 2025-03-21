import { useState, useEffect } from 'react';

function Cadastro() {
  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [nome, setNome] = useState('');
  const [corFundo, setCorFundo] = useState('#ffffff');

  useEffect(() => {
    const nomeStorage = localStorage.getItem('@nomeUsuario');
    if (!nomeStorage) {
      const nomeUsuario = prompt('Qual é o seu nome?');
      if (nomeUsuario) {
        setNome(nomeUsuario);
        localStorage.setItem('@nomeUsuario', nomeUsuario);
      }
    } else {
      setNome(nomeStorage);
    }

    const tarefasStorage = localStorage.getItem('@tarefas');
    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }

    const corStorage = localStorage.getItem('@corFundo');
    if (corStorage) {
      setCorFundo(corStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  useEffect(() => {
    localStorage.setItem('@corFundo', corFundo);
  }, [corFundo]);

  function handleRegistro(e) {
    e.preventDefault();
    setTarefas([...tarefas, input]);
    setInput('');
  }

  function handleCorChange(e) {
    setCorFundo(e.target.value);
  }

  return (
    <div style={{ backgroundColor: corFundo, minHeight: '100vh', padding: '20px' }}>
      <h1>{nome}, sua lista de tarefas</h1>
      <form onSubmit={handleRegistro}>
        <input 
          type="text" 
          placeholder="Digite uma tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li>
        ))}
      </ul>
      <div>
        <h2>Escolha uma cor de fundo:</h2>
        <label>
          <input type="radio" name="cor" value="#ffffff" onChange={handleCorChange} checked={corFundo === '#ffffff'} /> Branco
        </label>
        <label>
          <input type="radio" name="cor" value="#ffcccb" onChange={handleCorChange} checked={corFundo === '#ffcccb'} /> Vermelho Claro
        </label>
        <label>
          <input type="radio" name="cor" value="#add8e6" onChange={handleCorChange} checked={corFundo === '#add8e6'} /> Azul Claro
        </label>
        <label>
          <input type="radio" name="cor" value="#90ee90" onChange={handleCorChange} checked={corFundo === '#90ee90'} /> Verde Claro
        </label>
      </div>
    </div>
  );
}

export default Cadastro;
