import React from 'react';
import Panel from '../Panel';
import ForgotPasswordForm from '../ForgotPasswordForm';
import styles from './ForgotPasswordPanel.css';

const ForgotPasswordPanel = () => (
  <Panel>
    <h3 className={styles.Title}>Mapa de Acessibilidade Urbana</h3>
    <p className={styles.Text}>
      Esqueceu sua senha? Não se preocupe. É só nos dizer seu e-mail que enviaremos um link para
      você cadastrar uma nova senha.
    </p>
    <ForgotPasswordForm />
  </Panel>
);

export default ForgotPasswordPanel;
