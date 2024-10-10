import { create } from 'zustand'

const useStore = create((set) => ({
    // map container state
    zoom: 1,
    setZoom: (zoom) => set({ zoom }),

    zoomToBox: null,
    setZoomToBox: (zoomToBox) => set({ zoomToBox }),

    zoomInitialized: false,
    setZoomInitialized: (zoomInitialized) => set({ zoomInitialized }),

    center: [-40, 40],
    setCenter: (center) => set({ center }),

    glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",

    // general / raster state variables
    variable: 'drought',
    setVariable: (variable) => set({ variable }),

    band: 1.5,
    setBand: (band) => set({ band }),

    colormapName: 'warm',
    setColormapName: (colormapName) => set({ colormapName }),

    clim: [0.0, 0.5],
    setClim: (clim) => set({ clim }),

    opacity: 1,
    setOpacity: (opacity) => set({ opacity }),

    display: true,
    setDisplay: (display) => set({ display }),

    regionData: { loading: true },
    setRegionData: (regionData) => set({ regionData }),

    // regionLoadingData: true,
    // setRegionDataLoading: (regionLoadingData) => set({ regionLoadingData }),

    showRegionPicker: false,
    setShowRegionPicker: (showRegionPicker) => set({ showRegionPicker }),

    showOceanMask: true,
    setShowOceanMask: (showOceanMask) => set({ showOceanMask }),

    showLakes: false,
    setShowLakes: (showLakes) => set({ showLakes }),

    showLandOutline: true,
    setShowLandOutline: (showLandOutline) => set({ showLandOutline }),

    showCountriesOutline: false,
    setShowCountriesOutline: (showCountriesOutline) => set({ showCountriesOutline }),

    showStatesOutline: false,
    setShowStatesOutline: (showStatesOutline) => set({ showStatesOutline }),

    sliding: false,
    setSliding: (sliding) => set({ sliding }),

    showAbout: false,
    setShowAbout: (showAbout) => set({ showAbout }),

    showMenu: false,
    setShowMenu: (showMenu) => set({ showMenu }),

    showOverlays: false,
    setShowOverlays: (showOverlays) => set({ showOverlays }),

}))

export default useStore