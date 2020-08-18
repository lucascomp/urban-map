import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from '../Spinner';
import styles from './Button.css';

const Button = ({
  children,
  className: classNameProp,
  disabled,
  fluid,
  onClick,
  type,
  submitting,
}) => {
  const className = classNames(
    styles.Button,
    {
      [styles.disabled]: disabled,
      [styles.fluid]: fluid,
    },
    classNameProp,
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {submitting ? <Spinner className={styles.Spinner} /> : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  submitting: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  className: null,
  disabled: false,
  fluid: false,
  onClick: null,
  type: 'button',
  submitting: false,
};

export default Button;
