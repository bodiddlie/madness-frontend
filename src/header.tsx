import React from 'react';

import {MdMenu} from 'react-icons/md';

export default function Header() {
	return (
		<div className="p-2 flex w-full justify-between bg-blue-600">
			<MdMenu />
			<button>Sign In</button>
		</div>
	)
}