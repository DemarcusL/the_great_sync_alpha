import React from 'react'

const ListBoxProfile = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }

    return (
        <div className="profile-box">
            <p className="profile-name"><b>{props.items.display_name}</b></p>
            <p className="profile-img">{}</p>
            {/* <p className="profile-id">{props.items.uri}</p> */}


        </div>


    );
}

export default ListBoxProfile