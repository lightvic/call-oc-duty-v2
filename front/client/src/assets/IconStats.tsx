import React from 'react'

function IconStats({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="20"
      fill="none"
      viewBox="0 0 15 20"
    >
      <rect width="3" height="9.412" y="10.588" fill={color} rx="1.5" />
      <rect width="3" height="20" x="6" fill={color} rx="1.5" />
      <rect width="3" height="14.118" x="12" y="5.882" fill={color} rx="1.5" />
    </svg>
  )
}

export default IconStats
