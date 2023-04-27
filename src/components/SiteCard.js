import React, { useEffect, useState } from 'react';

function SiteCard() {
    return (
    <div>
  <div class="row w-60 m-5 p-5">
    <div class="col-md">
      <div class="card border box border-rounded shadow myCard">
        <h5 class="card-title text-center">Site Name</h5>
        <div class="text-center">
          <image src="{{spring.image_url}}" class="card-img-top border rounded img-border w-75"
            alt="an image of a spring" />
        </div>
        <div class="card-body ">
          <p class="text-center card-text">Site Description</p>
        </div>
        <p class="text-center">
          <span id="spring{{spring.id}}" class="mr-5">67 miles away</span>

          <a href="/springs/{{spring.id}}" class="btn btn-info btn-lg active " role="button" aria-pressed="true">More
            Information</a>

          <span id="weather{{spring.id}}" class="ml-5"></span>
        </p>
      </div>
    </div>
  </div>
  </div>
    )
};

export default SiteCard;