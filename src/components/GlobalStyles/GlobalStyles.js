import PropTypes from 'prop-types';

import 'react-toastify/ReactToastify.min.css';
import './GlobalStyles.scss';
import './ResponsiveStyles.scss';

function GlobalStyles({ children }) {
  return children;
}

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
