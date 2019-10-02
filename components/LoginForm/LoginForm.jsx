import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../Button';
import TextField from '../TextField';
import { signInWithEmailAndPassword } from '../../services/auth';
import styles from './LoginForm.css';

const LoginForm = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await signInWithEmailAndPassword(email, password);
      onLoggedIn();
    } catch (error) {
      console.log(error); // TODO: exibir erro pro usuário
    } finally {
      setSubmitting(false);
    }
  };

  const onEmailChanged = ({ target: { value } }) => setEmail(value);
  const onPasswordChanged = ({ target: { value } }) => setPassword(value);

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
