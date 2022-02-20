import React from 'react';

const Detail = ({album, artists, name}) => {

    return (
        <div className="offset-md-1 col-sm-4" >
            <div className="track-img">
                <img 
                    src={album.images[0].url}
                    alt={name}>                    
                </img>
            </div>
            <div className="track-name">
                <label htmlFor={name} className="">
                    {name}
                </label>
            </div>
            <div className="track-artist">
                <label htmlFor={artists[0].name} className="track-artist-name">
                    {artists[0].name}
                </label>
            </div>
        </div>
    );
}

export default Detail;