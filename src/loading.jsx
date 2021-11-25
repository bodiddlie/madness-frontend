import React from 'react';
import { GiGamepadCross } from 'react-icons/gi';

export function Loading() {
  return (
    <div className="flex-col flex-grow flex justify-center items-center text-8xl font-extrabold">
      <div className="slow-spin rounded-full h-36 w-36 border-4 border-black flex items-center justify-center">
        <div className="border-2 border-black flex items-center justify-center h-28 w-28 rounded-full">
          <GiGamepadCross />
        </div>
      </div>
    </div>
  );
}
