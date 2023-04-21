import React from "react";
import SiteCard from '../SiteCard';
import Map from '../Map';
import Weather from '../Weather';

const Site = () => {
    const { loading, error, data } = useQuery(FIND_ONE_NEWSITE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { site } = data;

  return (
    <>
      <div>
        <h2>Site Placeholder</h2>
      </div>
      <SiteCard sites={[site]}>
        <Map></Map>
        <Weather></Weather>
      </SiteCard>
    </>
  );
};

export default Site;
