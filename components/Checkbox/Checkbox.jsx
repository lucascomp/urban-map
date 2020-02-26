import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Checkbox.css';

const Checkbox = ({
  checked,
  children,
  className,
  id,
  name,
  onChange,
}) => {
  const wrapperClassName = classNames(styles.Checkbox, className);

  const handleChange = ({ target: { checked: newChecked } }) => {
    if (onChange) {
      onChange({ name, checked: newChecked });
    }
  };

  return (
    <label htmlFor={id} className={wrapperClassName}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        className={styles.Input}
        onChange={handleChange}
      />
      {children && <span className={styles.Label}>{children}</span>}
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
  className: null,
  id: null,
  name: null,
  onChange: null,
};

export default Checkbox;
