import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import React from 'react';

interface CustomPaginationProps {
  total: number,
  pageSize: number,
  onPageChange: (page: number, pageSize: number) => void,
  currentPage: number,
}

const CustomPagination = ({ total, pageSize, onPageChange, currentPage }: CustomPaginationProps) => (
  <>
    <Pagination
      total={total}
      pageSize={pageSize}
      showSizeChanger={false}
      onChange={onPageChange}
      current={currentPage}
    />
  </>
);

export default CustomPagination;