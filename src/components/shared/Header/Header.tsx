import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Header.scss';

const Header = (props: IHeaderProps): React.ReactElement => {
  const { textId } = props;

  return (
    <header className="header">
      <h1>
        <FormattedMessage id="header-title" />
      </h1>
      {textId && (
        <h6 className="header__text">
          <FormattedMessage id={textId} />
        </h6>
      )}
    </header>
  );
};

interface IHeaderProps {
  textId?: string;
}

export default Header;
