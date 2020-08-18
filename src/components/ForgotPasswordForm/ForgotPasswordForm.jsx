import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../Button';
import Message from '../Message';
import TextField from '../TextField';
import { forgotPassword } from '../../services/users';
import styles from './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
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
      await forgotPassword({ email });
      setSuccessMessage('O link de recuperação foi enviado para o seu e-mail.');
    } catch ({ message }) {
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  const onEmailChanged = ({ target: { value } }) => {
    setEmail(value);
    clearSuccessMessage();
    clearErrorMessage();
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="email"
        name="email"
        placeholder="E-mail"
        className={styles.Email}
        value={email}
        handleChange={onEmailChanged}
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
          Voltar para o Login
        </a>
      </Link>
      <Button
        className={styles.SubmitButton}
        type="submit"
        fluid
        disabled={submitting}
        submitting={submitting}
      >
        Enviar
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
