import { Alert } from 'antd';
import React from 'react';

const ErrorIndicator = () => (
  <>
    <Alert message="Error" description="No Internet" type="error" showIcon />
  </>
);

export default ErrorIndicator;
