import React from "react";
import { AiFillDelete, AiOutlineExclamationCircle } from "react-icons/ai";
import './styles.css'
import './styles-priority.css'

function Notes({ data }) {
    return(
<>
<li className={data.priority ? 'notepad-infos-priority' : 'notepad-infos'}>
          <div>
            <strong>{data.title}</strong>
            <div>
              <AiFillDelete/>
            </div>
          </div>
          <textarea defaultValue={data.notes}></textarea>
          <span>
            <AiOutlineExclamationCircle/>
          </span>
        </li>
</>
    )
}

export default Notes