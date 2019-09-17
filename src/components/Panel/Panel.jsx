import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Panel.css';

const Panel = ({ children, className }) => (
  <div className={classNames(styles.Panel, className)}>
    {children}
  </div>
);

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Panel.defaultProps = {
  children: null,
  className: null,
};

export default Panel;
