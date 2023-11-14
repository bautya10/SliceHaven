import React from 'react'

const Search = ({ setPage, setSearching, setError}) => {

  const searcher = (e) => {
    setPage(`&page=1`);
    setSearching(`&userName=${e.target.value}`);
    setError(false)
    console.log(e.target.value)
  };

  return (
    <div className='d-flex justify-content-center'>
      <input
    className="form-control w-50"
    type="text"
    placeholder="Buscar..."
    onChange={searcher}
      />
  </div>
  )
}

export default Search