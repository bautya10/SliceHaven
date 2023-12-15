/* eslint-disable react/prop-types */

const Search = ({ setPage, setSearching, setError}) => {

  const searcher = (e) => {
    const inputValue = e.target.value;
    
    if (inputValue.length >= 3) {
      setPage(`&page=1`);
      setSearching(`&userName=${inputValue}`);
    } else {
      setPage('');
      setSearching('');
    }
    setError(false);
  };

  return (
    <div className='d-flex justify-content-center'>
      <input
    className="form-control w-50"
    type="text"
    placeholder="Buscar por nombre de usuario..."
    onChange={searcher}
      />
  </div>
  )
}

export default Search