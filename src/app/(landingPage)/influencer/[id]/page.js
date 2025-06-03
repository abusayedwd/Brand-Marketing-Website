import InfluencerSinglePage from '@/components/homePage/InfluencerDetailsPage';
import React from 'react';
 

const Page = async ({ params }) => {
  // Await params if needed (in Next.js 13 sometimes params is resolved automatically, but error suggests to await)
  const awaitedParams = await params;
  const id = awaitedParams.id

  return (
    <div>
       <InfluencerSinglePage id = {id} />
    </div>
  );
};

export default Page;
