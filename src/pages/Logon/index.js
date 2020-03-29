import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import './styles.css'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
  const [id, setId] = useState('')
  const histoty = useHistory()

  async function handleLogin (event) {
    event.preventDefault()

    try {
      const res = api.post('sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', (await res).data.name)
      history.pushState('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"></img>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          ></input>
          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041"></FiLogIn>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"></img>
    </div>
  )
}
