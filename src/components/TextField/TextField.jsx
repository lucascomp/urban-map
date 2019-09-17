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
}) => {
  const wrapperClassName = classNames(
    styles.Wrapper,
    className,
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
        className={styles.Input}
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
};

TextField.defaultProps = {
  type: 'text',
  placeholder: null,
  className: null,
};

export default TextField;
