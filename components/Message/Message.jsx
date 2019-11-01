import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Message.css';

const Message = ({ type, children, className: classNameProp }) => {

  const className = classNames(
    styles.Message,
    {
      [styles.success]: type === 'success',
      [styles.error]: type === 'error',
    },
    classNameProp,
  );

  return <div className={className}>{children}</div>;
};

Message.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Message.defaultProps = {
  className: null,
};

export default Message;
