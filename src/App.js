import './App.css';
import React, { useContext } from 'react'
import Search from './Search';
import Pagination from './Pagination';
import Stories from './Stories';
import "./App.css"

// import { useContext } from 'react';
// import { AppContext } from './Context';
// REPLACED BY CUSTOM HOOK IN "context.js"
import { useGlobalContext } from './Context';

const App =()=>{
  // const data= useContext(AppContext)
  // const data = useGlobalContext()
  return (
    <>
      <Search/>
      <Pagination/>
      <Stories/>
    </>
  )
}


export default App;
