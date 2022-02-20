import React from 'react';

const Listbox = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }

    return (
        <div className="col-sm-6 px-0">
            <div className="list-group">
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
        </div>


    );
}

export default Listbox;