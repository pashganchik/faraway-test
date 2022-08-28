import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FaFile } from 'react-icons/fa';

const NoData = (): React.ReactElement => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <FaFile />
      <span className="ms-2">
        <FormattedMessage id="no-data" />
      </span>
    </div>
  );
};

export default NoData;
