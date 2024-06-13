'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from '@/app/(store)/store';

// const queryClient = new QueryClient();

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProvidersWrapper;
