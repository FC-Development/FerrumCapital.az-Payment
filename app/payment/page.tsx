import React, { Suspense } from 'react';
import PaymentPageContainer from '../(components)/PaymentPageContainer';

const page = () => {
  return (
    <Suspense>
      <PaymentPageContainer />
    </Suspense>
  );
};

export default page;
