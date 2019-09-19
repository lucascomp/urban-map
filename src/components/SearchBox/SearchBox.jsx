import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import HamburgerIcon from './hamburger.svg';
import SearchIcon from './search.svg';
import styles from './SearchBox.css';

const SearchBox = ({ onMenuClick }) => (
  <div className={styles.Wrapper}>
    <div className={styles.Container}>
      <button className={styles.MenuButton} type="button" onClick={onMenuClick}>
        <img src={HamburgerIcon} alt="hamburger-icon" />
      </button>
      <TextField
        id="search"
        name="name"
        value=""
        handleChange={() => {}}
        className={styles.Query}
        placeholder="Pesquise por algum local"
      />
      <button className={styles.SearchButton} type="button">
        <img src={SearchIcon} alt="search-icon" />
      </button>
    </div>
  </div>
);

SearchBox.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default SearchBox;
