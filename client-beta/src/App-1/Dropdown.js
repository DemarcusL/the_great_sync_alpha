import React from 'react'
// import { useState } from 'react'


const Dropdown = props => {

      // const [selectedValue, setSelectedValue] = useState('');

      const dropdownChanged = e => {
            props.changed(e.target.value);
      }

      return (
            <div>
                  {/* I want to display a dropdown menu FOR NOW */}
                  <select  onChange={dropdownChanged}> {props.options.map((item, idx) => <option key={idx} value={item.id}> {item.name} </option>)}</select>
                  {/* <p>{selectedValue}</p> */}
            </div>
      )
}

export default Dropdown;