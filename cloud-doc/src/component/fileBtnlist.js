import React, { useState, useEffect, useRef } from 'react';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const FileBtnList = ({onAdd, onImport}) =>{

    return (
        <div className='row'>
            <button type="button" className="btn btn-primary col-6" onClick={()=>{ onAdd()}}>新建</button>
            <button type="button" className="btn btn-success col-6" onClick={()=>{ onImport()}}>导入</button>
        </div>
    )
}

export default FileBtnList;