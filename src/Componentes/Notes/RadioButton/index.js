import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

import './style.css'

function RadioButton(){
    
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
        <CustomRadio/>
        <span>Todos</span>
    </div>

    <div>
        <CustomRadio/>
        <span>Prioridades</span>
    </div>

    <div>
        <CustomRadio/>
        <span>Normal</span>
    </div>
        </div>
    )
}

export default RadioButton