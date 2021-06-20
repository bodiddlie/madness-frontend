import React from 'react';
import {Link} from 'react-router-dom';

import {MdMenu} from 'react-icons/md';

export default function Header() {
	return (
		<div className="p-2 flex w-full justify-between bg-blue-600">
			<MdMenu />
			<Link to="/login">Login</Link>
		</div>
	)
}