import { useState } from 'react';
import renderProps from '../../utils/renderProps';

const Toggle = ({
  children,
  initial,
  onChange,
  render,
}) => {
  const [on, setOn] = useState(initial || false);

  const toggle = () => {
    setOn(!on);
  };

  const set = (newOn) => {
    if (on !== newOn) {
      setOn(newOn);

      if (onChange) {
        onChange(on);
      }
    }
  };

  return renderProps({
    children,
    render,
  }, {
    on,
    set,
    toggle,
  });
};

export default Toggle;
