import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import validator from 'validator';
import Button from '../Button';
import Message from '../Message';
import TextField from '../TextField';
import { login } from '../../services/users';
import styles from './LoginForm.css';

const LoginForm = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (!validator.isEmail(email)) {
        throw new Error('E-mail inválido');
      }

      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      await login({ email, password });
      onLoggedIn();
    } catch ({ message }) {
      setErrorMessage(message);
      setSubmitting(false);
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const onEmailChanged = ({ target: { value } }) => {
    setEmail(value);
    clearErrorMessage();
  };

  const onPasswordChanged = ({ target: { value } }) => {
    setPassword(value);
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
      <TextField
        id="password"
        name="password"
        type="password"
        placeholder="Senha"
        className={styles.Password}
        value={password}
        handleChange={onPasswordChanged}
        disabled={submitting}
      />
      {errorMessage && (
        <Message type="error">
          {errorMessage}
        </Message>
      )}
      <Link href="/forgot-password">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.ForgotPasswordLink}>
          Esqueceu sua senha?
        </a>
      </Link>
      <Button
        className={styles.SubmitButton}
        type="submit"
        fluid
        disabled={submitting}
        submitting={submitting}
      >
        Entrar
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
