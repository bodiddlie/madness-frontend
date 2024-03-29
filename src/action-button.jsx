import React from 'react';
import { GiGamepadCross } from 'react-icons/gi';

export function ActionButton({
  performingAction,
  onClick,
  positive,
  negative,
  children,
  className,
}) {
  let classes =
    'py-3 px-6 text-white rounded-lg shadow-lg border self-end disabled:bg-gray-200 disabled:border-gray-800 disabled:text-gray-800 ' +
    className;
  if (positive) {
    classes += ' bg-green-400 border-green-400';
  } else if (negative) {
    classes += ' bg-red-400 border-red-400';
  } else {
    classes += ' bg-blue-400 border-blue-400';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={performingAction}
      className={classes}
    >
      {performingAction ? (
        <span className="text-2xl fast-spin inline-block">
          <GiGamepadCross />
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
