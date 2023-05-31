import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

import './style.css'

function RadioButton({ selectedValue, handleChange }){
    
    const CustomRadio = withStyles({
        root: {
          color: '#5d6c7a',
          '&$checked': {color: '#2b3641'},
        },
        checked: {},
      })((props) => <Radio color="default" {...props} />); 
    
    
    return(
        <div className="radioOptions">
    <div>
        <CustomRadio 
        checked={selectedValue == 'all'}
        onChange = {e => handleChange(e.target)}
        value ="all"
        />
        <span>Todos</span>
    </div>

    <div>
        <CustomRadio
         checked={selectedValue == 'true'}
         onChange = {e => handleChange(e.target)}
         value ="true"
        />
        <span>Prioridades</span>
    </div>

    <div>
        <CustomRadio
         checked={selectedValue == 'false'}
         onChange = {e => handleChange(e.target)}
         value ="false"
        />
        <span>Normal</span>
    </div>
        </div>
    )
}

export default RadioButton