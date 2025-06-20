import React from 'react'
import { Divider } from 'theme-ui'

// This component is a slight variation on CarbonPlan's SidebarDivider component
// https://github.com/carbonplan/layouts/blob/main/src/sidebar/sidebar-divider.js
// I have found that having ...sx in their component before declaring width and ml causes 
// containers to overflow in the horizontal direction. By including it last, I can easily override this behavior.

const SidebarDivider = ({ sx }) => {
  return (
    <Divider
      sx={{
        width: [
          'calc(100% + 64px)',
          'calc(100% + 64px)',
          'calc(100% + 64px)',
          'calc(100% + 98px)',
        ],
        ml: ['-32px', '-32px', '-32px', '-48px'],
        ...sx,
      }}
    />
  )
}

export default SidebarDivider