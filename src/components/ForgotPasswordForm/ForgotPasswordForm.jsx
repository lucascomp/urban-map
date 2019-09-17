import React from 'react';
import Button from '../Button';
import TextField from '../TextField';
import redirect from '../../utils/router';
import styles from './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    redirect('/login');
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
      <Button
        type="submit"
        fluid
      >
        Enviar
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
