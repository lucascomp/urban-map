import React, { useState } from 'react';
import { useGoogleMap } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import TextField from '../TextField';
import Spinner from '../Spinner';
import HamburgerIcon from './hamburger.svg';
import SearchIcon from './search.svg';
import styles from './SearchBox.css';

/* global google */

const SearchBox = ({ onMenuClick, onPlaceChanged }) => {
  const map = useGoogleMap();
  const [query, setQuery] = useState('');
  const [submitting, setSubmittingQuery] = useState(false);
  const service = new google.maps.places.PlacesService(map);
  const fields = ['name', 'geometry', 'place_id'];

  const searchPlaces = () => new Promise((resolve, reject) => {
    service.findPlaceFromQuery({ query, fields }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      }

      reject(status);
    });
  });

  const onQuery = async () => {
    try {
      const [place] = await searchPlaces(query);
      onPlaceChanged(place);
      setQuery(place.name);
    } catch (e) {
      /* continue regardless of error */
      /* TODO: mensagem de erro na busca  */
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!query) {
      return;
    }

    setSubmittingQuery(true);
    await onQuery(query);
    setSubmittingQuery(false);
  };

  const onQueryChanged = ({ target: { value } }) => setQuery(value);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <button className={styles.MenuButton} type="button" onClick={onMenuClick}>
          <img src={HamburgerIcon} alt="hamburger-icon" />
        </button>
        <form onSubmit={onSubmit} className={styles.Form}>
          <TextField
            id="query"
            name="query"
            value={query}
            handleChange={onQueryChanged}
            className={styles.Query}
            placeholder="Pesquise por algum local"
          />
          <button
            className={styles.SearchButton}
            type="submit"
            disabled={submitting}
          >
            {submitting ? <Spinner className={styles.Spinner} /> : <img src={SearchIcon} alt="search-icon" />}
          </button>
        </form>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  onPlaceChanged: PropTypes.func.isRequired,
};

export default SearchBox;
