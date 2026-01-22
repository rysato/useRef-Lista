import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const inputRef = useRef();
  const [produtos, setProdutos] = useState([]);
  const API_URL = "http://localhost:3001/produtos";

  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
      }
    }
    carregarDados();
  }, []);

  async function adicionarProduto() {
    const nomeValor = inputRef.current.value;
    if (!nomeValor) return;

    const novoProduto = {
      id: uuidv4(),
      nome: nomeValor
    };

    setProdutos([novoProduto, ...produtos]);
    inputRef.current.value = '';

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto)
    });
  }

  async function deletarProduto(id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    const novaLista = produtos.filter(produto => produto.id !== id);
    setProdutos(novaLista);
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Lista de Compras</h1>

        <div className="input-group">
          <input placeholder="Adicionar Produtos" ref={inputRef} className="input-field" />
          <button onClick={adicionarProduto} className="add-button">
            Adicionar
          </button>
        </div>

        <div>
          {produtos.length === 0 && (<p className="empty-msg">Sua lista está vazia.</p>)}
          {produtos.map((produto) => (
            <div key={produto.id} className="item">
              <span className="item-text">{produto.nome}</span>
              <button onClick={() => deletarProduto(produto.id)} className="delete-button">
                ✕ Deletar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;