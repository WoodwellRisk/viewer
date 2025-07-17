import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMapbox } from '@carbonplan/maps'
import { useThemeUI } from 'theme-ui'
import { useThemedColormap } from '@carbonplan/colormaps'

import useStore from '../store/index'

// https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
// https://docs.mapbox.com/help/tutorials/create-interactive-hover-effects-with-mapbox-gl-js/
// https://www.woodwellclimate.org/project/just-access/completed-assessments/
const JustAccess = () => {
    const { map } = useMapbox()
    const { theme } = useThemeUI()

    return (null)

}

export default Map