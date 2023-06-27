import React, { useReducer, useState, useEffect } from "react"
import { useContext } from "react"
import reducer from "./Reducer"

const initialState = {
  isLoading: true,
  query:"CSS",
  nbPages :0,
  page:0,
  hits:[],
}

// 1-> context creation
// 2-> we need "provider" - takes data fm parent to resp child
// consumer(removed) - child component
// 3-> useConstext Hook (used insed of consumer)

// 1->
const AppContext = React.createContext()

// 2-> to create a provider function
// include it as a parent 
// {children} - whole react application (whole data)
// *** now wrap <app/> in index.js with appProvider
const AppProvider = ({children})=>{

  // const [state,setState]=useState(initialState)
  // UseState is replaced by useReducer
  const [state,dispatch]=useReducer(reducer,initialState)

  let API = "http://hn.algolia.com/api/v1/search?"

  const fetchApiData = async (url)=>{

    dispatch({type:"SET_LOADING"})

    try {
      const res = await fetch(url)
      // now convert the response to readable format(json)
      const data= await res.json();
      console.log(data);
      
      // dispatch sends the data to action in Reducer method
      dispatch({type:"GET_STORIES" ,   //Operation Name
                payload:{ //To Share extra info(hits)
                  hits:data.hits,
                  nbPages: data.nbPages,
                }
              })
    } catch (error) {
      console.log(error) 
    }
  }

  // to remove the post
  const removePost = (post_ID)=>{
    dispatch({type:"REMOVE_POST",payload: post_ID})
  }

  // search
  const searchPost = (searchQuery) =>{
    dispatch({
      type:"SEARCH_QUERY",
              payload:searchQuery,
            })
  }

  // Pagination
  const getNextPage = ()=>{
    dispatch({
      type:'NEXT_PAGE'
    })
  }

  const getPrevPage = ()=>{
    dispatch({
      type:'PREV_PAGE',
    })
  }

  // used to load first time when we come to website
  useEffect(()=>{
    fetchApiData(`${API}query=${state.query}&page=${state.page}`)
  },[state.query,state.page]);
    
  
  return (
    <AppContext.Provider value={{...state,removePost,searchPost, getNextPage, getPrevPage }}>
      {children}
    </AppContext.Provider>
  )
}

// custom hook creation
const useGlobalContext = ()=>{
  return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext }

