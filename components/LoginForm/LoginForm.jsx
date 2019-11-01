import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../Button';
import Message from '../Message';
import TextField from '../TextField';
import { login } from '../../services/users';
import styles from './LoginForm.css';

const LoginForm = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await login({ email, password });
      onLoggedIn();
    } catch (error) {
      setShowErrorMessage(true);
      setSubmitting(false);
    }
  };

  const onEmailChanged = ({ target: { value } }) => {
    setEmail(value);
    setShowErrorMessage(false);
  };

  const onPasswordChanged = ({ target: { value } }) => {
    setPassword(value);
    setShowErrorMessage(false);
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
      {showErrorMessage && (
        <Message type="error">
          E-mail ou senha inválidos.
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
