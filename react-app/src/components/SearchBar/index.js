import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineCloseSquare } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({ userList }) {
    
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);

        const newFilter = userList.filter(user => {
            return user.username.toLowerCase().includes(searchInput.toLowerCase())
        })

        if (searchInput === ''){
            setFilteredData([]);
        } else {
            setFilteredData(newFilter)
        }
    }

    const clearInput = () => {
        setFilteredData([]);
        setSearchInput('');
    }

  return (
    <div className='search'>
      <div className='search-inputs'>
        <input
          type='text'
          placeholder='Search for friends'
          value={searchInput}
          onChange={handleChange}
        />
        <div className='search-icon'>
          {filteredData.length === 0 ? (
            <AiOutlineSearch />
          ) : (
            <AiOutlineCloseSquare id='clearBtn' onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className='data-result'>
          {filteredData.map((data) => (
            <NavLink
              key={data?.id}
              className='data-link'
              to={`/users/${data?.id}`}
            >
              <p className='data-item'>{data?.username}</p>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar
