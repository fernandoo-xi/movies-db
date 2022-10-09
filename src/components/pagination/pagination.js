import { Pagination } from 'antd';
import React from 'react';

const MoviePagination = () => (
  <>
    <form>
      <Pagination size="small" total={50} />
    </form>
  </>
);

export default MoviePagination;
