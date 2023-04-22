import React from "react";
import Map from '../components/site/Map';
import Weather from '../components/site/Weather'
import DetailCard from '../components/site/DetailCard'
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { FIND_ONE_NEWSITE } from '../utils/queries';

const Site = (props) => {

  const  { id } = useParams();
  console.log(id)

  const { data } = useQuery(FIND_ONE_NEWSITE, {
        variables: { _id: id } })
    //   });
  // // Use the `id` value as a variable in the `useQuery` hook

  // function SiteDetails( siteId ) {
  //   const { loading, error, data } = useQuery(FIND_ONE_NEWSITE, {
  //     variables: { id: siteId }
  //   });
  // const { loading, error, data } = useQuery(FIND_ONE_NEWSITE, {
  //   variables: { id }, // Pass the `id` as a variable
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  // const { site } = data;
  // }

console.log(data)
  return (
    <>
      <div>
        <h2>{data}</h2>
        <DetailCard>
          <Map></Map>
          <Weather></Weather>
        </DetailCard>
        </div>
    </>
  );
};

export default Site;
