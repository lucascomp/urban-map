import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Spinner.css';

const Spinner = ({ className }) => {
  const spinnerClassName = classNames(
    styles.Spinner,
    className,
  );

  return (
    <svg className={spinnerClassName}>
      <g transform="translate(-136.000000, -160.000000)">
        <g transform="translate(129.000000, 153.000000)">
          <path d="M16.1705389,7.50167671 L16.1337757,8.50116909 C16.0892773,8.50039077 16.0446843,8.5 16,8.5 C11.8578644,8.5 8.5,11.8578644 8.5,16 C8.5,20.1421356 11.8578644,23.5 16,23.5 C19.660198,23.5 22.7080079,20.8780543 23.3676841,17.4099083 L24.3556158,17.5683059 C23.6197299,21.5135383 20.1586277,24.5 16,24.5 C11.3055796,24.5 7.5,20.6944204 7.5,16 C7.5,11.3055796 11.3055796,7.5 16,7.5 C16.056979,7.5 16.113827,7.50056064 16.1705389,7.50167671 Z" />
        </g>
      </g>
    </svg>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: null,
};

export default Spinner;
