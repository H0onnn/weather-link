import { getSido } from '@/services/locations/apis';
import { locationKeys } from '@/services/locations/queries';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';

import { SignUpForm } from './_components/SignUpForm';

const SignupPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey: locationKeys.list('sido'), queryFn: getSido, staleTime: Infinity });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SignUpForm />
    </HydrationBoundary>
  );
};

export default SignupPage;
