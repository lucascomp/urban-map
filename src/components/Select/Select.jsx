import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Select.css';

const Select = ({
  id,
  value,
  handleChange,
  className,
  disabled,
  children,
}) => {
  const wrapperClassName = classNames(
    styles.Wrapper,
    className,
  );

  const selectClassName = classNames(
    styles.Select,
    {
      [styles.disabled]: disabled,
    },
  );

  return (
    <div className={wrapperClassName}>
      <select
        id={id}
        disabled={disabled}
        className={selectClassName}
        onChange={handleChange}
        value={value}
      >
        {children}
      </select>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Select.defaultProps = {
  value: '',
  className: null,
  disabled: false,
  children: null,
};

export default Select;
