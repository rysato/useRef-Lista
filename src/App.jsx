import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const inputRef = useRef();
  const [produtos, setProdutos] = useState([]);

  function adicionarProduto() {
    const novoProduto = {
      id: uuidv4(),
      nome: inputRef.current.value
    };
    setProdutos([novoProduto, ...produtos]);
    inputRef.current.value = '';
  }
  function deletarProduto(id) {
    console.log("Deletando o item:", id);
    const novaLista = produtos.filter(produto => produto.id !== id);
    setProdutos(novaLista);
  }
  return (
    <div>
      <h1>Lista de Compras</h1>
      <input placeholder="Produto..." ref={inputRef} />
      <button onClick={adicionarProduto}>Adicionar</button>
      {produtos.map((produto) => (
        <div key={produto.id} style={{ marginTop: '10px', padding: '5px' }}>
            <span>{produto.nome}</span> 
            <button 
                onClick={() => deletarProduto(produto.id)} 
                style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                X Deletar
            </button>
        </div>
      ))}
    </div>
  );
}

export default App;