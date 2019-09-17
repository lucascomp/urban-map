import React from 'react';
import PropTypes from 'prop-types';
import styles from './Divison.css';

const Divison = ({ children }) => (
  <div className={styles.Divison}>
    {children}
  </div>
);

Divison.propTypes = {
  children: PropTypes.node,
};

Divison.defaultProps = {
  children: null,
};

export default Divison;
