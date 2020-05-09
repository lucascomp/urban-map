import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/named
import { useAccessibilities } from '../AccessibilitiesContext';
import Button from '../Button';
import Message from '../Message';
import Select from '../Select';
import styles from './RegisterBox.css';
import CloseIcon from './close.svg';

const RegisterBox = ({
  latitude,
  longitude,
  description,
  accessibility,
  editing,
  onCancel,
  onConfirm,
  onDescriptionChanged,
  onAccessibilityChanged,
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

  const handleAccessibilityChanged = ({ target: { value } }) => {
    onAccessibilityChanged(value);
  };

  const handleDescriptionChanged = ({ target: { value } }) => {
    onDescriptionChanged(value);
  };

  const accessibilites = useAccessibilities();

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.Header}>
          <h4 className={styles.Title}>
            {
              (!latitude || !longitude) && !editing
                ? 'Selecione no mapa o novo indicativo'
                : 'Arraste o ícone até o local desejado'
            }
          </h4>
          <button
            type="button"
            disabled={submitting}
            onClick={onCloseClick}
          >
            <img src={CloseIcon} alt="Cancelar registro de localidade" />
          </button>
        </div>
        <form className={styles.Form} onSubmit={onFormSubmit}>
          <div className={styles.Field}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className={styles.Label}>Tipo:</label>
            <Select
              id="accessibility"
              className={styles.Select}
              handleChange={handleAccessibilityChanged}
              value={accessibility}
              disabled={submitting}
            >
              {accessibilites.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </div>
          <div className={styles.Field}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className={styles.Label}>Descrição:</label>
            <textarea
              className={styles.TextArea}
              id="description"
              disabled={submitting}
              onChange={handleDescriptionChanged}
              maxLength={500}
              value={description}
            />
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
          {editing ? 'Salvar' : 'Cadastrar'}
        </Button>
      </div>
    </div>
  );
};

RegisterBox.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  description: PropTypes.string,
  accessibility: PropTypes.string,
  editing: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDescriptionChanged: PropTypes.func.isRequired,
  onAccessibilityChanged: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchError: PropTypes.bool,
  submitting: PropTypes.bool,
};

RegisterBox.defaultProps = {
  latitude: '',
  longitude: '',
  description: '',
  accessibility: '',
  editing: '',
  searchError: false,
  submitting: false,
};

export default RegisterBox;
