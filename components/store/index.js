import { create } from 'zustand'
import { Box } from 'theme-ui'
import { Link } from '@carbonplan/components'

const sx = {
    data_description: {
        fontSize: '14px',
        color: 'primary',
    },
    data_source: {
        mt: 2,
    }
}

const useStore = create((set, get) => ({
    // map container state
    zoom: 1,
    setZoom: (zoom) => set({ zoom }),

    center: [-40, 40],
    setCenter: (center) => set({ center }),

    glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",

    // general / raster state variables
    variables: [
        'cdd', 'drought', 'hdd', 'hot_days', 'lethal_heat', 'precip',
        'tavg', 'tc_rp', 'slr', 'wdd', 'warm_nights',
    ],
    variable: 'drought',
    setVariable: (variable) => set({ variable }),

    band: 1.5,
    setBand: (band) => set({ band }),

    defaultColormaps: {
        cdd: 'cool',
        drought: 'warm',
        hdd: 'cool', // could keep this cool if we wanted to match cdd
        hot_days: 'fire',
        lethal_heat: 'fire',
        precip: 'water',
        tavg: 'redteal',
        tc_rp: 'fire', // water also looks good
        slr: 'redteal', // tealgrey, redteal also looks good
        wdd: 'fire',
        warm_nights: 'fire',
    },
    colormapName: () => {
        const {defaultColormaps, variable} = get()
        return defaultColormaps[variable]
    },

    climRanges: {
        cdd: { min: 0.0, max: 10000 },
        drought: { min: 0.0, max: 0.5 },
        hdd: { min: 0.0, max: 15000 },
        hot_days: { min: 0.0, max: 365.0 },
        lethal_heat: { min: 1.0, max: 4.0 },
        precip: { min: 0, max: 2500 },
        tavg: { min: -30, max: 30 },
        tc_rp: { min: 0.0, max: 100 },
        slr: { min: -0.5, max: 0.5 },
        wdd: { min: 0.0, max: 50.0 }, // true max 70 days
        warm_nights: { min: 0.0, max: 365.0 },
    },
    clim: () => {
        const {climRanges, variable} = get()
        return [climRanges[variable].min, climRanges[variable].max]
    },
    // clim: [0.0, 0.5],
    // setClim: (clim) => set({ clim }),

    opacity: 1,
    setOpacity: (opacity) => set({ opacity }),

    display: true,
    setDisplay: (display) => set({ display }),

    regionData: { loading: true },
    setRegionData: (regionData) => set({ regionData }),

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

    showRegionsOutline: false,
    setShowRegionsOutline: (showRegionsOutline) => set({ showRegionsOutline }),

    showStatesOutline: false,
    setShowStatesOutline: (showStatesOutline) => set({ showStatesOutline }),
    showStatesZoom: 2.5, 

    sliding: false,
    setSliding: (sliding) => set({ sliding }),

    showAbout: false,
    setShowAbout: (showAbout) => set({ showAbout }),

    showAboutMobile: false,
    setShowAboutMobile: (showAboutMobile) => set({ showAboutMobile }),

    showMenu: false,
    setShowMenu: (showMenu) => set({ showMenu }),

    showOverlays: false,
    setShowOverlays: (showOverlays) => set({ showOverlays }),

    // sidebar options
    riskTitles: {
        cdd: 'Cooling degree days',
        drought: 'Extreme drought',
        hdd: 'Heating degree days',
        hot_days: 'Days over 90°F',
        lethal_heat: 'Lethal heat',
        precip: 'Annual precipitation',
        slr: 'Sea level rise',
        tavg: 'Annual temperature',
        tc_rp: 'Tropical cyclone risk',
        warm_nights: 'Nights over 20°C',
        wdd: 'Widlfire danger days',
    },
    riskTitle: () => {
        const {riskTitles, variable} = get()
        return riskTitles[variable]
    },

    riskThemes: {
        drought: true,
        hot_days: false,
        lethal_heat: false,
        precip: false,
        slr: false,
        tavg: false,
        tc_rp: false,
        warm_nights: false,
        wdd: false,
        cdd: false,
        hdd: false,
    },
    setRiskThemes: (riskThemes) => set({ riskThemes }),
    riskThemeLabels: {
        cdd: 'Cooling degree days',
        drought: 'Drought',
        hdd: 'Heating degree days',
        hot_days: 'Hot days',
        lethal_heat: 'Lethal heat',
        precip: 'Precipitation',
        slr: 'Sea level rise',
        tavg: 'Temperature', 
        tc_rp: 'Tropical cyclones',
        warm_nights: 'Warm nights',
        wdd: 'Widlfires'
    },
    riskThemeLookup: {
        'Cooling degree days': 'cdd',
        'Drought': 'drought',
        'Heating degree days': 'hdd',
        'Hot days': 'hot_days',
        'Lethal heat': 'lethal_heat',
        'Precipitation': 'precip',
        'Sea level rise': 'slr',
        'Temperature': 'tavg', 
        'Tropical cyclones': 'tc_rp',
        'Warm nights': 'warm_nights',
        'Widlfires': 'wdd',
    },

    riskDescriptions: {
        cdd:
        <Box className='risk-layer-description' sx={sx.data_description}>
            <Box>
                The annual cumulative sum of the difference between daily average temperature and a base temperature of 65°F, but only for days where the daily average temperature is over 65°F. 
            </Box>
            <Box sx={{mt: [2]}}>
                Cooling degree days is a metric designed to quantify the energy demand for air conditioning at a specific location.
                We used a uniform base temperature of 65°F to compare cooling degree days across locations.
            </Box>
            <Box sx={sx.data_source}>
                Base data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
            </Box>
        </Box>,
        drought:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Probability of extreme drought. The likelihood of an event with a 10% or less chance of occurrence in the base period of 1°C of climate warming (2000-2020).
                    Hyper-arid regions are masked as drought cannot occur under permanently dry conditions. Drought is defined as a temporary negative anomaly in local water balance conditions.
                </Box>
                <Box sx={sx.data_source}>
                    This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
                </Box>
            </Box>,
        hdd:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    The annual cumulative sum of the difference between 65°F and the daily average temperature, but only for days where the daily average temperature is under 65°F. 
                </Box>
                <Box sx={{mt: [2]}}>
                    Heating degree days is a metric designed to quantify the energy demand for building heating at a specific location. 
                    We used a uniform base temperature of 65°F to compare heating degree days across locations.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
                </Box>
            </Box>,
        hot_days:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    The number of days in a year with a daily maximum temperature over 90°F.
                </Box>
                <Box sx={sx.data_source}>
                    This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
                </Box>
            </Box>,
        lethal_heat:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    High temperatures and humidity may cause severe health problems therefore our lethal heat metric is derived from relative humidity and temperature.
                    It describes conditions that may be lethal for a healthy, non-heat-adapted human exposed for extended periods of time.
                    This data illustrates the warming level at which at least 1 day of at least 6 hours of lethal heat per year begins to occur.
                </Box>
                <Box sx={sx.data_source}>
                    To learn more about how this data layer was created, please see our <Link href="https://woodwellrisk.github.io/risks/heat/#lethal-heat-" target="_blank">methodology website.</Link>
                </Box>
            </Box>,
        precip:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Average annual precipitation.
                </Box>
                <Box sx={sx.data_source}>
                    This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
                </Box>
            </Box>,
        slr:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Future sea level change from the <Link href="https://www.ipcc.ch/assessment-report/ar6/" target="_blank">IPCC AR6</Link> report under a medium confidence fossil-fueled development pathway (SSP5-8.5) scenario.
                    The layer represents the median model projections from 2020 to 2050, relative to a <Link href="https://podaac.jpl.nasa.gov/announcements/2021-08-09-Sea-level-projections-from-the-IPCC-6th-Assessment-Report" target="_blank">1995-2014 baseline period</Link>.
                </Box>
                <Box sx={sx.data_source}>
                    The base data is from <Link href="https://sealevel.nasa.gov/data_tools/17" target="_blank">NASA Sea Level Change</Link>{' '}
                    with the vertical land movement data replaced with data from <Link href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2021JB022355" target="_blank">Hammond et al. (2021)</Link>.
                </Box>
            </Box>,
        tavg:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Average annual temperature.
                </Box>
                <Box sx={sx.data_source}>
                    This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
                </Box>
            </Box>,
        tc_rp:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Return period of Category 3+ tropical cyclones. The layer is based on generating thousands of years of simulated storm tracks within 100km of each location.
                    The resulting simulations include track locations and intensity, which can be used to make estimates of tropical cyclone approach probabilities for 1980-2017 and 2015-2050 under RCP8.5 conditions.
                </Box>
                <Box sx={sx.data_source}>
                    The data presented here was generated using the open-source STORM model and our Coastal Risk Framework.
                    For a more detailed discussion on how this data layer was created, please see our <Link href="https://woodwellrisk.github.io/risks/tropical-cyclones/" target="_blank">methodology website.</Link>
                </Box>
            </Box>,
        warm_nights:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Heat stress. The number of days in a year with nightly minimum temperatures over 20°C. 
                    Increasing nighttime temperatures have implications for human health, agricultural yield, and the spread of pests and diseases.
                </Box>
                <Box sx={sx.data_source}>
                    This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
                </Box>
            </Box>,
        wdd:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Wildfire danger days. The number of days in a year at or more extreme than the worst 5% of days of fire weather index (FWI) in the base period of 1°C of climate warming (2000-2020).
                    Non-vegetated regions are masked as wildfire is unlikely to occur in areas lacking fuel. FWI is based on meteorological variables only.
                </Box>
                <Box sx={sx.data_source}>
                    This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
                </Box>
            </Box>,
    },
    riskDescription: () => {
        const { riskDescriptions, variable } = get()
        return riskDescriptions[variable]
    },

    riskThemeColors: {
        cdd: 'red',
        drought: 'red',
        hdd: 'blue',
        hot_days: 'red',
        lethal_heat: 'red',
        precip: 'blue',
        slr: 'blue',
        tavg: 'red',
        tc_rp: 'gray',
        warm_nights: 'red',
        wdd: 'orange',
    },

    riskOptions: {
        cdd: {            
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            labels: { 'cdd': 'Warming level' },
        },
        drought: {            
            bands: [1.5, 2.0],
            labels: { 'drought': 'Warming level' },
        },
        hdd: {            
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            labels: { 'hdd': 'Warming level' },
        },
        hot_days: {
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            labels: { 'hot_days': 'Warming level' },
        },
        lethal_heat: {
            bands: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0,],
            labels: { 'lethal_heat': 'Warming level of emergence', },
        },
        precip: {
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            labels: { 'precip': 'Warming level' },
        },
        tavg: {
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            labels: { 'tavg': 'Warming level' },
        },
        tc_rp: {
            bands: [2017.0, 2050.0],
            bandLabels: { 2017.0: '1980-2017', 2050.0: '2015-2050', },
            labels: { 'tc_rp': 'Time period'},
        },
        slr: {
            bands: [2050.0],
            labels: { 'slr': 'Depth value by 2050', },
        },
        warm_nights: {
            bands: [1.5, 2.0],
            labels: { 'warm_nights': 'Warming level' },
        },
        wdd: {
            bands: [1.5, 2.0],
            labels: { 'wdd': 'Warming level' },
        },
    },

    // riskBands: () => {
    //     const {riskOptions, variable} = get()
    //     return riskOptions[variable].bands
    // },
    // riskBands: { '1.5': true, '2.0': false, },
    riskBands: [1.5, 2.0],
    setRiskBands: (riskBands) => set({ riskBands }),

    riskColors: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].colors
    },

    riskLabels: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].labels
    },

    defaultLabels: {
        cdd: 'Cooling degree days',
        drought: 'Probability of extreme drought',
        hdd: 'Heating degree days',
        hot_days: 'Number of days per year',
        lethal_heat: '°C',
        precip: 'Precipitation',
        tavg: 'Temperature',
        tc_rp: 'Return period of Category 3+ storm',
        slr: 'Sea level rise',
        wdd: 'Number of days per year',
        warm_nights: 'Number of nights per year',
    },
    colormapLabel: () => {
        const {defaultLabels, variable} = get()
        return defaultLabels[variable]
    },

    defaultUnits: {
        cdd: '',
        drought: '',
        hdd: '',
        hot_days: '',
        lethal_heat: '',
        precip: '(mm)',
        tavg: '(°C)',
        tc_rp: '(years)',
        slr: '(m)',
        wdd: '',
        warm_nights: '',
    },
    colormapUnits: () => {
        const {defaultUnits, variable} = get()
        return defaultUnits[variable]
    },

    // search options
    showSearch: false,
    setShowSearch: (showSearch) => set({ showSearch }),

    showFilter: true,
    setShowFilter: (showFilter) => set({ showFilter }),

    results: [],
    setResults: (results) => set({ results }),

    searchText: '',
    setSearchText: (searchText) => set({ searchText }),

    coordinates: null,
    setCoordinates: (coordinates) => set({ coordinates }),

    bbox: null,
    setBbox: (bbox) => set({ bbox }),

    searchBy: 'place',
    setSearchBy: (searchBy) => set({ searchBy }),

    place: null,
    setPlace: (place) => set({ place }),

    lookup: null,
    setLookup: (lookup) => set({ lookup }),

    latitudeInput: '',
    setLatitudeInput: (latitudeInput) => set({ latitudeInput }),

    longitudeInput: '',
    setLongitudeInput: (longitudeInput) => set({ longitudeInput }),

    latitude: '',
    setLatitude: (latitude) => set({ latitude }),

    longitude: '',
    setLongitude: (longitude) => set({ longitude }),

    validLatitude: true,
    setValidLatitude: (validLatitude) => set({ validLatitude }),

    validLongitude: true,
    setValidLongitude: (validLongitude) => set({ validLongitude }),

}))

export default useStore