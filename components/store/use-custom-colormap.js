import { useMemo } from 'react'

import { customColormaps } from './colormaps'

// this method is modeled after the useColormap() method from Carbonplan
// https://github.com/carbonplan/colormaps/blob/main/src/use-colormap.mjs
const useCustomColormap = (colormap) => {
    const customColormap = useMemo(() => {
        return customColormaps[colormap];
    }, [colormap])

    return customColormap
}

export default useCustomColormap