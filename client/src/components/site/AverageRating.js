import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from '@apollo/client';
import '../../rating.css';
// import { NEW_RATING } from "../../utils/mutations";
import { AVERAGE_RATING } from '../../utils/queries';
import Auth from '../../utils/auth';

const AverageRating = ({site}) => {  
    const { loading, data } = useQuery(FIND_USER_RATINGS, {
        variables: { siteId: site.site._id }
    })
    console.log("User", Auth.getProfile().data._id, "Site", site.site._id );

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={`${index}`}
              
                        className={index <= rating ? "on" : "off"}
                        onClick={() => 
                handleRatingChange(index) }
                    >
                        <img
                            src={`/images/seashell-${index <= rating ? 'blue' : 'white'}.ico`}
                            alt="seashell"
                            key={`${index}`}
                className="star"
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default AverageRating;