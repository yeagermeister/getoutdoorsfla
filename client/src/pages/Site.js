import React from "react";

import DetailCard from '../components/site/DetailCard'
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { FIND_ONE_SITE } from '../utils/queries';

const Site = (props) => {

  const  { id } = useParams();

    // Use the `id` value as a variable in the `useQuery` hook
  const { data, loading, error } = useQuery(FIND_ONE_SITE, {
        variables: { id: id } 
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const free = data.findOneSite.free

  return (
    <>
      <div>
        <h2>{data.findOneSite.siteName}</h2>
        <DetailCard site={data.findOneSite}>

        </DetailCard>
        </div>
    </>
  );
};

export default Site;
