import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Message from '../Message';
import TextField from '../TextField';
import styles from './RegisterBox.css';
import CloseIcon from './close.svg';
import SearchIcon from './search.svg';

const RegisterBox = ({
  latitude,
  longitude,
  onCancel,
  onConfirm,
  onLatitudeChanged,
  onLongitudeChanged,
  onSearch,
  searchError,
  submitting,
}) => {
  const onCloseClick = () => {
    onCancel();
  };

  const onConfirmButtonClick = () => {
    onConfirm();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  const handleLatitudeChanged = ({ target: { value } }) => {
    onLatitudeChanged(value);
  };

  const handleLongitudeChanged = ({ target: { value } }) => {
    onLongitudeChanged(value);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <h4 className={styles.Title}>Selecione no mapa o novo local de acessibilidade</h4>
          <button
            type="button"
            disabled={submitting || !latitude || !longitude}
            onClick={onCloseClick}
          >
            <img src={CloseIcon} alt="Cancelar registro de localidade" />
          </button>
        </div>
        <form className={styles.Form} onSubmit={onFormSubmit}>
          <div>
            <div className={styles.Field}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="latitude">Latitude:</label>
              <TextField
                id="latitude"
                name="latitude"
                className={styles.TextField}
                handleChange={handleLatitudeChanged}
                value={latitude}
              />
            </div>
            <div className={styles.Field}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="longitude">Longitude:</label>
              <TextField
                id="longitude"
                name="longitude"
                className={styles.TextField}
                handleChange={handleLongitudeChanged}
                value={longitude}
              />
            </div>
          </div>
          <div className={styles.Search}>
            <button type="submit">
              <img src={SearchIcon} alt="Buscar por latitude e longitude" />
            </button>
          </div>
        </form>
        {searchError && (
          <Message type="error">
            Latitude e/ou longitude inválido(s)
          </Message>
        )}
        <Button
          onClick={onConfirmButtonClick}
          disabled={submitting || !latitude || !longitude}
          submitting={submitting}
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

RegisterBox.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onLatitudeChanged: PropTypes.func.isRequired,
  onLongitudeChanged: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchError: PropTypes.bool,
  submitting: PropTypes.bool,
};

RegisterBox.defaultProps = {
  latitude: '',
  longitude: '',
  searchError: false,
  submitting: false,
};

export default RegisterBox;
