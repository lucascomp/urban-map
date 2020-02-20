import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './DropdownContent.css';

const DropdownContent = ({ children, className, variant }) => {
  const wrapperClassName = classNames(styles.Wrapper, styles[variant], className);

  return (
    <div className={wrapperClassName}>
      {children}
    </div>
  );
};

DropdownContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DropdownContent.defaultProps = {
  className: null,
};

export default DropdownContent;
