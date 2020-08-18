import React, { useState } from 'react';
import Link from 'next/link';
import validator from 'validator';
import Button from '../Button';
import Message from '../Message';
import TextField from '../TextField';
import { registerAdmin } from '../../services/users';
import styles from './RegisterAdminForm.css';

const RegisterAdminForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    clearErrorMessage();
    setSubmitting(true);

    try {
      if (firstName.length < 2) {
        throw new Error('Nome inválido');
      }

      if (lastName.length < 2) {
        throw new Error('Sobrenome inválido');
      }

      if (!validator.isEmail(email)) {
        throw new Error('E-mail inválido');
      }

      if (password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      if (password !== confirmPassword) {
        throw new Error('As senhas devem coincidir');
      }

      await registerAdmin({
        email,
        firstName,
        lastName,
        password,
      });
      setSuccessMessage('Usuário criado com sucesso!');
    } catch ({ message }) {
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  const onFirstNameChanged = ({ target: { value } }) => {
    setFirstName(value);
    clearErrorMessage();
  };

  const onLaseNameChanged = ({ target: { value } }) => {
    setLastName(value);
    clearErrorMessage();
  };

  const onEmailChanged = ({ target: { value } }) => {
    setEmail(value);
    clearErrorMessage();
  };

  const onPasswordChanged = ({ target: { value } }) => {
    setPassword(value);
    clearErrorMessage();
  };

  const onConfirmPasswordChanged = ({ target: { value } }) => {
    setConfirmPassword(value);
    clearErrorMessage();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.NameWrapper}>
        <TextField
          id="firstName"
          name="firstName"
          placeholder="Nome"
          value={firstName}
          handleChange={onFirstNameChanged}
          className={styles.FirstName}
          disabled={submitting}
        />
        <TextField
          id="lastName"
          name="lastName"
          placeholder="Sobrenome"
          value={lastName}
          handleChange={onLaseNameChanged}
          className={styles.LastName}
          disabled={submitting}
        />
      </div>
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
      {errorMessage && (
        <Message type="error">
          {errorMessage}
        </Message>
      )}
      {successMessage && (
        <Message type="success">
          {successMessage}
        </Message>
      )}
      <div className={styles.FormActions}>
        <Link href="/home">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.MapLink}>
            Voltar para o mapa
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

export default RegisterAdminForm;
