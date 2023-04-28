import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from '@apollo/client';
import '../../rating.css';
import { NEW_RATING } from "../../utils/mutations";
import { GET_RATING_BY_USER_AND_SITE, FIND_USER_RATINGS } from '../../utils/queries';
import Auth from '../../utils/auth';

// adding a comment to try a repush

const StarRating = ({site}) => {  
    
    const [updateRating] = useMutation(NEW_RATING);
    const [siteId, setSiteID] = useState('');
    const [userId, setUserID] = useState('')

    console.log("User", Auth.getProfile().data._id, "Site", site.site._id )
    const { loading, data } = useQuery(FIND_USER_RATINGS, {
        variables: { userID: Auth.getProfile().data._id, siteId: site.site._id }
        
    });
    const [rating, setRating] = useState(() => {
        if(data) {
            return data?.findUserRatings?.[0]?.rating}
            else { return 0}
    });
   console.log(rating, "whoop", data?.findUserRatings?.[0]?.rating,"whoop", data)
    

    useEffect(() => {
        setSiteID(site.site._id);
        setUserID(Auth.getProfile().data._id);
    }, [site]);

    useEffect(() => {
        if (!loading && data && data?.findUserRatings?.[0]?.rating > 0) {
            // User has already rated the site
            setRating(data?.findUserRatings?.[0]?.rating);
            
        }
    }, [loading, data]);

    const handleRatingChange = async (newRating) => {
        if (data && data?.ratings?.length > 0) {
            // User has already rated the site, update existing rating
            try {
                const response = await updateRating({
                    variables: { rating: newRating, siteId: site.site._id, ratingId: data.ratings[0]._id }
                });
                console.log('Updated rating:', response);
                setRating(newRating);
            } catch (err) {
                // Handle error
                console.error('Error updating rating:', err);
            }
        } else {
            // User has not yet rated the site, create new rating
            try {
                const response = await updateRating({
                    variables: { rating: newRating, siteId: site.site._id}
                });
                console.log('Added rating:', response);
                setRating(newRating);
            } catch (err) {
                // Handle error
                console.error('Error adding rating:', err);
            }
        }
    }

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

export default StarRating;
