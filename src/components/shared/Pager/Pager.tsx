import React from 'react';
import Pagination, { OnChangeEventType } from '@vlsergey/react-bootstrap-pagination';

export type OnPageChangeEventType = OnChangeEventType;

interface IPagerProps {
  value: number;
  totalPages?: number;
  onChange?: (e: OnPageChangeEventType) => void;
}

export const Pager = (props: IPagerProps): React.ReactElement => {
  const { value, totalPages, onChange } = props;
  return <Pagination value={value} totalPages={totalPages} onChange={onChange} />;
};
