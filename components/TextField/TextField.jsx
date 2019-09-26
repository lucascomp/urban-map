import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextField.css';

const TextField = ({
  id,
  name,
  type,
  placeholder,
  value,
  handleChange,
  className,
  disabled,
}) => {
  const wrapperClassName = classNames(
    styles.Wrapper,
    className,
  );

  const inputClassName = classNames(
    styles.Input,
    {
      [styles.disabled]: disabled,
    },
  );

  return (
    <div className={wrapperClassName}>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={inputClassName}
        disabled={disabled}
      />
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel']),
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  type: 'text',
  placeholder: null,
  className: null,
  disabled: false,
};

export default TextField;
