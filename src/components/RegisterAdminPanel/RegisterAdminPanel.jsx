import React from 'react';
import Panel from '../Panel';
import RegisterAdminForm from '../RegisterAdminForm';
import styles from './RegisterAdminPanel.css';

const RegisterAdminPanel = () => (
  <Panel>
    <h3 className={styles.Title}>Cadastre um novo usuário administrador</h3>
    <RegisterAdminForm />
  </Panel>
);

export default RegisterAdminPanel;
