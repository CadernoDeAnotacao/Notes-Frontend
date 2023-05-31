import React, {useState, useEffect} from 'react';

import api from './services/api';

import './global.css'
import './sidebar.css'
import './app.css'
import './main.css'

import Notes from './Componentes/Notes'
import RadioButton from './Componentes/Notes/RadioButton';

function App() {

  const [ selectedValue, setSelectedValue] = useState('all')
  const [ title, setTitles] = useState('')
  const [ notes, setNotes] = useState('')
  const [ allNotes, setAllNotes] = useState([])

  useEffect(() => {
    getAllNotes()
  }, [])

  async function getAllNotes(){
    const response = await api.get('/annotations',)
    setAllNotes(response.data)
  }

  async function loadNotes(option){
    const params = { priority: option}
    const response = await api.get('/priorities', { params })

    if(response){
      setAllNotes(response.data)
    }
  }

  function handleChange(e){
    setSelectedValue(e.value)

    if(e.checked && e.value !== 'all'){
      loadNotes(e.value)
    } else{
      getAllNotes()
    }
  }


   async function handleDelete(id){
    const deletedNote = await api.delete(`/annotations/${id}`)

    if(deletedNote){
      setAllNotes(allNotes.filter(note => note._id !== id))
      }
    }

   async function handleChangePriority(id){
    const changePriority = await api.post(`/priorities/${id}`)

    if(changePriority&& selectedValue !== 'all'){
      loadNotes(selectedValue)
      } else if (changePriority) {
        getAllNotes()
      }
    }

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

   

    if(selectedValue !== 'all'){
      getAllNotes()
    } else {
    //Atualizar na tela denamicamente
    setAllNotes([...allNotes, response.data])
    }
    setSelectedValue('all') 
    
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
        <RadioButton
        selectedValue={selectedValue}
        handleChange = {handleChange}
        />
      </aside>

      <main>
      <ul>
        {allNotes.map(data => (
        <Notes
        key={data._id}
        data ={data}
        handleDelete = {handleDelete}
        handleChangePriority = {handleChangePriority}
        
        />

        ))}
      </ul>
      </main>
    </div>
  );
}

export default App;
