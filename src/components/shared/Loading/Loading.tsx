import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'react-bootstrap';

const Loading = (): React.ReactElement => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" />
      <span className="ms-2">
        <FormattedMessage id="loading" />
      </span>
    </div>
  );
};

export default Loading;
