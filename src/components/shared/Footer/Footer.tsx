import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Footer.scss';

const Footer = (): React.ReactElement => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <small>
          <FormattedMessage id="footer-text" values={{ date: new Date().getFullYear() }} />
        </small>
      </div>
    </footer>
  );
};

export default Footer;
