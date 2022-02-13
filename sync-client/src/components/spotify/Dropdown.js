import React from 'react'

function dropdown(props) {

      // const data = [
      //       { value: 1, name: 'a' },
      //       { value: 2, name: 'b' },
      //       { value: 3, name: 'c' }
      // ]


      return (
            <div>
                  {/* I want to display a dropdown menu FOR NOW */}
                  <select>{props.options.map((item, idx) => <option key={idx} value={item.value}></option>)}</select>
            </div>
      )
}

export default dropdown