import React from 'react';
import Link from 'next/link';
import Button from '../Button';
import TextField from '../TextField';
import redirect from '../../utils/router';
import styles from './SignUpForm.css';

const SignUpForm = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    redirect('/');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.NameWrapper}>
        <TextField
          id="firstName"
          name="firstName"
          placeholder="Nome"
          value=""
          handleChange={() => {}}
          className={styles.FirstName}
        />
        <TextField
          id="lastName"
          name="lastName"
          placeholder="Sobrenome"
          value=""
          handleChange={() => {}}
          className={styles.LastName}
        />
      </div>
      <TextField
        id="email"
        name="email"
        placeholder="E-mail"
        value=""
        handleChange={() => {}}
        className={styles.Email}
      />
      <div className={styles.PasswordWrapper}>
        <TextField
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          value=""
          handleChange={() => {}}
          className={styles.Password}
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirme a senha"
          value=""
          handleChange={() => {}}
          className={styles.ConfirmPassword}
        />
      </div>
      <div className={styles.FormActions}>
        <Link href="/login">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.LoginLink}>
            Já tem uma conta?
            {' '}
            <b>Entre!</b>
          </a>
        </Link>
        <div className={styles.SubmitButtonWrapper}>
          <Button
            className={styles.SubmitButton}
            type="submit"
            fluid
          >
            Cadastre-se
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
