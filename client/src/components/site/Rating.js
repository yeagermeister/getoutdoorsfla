import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from '@apollo/client';
import '../../rating.css';
import { NEW_RATING, GET_RATING_BY_USER_AND_SITE } from "../../utils/mutations";
import Auth from '../../utils/auth';

const StarRating = ({site}) => {  
    const [rating, setRating] = useState(0);
    const [updateRating] = useMutation(NEW_RATING);
    const [siteId, setSiteID] = useState('');
    const [userId, setUserID] = useState('')

    console.log("User", Auth.getProfile().data._id, "Site", site.site._id )
    const { loading, data } = useQuery(GET_RATING_BY_USER_AND_SITE, {
        variables: { userId: Auth.getProfile().data._id, siteId: site.site._id }
    });

    console.log(data);

    useEffect(() => {
        setSiteID(site.site._id);
        setUserID(Auth.getProfile().data._id);
    }, [site]);

    useEffect(() => {
        if (!loading && data && data.ratings.length > 0) {
            // User has already rated the site
            setRating(data.ratings[0].rating);
        }
    }, [loading, data]);

    const handleRatingChange = async (newRating) => {
        if (data && data.ratings.length > 0) {
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
