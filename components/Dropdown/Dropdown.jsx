import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import Toggle from '../Toggle';
import renderProps from '../../utils/renderProps';
import styles from './Dropdown.css';

const Dropdown = ({
  children,
  className,
  initial,
  onChange,
  render,
}) => {
  const wrapperClassName = classNames(styles.Wrapper, className);

  return (
    <div className={wrapperClassName}>
      <Toggle initial={initial} onChange={onChange}>
        {({ on, set, toggle }) => (
          <OutsideClickHandler disabled={!on} display="flex" onOutsideClick={() => set(false)}>
            {renderProps(
              { children, render },
              {
                open: on,
                toggle,
                set,
              },
            )}
          </OutsideClickHandler>
        )}
      </Toggle>
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  initial: PropTypes.bool,
  onChange: PropTypes.func,
  render: PropTypes.func,
};

Dropdown.defaultProps = {
  className: null,
  initial: false,
  onChange: () => null,
  render: () => null,
};

export default Dropdown;
