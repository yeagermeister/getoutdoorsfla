import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import '../../rating.css';
import { NEW_RATING } from "../../utils/mutations";
import Auth from '../../utils/auth';


const StarRating = ({site}) => {  
    const [rating, setRating] = useState(0);

    const [updateRating] = useMutation(NEW_RATING);
    const [siteId, setUsernum] = useState('');

    useEffect(() => {
        setUsernum(site.site._id);
             
    }, [site]);

    const handleRatingChange = async (newRating) => {
        setRating(newRating);
        try {
            const response = await updateRating({ variables: {rating: rating, siteId: siteId} });
            console.log('Deleted something:', response);
        } catch (err) {
            // Handle error
            console.error('Error deleting something:', err);
        }
    }

    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= rating ? "on" : "off"}
              onClick={() => handleRatingChange(index)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/seashell-${index <= rating ? 'blue' : 'white'}.ico`}
                alt="seashell"
                className="star"
              />
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;