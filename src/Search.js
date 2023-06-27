import React from 'react'
import { useGlobalContext } from './Context'

const Search = () => {
  const {query , searchPost} = useGlobalContext();

  return (
    <div>
      <h1>Tech Blog</h1>
      <form>
        <div>
          <input type="text" placeholder='search here'
            value={query} 
            onChange={(e)=> searchPost(e.target.value)}
            />
        </div>
      </form>
    </div>
  )
}

export default Search