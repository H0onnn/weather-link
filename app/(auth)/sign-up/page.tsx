import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { locationQueryOptions } from '@/hooks/queries/locations/queries';

import { getQueryClient } from '@/lib/query';

import { SignUpForm } from './_components/SignUpForm';

const SignupPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(locationQueryOptions.sido());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SignUpForm />
    </HydrationBoundary>
  );
};

export default SignupPage;
