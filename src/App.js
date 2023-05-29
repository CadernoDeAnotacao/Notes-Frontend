import React, {useState, useEffect} from 'react';

import api from './services/api';

import './global.css'
import './sidebar.css'
import './app.css'
import './main.css'

import Notes from './Componentes/Notes'
import RadioButton from './Componentes/Notes/RadioButton';

function App() {

  const [ title, setTitles] = useState('')
  const [ notes, setNotes] = useState('')
  const [ allNotes, setAllNotes] = useState([])

  useEffect(() => {
    async function getAllNotes(){
      const response = await api.get('/annotations',)
      setAllNotes(response.data)
    }

    getAllNotes()
  }, [])

  async function handleSubmit(e){
    e.preventDefault()

    const response = await api.post('/annotations',{
      title,
      notes,
      priority: false
    })
    //Para limpar os campos
    setTitles('') 
    setNotes('')

    //Atualizar na tela denamicamente
    setAllNotes([...allNotes, response.data])
  }

  //Função para trocar a cor do botão salvar
  useEffect( () =>{
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit')
      btn.style.background = 'rgba(43, 54, 65, 0.3)'
      if(title && notes){
        btn.style.background = 'rgb(43, 54, 65)' 
      }
    }
    enableSubmitButton()
  })

  return (
    <div id='app'>
      <aside>
        <strong>Caderno de notas</strong>
        <form onSubmit={handleSubmit}>
         <div className='input-block'>
          <label htmlFor='title'>Título da anotação</label>
          <input required value={title} onChange={e => setTitles(e.target.value)} maxLength={30} />
         </div>

         <div className='input-block'>
          <label htmlFor='nota'>Anotações</label>
          <textarea required value={notes} onChange={e => setNotes(e.target.value)}/>
         </div>
         <button id='btn_submit' type='submit'>Salvar</button>
        </form>
        <RadioButton/>
      </aside>

      <main>
      <ul>
        {allNotes.map(data => (
        <Notes data ={data}/>
        ))}
      </ul>
      </main>
    </div>
  );
}

export default App;
