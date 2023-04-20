import React from "react";
import SiteCard from '../components/SiteCard';

// These need deleted after the database is connected
const sites = [	
    {
      id: 1,
      name: 'Weeki Wachee Springs State Park',
        description: 'Weeki Wachee Springs State Park is a Florida State Park located in Weeki Wachee, Florida. The park is home to Weeki Wachee Springs, a first magnitude spring and a popular destination for swimming, snorkeling, and scuba diving. The park is also known for its live mermaid shows.',
        imageUrl: '/images/Weeki-Wachee-Springs.jpg',
        distance: '',
        weather: '',
        zipcode: 34606,
        fees: "$6/car",
        pets: false,
        statepark: true,
        camping: true,
        scuba: false,
        lat: 28.5179,
        lng: -82.5747
    },
    {
      id: 2,
        name: 'Manatee Springs State Park',
        description: 'Manatee Springs State Park is a Florida State Park located in Chiefland, Florida. The park is home to Manatee Springs, a first magnitude spring and a popular destination for swimming, snorkeling, and scuba diving.',
        imageUrl: '/images/Manatee-Spring-State.jpg',
        distance: '',
        weather: '',
        zipcode: 32626,
        fees: "$6/car",
        pets: false,
        statepark: true,
        camping: true,
        scuba: false,
        lat: 29.4975,
        lng: -82.9758
    }
    ];

const Home = () => {
    return (
        <>
            <SiteCard sites={sites}/>
        </>
    )
}

export default Home;
