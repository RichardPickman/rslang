import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import React from 'react';
import './styles.scss';

interface CustomPaginationProps {
  total: number,
  pageSize: number,
  onPageChange: (page: number, pageSize: number) => void,
  currentPage: number,
}

const CustomPagination = ({ total, pageSize, onPageChange, currentPage }: CustomPaginationProps) => (
  <div className={'pagination-container'} id='pagination-container'>
    <Pagination
      total={total}
      pageSize={pageSize}
      showSizeChanger={false}
      onChange={onPageChange}
      current={currentPage}
    />
  </div>
);

export default CustomPagination;