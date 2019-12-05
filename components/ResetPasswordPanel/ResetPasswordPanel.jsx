import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../Panel';
import ResetPasswordForm from '../ResetPasswordForm';
import styles from './ResetPasswordPanel.css';

const ResetPasswordPanel = ({ token }) => (
  <Panel>
    <h3 className={styles.Title}>Crie uma nova senha</h3>
    <ResetPasswordForm token={token} />
  </Panel>
);

ResetPasswordPanel.propTypes = {
  token: PropTypes.string,
};

ResetPasswordPanel.defaultProps = {
  token: '',
};


export default ResetPasswordPanel;
