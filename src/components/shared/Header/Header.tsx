import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Header.scss';

const Header = (props: IHeaderProps): React.ReactElement => {
  const { textId } = props;

  return (
    <header className="header">
      <h2>
        <FormattedMessage id="header-title" />
      </h2>
      {textId && (
        <h5 className="header__text">
          <FormattedMessage id={textId} />
        </h5>
      )}
    </header>
  );
};

interface IHeaderProps {
  textId?: string;
}

export default Header;
