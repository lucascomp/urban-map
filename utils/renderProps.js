const renderProps = ({ children, render }, props) => {
  const renderFn = children || render;
  return renderFn ? renderFn(props) : null;
};

export default renderProps;
