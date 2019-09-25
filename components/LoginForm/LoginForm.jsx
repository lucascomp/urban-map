import React from 'react';
import Link from 'next/link';
import Button from '../Button';
import TextField from '../TextField';
import redirect from '../../utils/router';
import styles from './LoginForm.css';

const LoginForm = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    redirect('/');
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="email"
        name="email"
        placeholder="E-mail"
        className={styles.Email}
        value=""
        handleChange={() => {}}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        placeholder="Senha"
        className={styles.Password}
        value=""
        handleChange={() => {}}
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
      >
        Entrar
      </Button>
    </form>
  );
};

export default LoginForm;
