import React, { useState, useEffect, useRef } from 'react'
// react-fontaweome 图标使用;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
	return (
		<ul className="list-group list-group-flush ">
			{files.map((file) => (
				<li
					className="list-group-item d-flex justify-content-between align-items-center"
					key={file.id}
				>
					<span>
						<FontAwesomeIcon icon={faMarkdown} />
						{file.title}
					</span>
					<div>
						<button type="button" className="icon-btn">
							<FontAwesomeIcon icon={faEdit} />
						</button>
						<button type="button" className="icon-btn">
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}

export default FileList
