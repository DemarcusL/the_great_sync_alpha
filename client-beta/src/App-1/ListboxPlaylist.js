import React from 'react';

const Listbox = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }

    return (
        <div className="">
                <ul>
                    {

                        props.items.map((item, idx) =>
                            <ul key={idx}
                                onClick={clicked}
                                className=""
                                id={item.id}>

                                {item.name}
                            </ul>)

                    }
                </ul>
        </div>


    );
}

export default Listbox;