const maxSM = 767
const maxMD = 1023

export const bpMaxSM = `@media (max-width: ${maxSM}px)`
export const bpMaxMD = `@media (max-width: ${maxMD}px)`

export const bpTabletOnly = `@media (min-width: ${maxSM +
  1}px) and (max-width: ${maxMD}px)`
export const bpDesktopOnly = `@media (min-width: ${maxMD + 1}px)`
