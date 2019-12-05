import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../Button';
import Message from '../Message';
import TextField from '../TextField';
import { resetPassword } from '../../services/users';
import styles from './ResetPasswordForm.css';

const ResetPasswordForm = ({ token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    clearSuccessMessage();
    clearErrorMessage();
    setSubmitting(true);

    try {
      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      if (password !== confirmPassword) {
        throw new Error('As senhas devem coincidir');
      }

      await resetPassword({ token, password });
      setSuccessMessage('Sua senha foi redefinida com sucesso.');
    } catch ({ message }) {
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  const onPasswordChanged = ({ target: { value } }) => {
    setPassword(value);
    clearSuccessMessage();
    clearErrorMessage();
  };

  const onConfirmPasswordChanged = ({ target: { value } }) => {
    setConfirmPassword(value);
    clearSuccessMessage();
    clearErrorMessage();
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="password"
        name="password"
        type="password"
        placeholder="Digite a nova senha"
        className={styles.Password}
        value={password}
        handleChange={onPasswordChanged}
        disabled={submitting}
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirme a nova senha"
        className={styles.ConfirmPassword}
        value={confirmPassword}
        handleChange={onConfirmPasswordChanged}
        disabled={submitting}
      />
      {successMessage && (
        <Message type="success">
          {successMessage}
        </Message>
      )}
      {errorMessage && (
        <Message type="error">
          {errorMessage}
        </Message>
      )}
      <Link href="/login">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.LoginLink}>
          Ir para o Login
        </a>
      </Link>
      <Button
        className={styles.SubmitButton}
        type="submit"
        fluid
      >
        Enviar
      </Button>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  token: PropTypes.string,
};

ResetPasswordForm.defaultProps = {
  token: '',
};

export default ResetPasswordForm;
