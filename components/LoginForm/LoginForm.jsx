import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../Button';
import TextField from '../TextField';
import redirect from '../../utils/router';
import styles from './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    redirect('/');
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

export default LoginForm;
