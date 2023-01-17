import classNames from 'classnames';

import './ButtonStyle.scss';

const Button = ({ children, onClick, outline, primary, red, submit }) => (
  <button
    onClick={onClick}
    type={submit}
    className={classNames('button', { outline: outline, primary: primary, red: red })}>
    {children}
  </button>
);
export default Button;
