import React, { useState } from 'react';
import Button from '../Button';
import TextField from '../TextField';
import redirect from '../../utils/router';
import styles from './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    redirect('/login');
  };

  const onEmailChanged = ({ target: { value } }) => setEmail(value);

  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="email"
        name="email"
        placeholder="E-mail"
        className={styles.Email}
        value={email}
        handleChange={onEmailChanged}
      />
      <Button
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
