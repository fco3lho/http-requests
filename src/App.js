import './App.css';
import { useState, useEffect } from "react"

import {useFetch} from './hooks/useFetch'

const url = "http://localhost:3000/products"

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("")

  // -------------------------------------- GET - READ -------------------------------------- 
  const {data: items, httpConfig, loading, error} = useFetch(url) //Essa função localizada em "/hooks/useFetch" substitui a função "useEffect()" abaixo.

  // -------------------------------------- POST - CREATE -------------------------------------- 
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price
    }

    // -------------------------------------- PUT - UPDATE -------------------------------------- 
    httpConfig(product, "POST")
    setName("") //Limpa o campo do input Name
    setPrice("") //Limpa o campo do input Price
  }

  // -------------------------------------- DELETE -------------------------------------- 
  const handleRemove = (id) => {
    httpConfig(id, "DELETE")
  }

  // HTML
  return (
    <div className="App">
      <h1>Lista de produtos</h1>

      {/* -------------------------------------- Loading -------------------------------------- */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}

      {/* -------------------------------------- GET -------------------------------------- */}
      {!error && (
        <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
            <button onClick={() => handleRemove(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      )}

      {/* -------------------------------------- POST -------------------------------------- */}
      <div className="add-product">
          <form onSubmit={handleSubmit}>
            <label>
              Nome: 
              <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)}/>

              Preço: 
              <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)}/>

              {loading && (<input type="submit" value="Aguarde" disabled/>)}
              {!loading && (<input type="submit" value="Criar"/>)}
            </label>
          </form>
      </div>
    </div>
  );
}

export default App;
