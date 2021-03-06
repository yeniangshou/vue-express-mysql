import React, { useState } from 'react'
// react-fontaweome 图标使用;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './tabList.scss'

const TabList = ({ files, activedId, onSaveId, onTabClick, onCloseTab }) => {
	const [saveId, setsaveId] = useState(false)

	return (
		<ul className="nav nav-pills tab-list">
			{files.map((file) => (
				<li className="nav-item" key={file.id}>
					<a
						className={classNames({
							'nav-link': true,
							active: file.id === activedId,
						})}
						href="#"
					>
						<span
							className="mr10"
							onClick={(e) => {
								e.preventDefault()
								onTabClick(file.id)
							}}
						>
							{file.title}
						</span>
						<span
							className="close-icon"
							onClick={(e) => {
								onCloseTab(file.id)
							}}
						>
							<FontAwesomeIcon icon={faTimes} />
						</span>
						<span
							className="no-save-icon"
							onClick={(e) => {
								onTabClick(file.id)
							}}
						>
							<FontAwesomeIcon icon={faCircle} />
						</span>
					</a>
				</li>
			))}
		</ul>
	)
}

// 做类型检查
TabList.propTypes = {
	files: PropTypes.array,
	activedId: PropTypes.string,
	onSaveId: PropTypes.string,
	onTabClick: PropTypes.func,
	onCloseTab: PropTypes.func,
}

TabList.defaultProps = {
	// tilte: '我的云文档'
}

export default TabList
