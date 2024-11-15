import React from 'react'

const PlaceImg = ({place,index=0,className=null}) => {
    if(!place.photos?.length) {
        return '';
    }
    if(!className) {
        className = 'rounded-xl';
    }
  return (
    <img
          src={"http://localhost:3000/uploads/" + place.photos[index]}
          alt=""
          className={className}
        />
  )
}

export default PlaceImg