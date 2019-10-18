import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../Button';
import TextField from '../TextField';
import styles from './SignUpForm.css';

const SignUpForm = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      onLoggedIn();
    } catch (error) {
      console.log(error); // TODO: exibir erro pro usuário
    } finally {
      setSubmitting(false);
    }
  };

  const onEmailChanged = ({ target: { value } }) => setEmail(value);
  const onPasswordChanged = ({ target: { value } }) => setPassword(value);
  const onConfirmPasswordChanged = ({ target: { value } }) => setConfirmPassword(value);

  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="email"
        name="email"
        placeholder="E-mail"
        value={email}
        handleChange={onEmailChanged}
        className={styles.Email}
        disabled={submitting}
      />
      <div className={styles.PasswordWrapper}>
        <TextField
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          value={password}
          handleChange={onPasswordChanged}
          className={styles.Password}
          disabled={submitting}
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          handleChange={onConfirmPasswordChanged}
          className={styles.ConfirmPassword}
          disabled={submitting}
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
            disabled={submitting}
            submitting={submitting}
          >
            Cadastre-se
          </Button>
        </div>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default SignUpForm;
