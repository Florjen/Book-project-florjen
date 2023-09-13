import React from 'react'
import '../src/tailwind.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBooks'
import DeleteBook from './pages/DeleteBooks'
import CreateBook from './pages/CreateBooks'

const App = () => {
  return (
    <Routes>
    <Route path = '/' element = {<Home/>} />
    <Route path = '/books/create' element = {<CreateBook/>} />
    <Route path = '/books/details/:id' element = {<ShowBook/>} />
    <Route path = '/books/edit/:id' element = {<EditBook/>} />
    <Route path = '/books/delete/:id' element = {<DeleteBook/>} />
    </Routes>
  )
}

export default App
