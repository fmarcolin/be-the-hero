import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile')
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return ( 
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={setTitle(e => e.target.value)}/>
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={setDescription(e => e.target.value)}/>
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={setValue(e => e.target.value)}/>

                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}