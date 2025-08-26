import { create } from 'zustand'
import { Box } from 'theme-ui'
import { Link } from '@carbonplan/components'

import {customColormaps} from './colormaps.js';

const sx = {
    data_description: {
        fontSize: '14px',
        color: 'primary',
    },
    data_source: {
        mt: 2,
    }
}

const NEX_URL = 'https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6'
const AGMIP_URL = 'https://agmip.org/'
const MAPSPAM_URL = 'https://www.mapspam.info/'

// NOTE: the order of the variables in the sidebar is determined both by the risks dictionary included in this
// store AND in the router component. So to keep track of which variables have been added, we can still maintain most
// lists in alphabetical order, but risks needs to be in a set order.

const useStore = create((set, get) => ({
    // map container state
    zoom: 1,
    setZoom: (zoom) => set({ zoom }),

    center: [-40, 40],
    setCenter: (center) => set({ center }),

    glyphs: 'http://fonts.openmaptiles.org/{fontstack}/{range}.pbf',

    // general / raster state variables
    variables: [
        'cdd', 'cf_irr', 'cf_rain', 'drought', 'hdd', 'hot_days', 'lethal_heat', 
        //'lsp', 
        'permafrost', 
        //'pm25', 
        'precip', 'tavg', 'tc_rp', 'slr', 'wdd', 'warm_nights',
    ],
    variable: 'drought',
    setVariable: (variable) => set({ variable }),

    cropOptions: {'maize': true, 'rice': false, 'soy': false, 'wheat': false},
    setCropOptions: (cropOptions) => set({ cropOptions }),
    
    crop: 'maize',
    setCrop: (crop) => set({ crop }),

    bandIndex: 0,
    setBandIndex: (bandIndex) => set({ bandIndex }),

    band: 1.5,
    setBand: (band) => set({ band }),

    customColormaps: customColormaps,

    opacity: 1,
    setOpacity: (opacity) => set({ opacity }),

    display: true,
    setDisplay: (display) => set({ display }),

    regionData: { loading: true },
    setRegionData: (regionData) => set({ regionData }),

    regionLoadingData: true,
    setRegionDataLoading: (regionLoadingData) => set({ regionLoadingData }),

    showRegionPicker: false,
    setShowRegionPicker: (showRegionPicker) => set({ showRegionPicker }),

    chartTypes: {bar: true, timeseries: false},
    setChartTypes: (chartTypes) => set({ chartTypes }),

    showOceanMask: true,
    setShowOceanMask: (showOceanMask) => set({ showOceanMask }),

    showJustAccess: false,
    setShowJustAccess: (showJustAccess) => set({ showJustAccess }),

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
    riskThemes: {
        'water stress': true, 
        'heat': false,
        'coastal risk': false,
        // 'flooding': false,
        'wildfire': false,
        'agriculture': false,
        'permafrost': false,
    },
    setRiskThemes: (riskThemes) => set({ riskThemes }),

    risks: {
        drought: true,
        hot_days: false,
        warm_nights: false,
        lethal_heat: false,
        tc_rp: false,
        permafrost: false,
        cf_irr: false,
        cf_rain: false,
        wdd: false,
        // pm25: false,
        // lsp: false,
        slr: false,
        tavg: false,
        precip: false,
        cdd: false,
        hdd: false,
    },
    setRisks: (risks) => set({ risks }),

    riskOptions: {
        cdd: {            
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            bandLabel: 'Warming level',
            riskTagLabel: 'Cooling degree days',
            riskTitle: 'Cooling degree days',
            riskDescription: 
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    The annual cumulative sum of the difference between daily average temperature and a base temperature of 65°F, but only for days where the daily average temperature is over 65°F. 
                </Box>
                <Box sx={{mt: [2]}}>
                    Cooling degree days is a metric designed to quantify the energy demand for air conditioning at a specific location.
                    We used a uniform base temperature of 65°F to compare cooling degree days across locations.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={NEX_URL} target='_blank'>NEX-GDDP-CMIP6</Link>.
                </Box>
            </Box>,
            colormapName: 'cool',
            clim: { min: 0.0, max: 10000 },
            colormapLabel: 'Cooling degree days',
            colormapUnits: '',
            statsLabel: 'degree days',
            chartLabel: 'degree days',
        },
        cf_irr: {   
            bands: [1990.0, 2030.0, 2050.0, 2090.0],
            bandLabels: ['1981-2000', '2021-2040', '2041-2060', '2081-2100',],
            bandLabel: 'Time period',
            riskTagLabel: 'Irrigated crops',
            riskTitle: 'Irrigated crop failure',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    The probability of at least a 10% yield failure for a given crop, clipped to <Link href={MAPSPAM_URL} target='_blank'>SPAM 2020</Link> irrigated crop extents.
                </Box>
                <Box sx={{mt: [2]}}>
                    Future risk to irrigated crops takes into account changing climate conditions without constraints on crop water availability. 
                    Any socioeconomic forcing or adaptation efforts are held constant at 2015 levels.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={AGMIP_URL} target='_blank'>AgMIP</Link> GGCMI Phase 3 based on CMIP6. 
                    To learn more about how this data layer was created, please see our <Link href='https://woodwellrisk.github.io/risks/agriculture/' target='_blank'>methodology website.</Link>
                </Box>
            </Box>,
            colormapName: 'greenyellowred',
            clim: { min: 0.0, max: 100 },
            colormapLabel: 'Probability of yield failure',
            colormapUnits: '%',
            statsLabel: '%',
            chartLabel: 'Probability (%)',
        },
        cf_rain: {            
            bands: [1990.0, 2030.0, 2050.0, 2090.0],
            bandLabels: ['1981-2000', '2021-2040', '2041-2060', '2081-2100',],
            bandLabel: 'Time period',
            riskTagLabel: 'Rainfed crops',
            riskTitle: 'Rainfed crop failure',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    The probability of at least a 10% yield failure for a given crop, clipped to <Link href={MAPSPAM_URL} target='_blank'>SPAM 2020</Link> rainfed crop extents.
                </Box>
                <Box sx={{mt: [2]}}>
                    Future risk to rainfed crops takes into account changing climate conditions. Any socioeconomic forcing or adaptation efforts are held constant at 2015 levels.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={AGMIP_URL} target='_blank'>AgMIP</Link> GGCMI Phase 3 based on CMIP6. 
                    To learn more about how this data layer was created, please see our <Link href='https://woodwellrisk.github.io/risks/agriculture/' target='_blank'>methodology website.</Link>
                </Box>
            </Box>,
            colormapName: 'greenyellowred',
            clim: { min: 0.0, max: 100 },
            colormapLabel: 'Probability of yield failure',
            colormapUnits: '%',
            statsLabel: '%',
            chartLabel: 'Probability (%)',
        },
        drought: {            
            bands: [1.5, 2.0, 2.5, 3.0, 3.5],
            bandLabel: 'Warming level',
            riskTagLabel: 'Drought',
            riskTitle: 'Extreme drought',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Probability of extreme drought. The likelihood of an event with a 10% or less chance of occurrence in the base period of 1°C of climate warming (2000-2020).
                    Hyper-arid regions are masked as drought cannot occur under permanently dry conditions. Drought is defined as a temporary negative anomaly in local water balance conditions.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={NEX_URL} target='_blank'>NEX-GDDP-CMIP6</Link>.
                </Box>
            </Box>,
            colormapName: 'warm',
            clim: { min: 0.0, max: 75.0 },
            colormapLabel: 'Probability of extreme drought',
            colormapUnits: '',
            statsLabel: '%',
            chartLabel: 'Probability (%)',
        },
        hdd: {            
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            bandLabel: 'Warming level',
            riskTagLabel: 'Heating degree days',
            riskTitle: 'Heating degree days',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    The annual cumulative sum of the difference between 65°F and the daily average temperature, but only for days where the daily average temperature is under 65°F. 
                </Box>
                <Box sx={{mt: [2]}}>
                    Heating degree days is a metric designed to quantify the energy demand for building heating at a specific location. 
                    We used a uniform base temperature of 65°F to compare heating degree days across locations.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={NEX_URL} target='_blank'>NEX-GDDP-CMIP6</Link>.
                </Box>
            </Box>,
            colormapName: 'cool',
            clim: { min: 0.0, max: 15000 },
            colormapLabel: 'Heating degree days',
            colormapUnits: '',
            statsLabel: 'degree days',
            chartLabel: 'degree days',
        },
        hot_days: {
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            bandLabel: 'Warming level',
            riskTagLabel: 'Hot days',
            riskTitle: 'Days over 90°F',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    The number of days in a year with a daily maximum temperature over 90°F (~32.2°C).
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={NEX_URL} target='_blank'>NEX-GDDP-CMIP6</Link>.
                </Box>
            </Box>,
            colormapName: 'fire',
            clim: { min: 0.0, max: 365.0 },
            colormapLabel: 'Number of days per year',
            colormapUnits: '',
            statsLabel: 'days',
            chartLabel: 'days per year',
        },
        lethal_heat: {
            bands: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0,],
            bandLabel: 'Warming level of emergence',
            riskTagLabel: 'Lethal heat',
            riskTitle: 'Lethal heat',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    High temperatures and humidity may cause severe health problems therefore our lethal heat metric is derived from relative humidity and temperature.
                    It describes conditions that may be lethal for a healthy, non-heat-adapted human exposed for extended periods of time.
                    This data illustrates the warming level at which at least 1 day of at least 6 hours of lethal heat per year begins to occur.
                </Box>
                <Box sx={sx.data_source}>
                    To learn more about how this data layer was created, please see our <Link href='https://woodwellrisk.github.io/risks/heat/#lethal-heat-' target='_blank'>methodology website.</Link>
                </Box>
            </Box>,
            colormapName: 'fire',
            clim: { min: 1.0, max: 4.0 },
            colormapLabel: '°C',
            colormapUnits: '',
            statsLabel: '°C',
            chartLabel: '',
        },
        lsp: {
            bands: [2000.0, 2050.0, 2100.0],
            bandLabel: 'Time period',
            riskTagLabel: 'Lost solar potential',
            riskTitle: 'Lost solar potential',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Lost solar potential
                </Box>
                {/* <Box sx={sx.data_source}>
                    ...
                </Box> */}
            </Box>,
            colormapName: 'cool',
            clim: { min: 0.0, max: 10.0 },
            colormapLabel: '',
            colormapUnits: '%',
            statsLabel: '%',
            chartLabel: '',
        },
        permafrost: {
            bands: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0,],
            bandLabel: 'Warming level',
            riskTagLabel: 'Permafrost',
            riskTitle: 'Permafrost loss',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    The likelihood of permafrost extent. Permafrost is considered to be present if the active layer thickness, or the depth of the soil layer that thaws seasonally in the summer, is less than 3 meters.
                    Glaciated areas are masked. In general, it is hard to monitor permafrost under glaciers and ice sheets and not much is known about permafrost in Antarctica.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from CMIP6 climate model output.
                </Box>
                <Box sx={sx.data_source}>
                    To learn more about how this data layer was created, please see our <Link href='https://woodwellrisk.github.io/risks/permafrost/' target='_blank'>methodology website.</Link>
                </Box>
            </Box>,
            colormapName: 'cool',
            clim: { min: 0.0, max: 100.0 },
            colormapLabel: 'Likelihood',
            colormapUnits: '(%)',
            statsLabel: '%',
            chartLabel: 'Likelihood (%)',
        },
        pm25: {
            bands: [2000.0, 2050.0, 2100.0],
            bandLabel: 'Time period',
            riskTagLabel: 'PM2.5',
            riskTitle: 'PM2.5 concentration',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    PM2.5
                </Box>
                {/* <Box sx={sx.data_source}>
                    ...
                </Box> */}
            </Box>,
            colormapName: 'cool',
            clim: { min: 0.0, max: 25.0 },
            colormapLabel: 'Concentration',
            colormapUnits: '(μg / m^3)',
            statsLabel: 'μg / m^3',
            chartLabel: 'Concentration (μg / m^3)',
        },
        precip: {
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            bandLabel: 'Warming level',
            riskTagLabel: 'Precipitation',
            riskTitle: 'Annual precipitation',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Average annual precipitation.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={NEX_URL} target='_blank'>NEX-GDDP-CMIP6</Link>.
                </Box>
            </Box>,
            colormapName: 'water',
            clim: { min: 0, max: 2500 },
            colormapLabel: 'Precipitation',
            colormapUnits: '(mm)',
            statsLabel: 'mm',
            chartLabel: 'Precipitation (mm)',
        },
        slr: {
            bands: [2050.0],
            bandLabel: 'Depth value by 2050',
            riskTagLabel: 'Sea level rise',
            riskTitle: 'Sea level rise',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Future sea level change from the <Link href='https://www.ipcc.ch/assessment-report/ar6/' target='_blank'>IPCC AR6</Link> report under a medium confidence fossil-fueled development pathway (SSP5-8.5) scenario.
                    The layer represents the median model projections from 2020 to 2050, relative to a <Link href='https://podaac.jpl.nasa.gov/announcements/2021-08-09-Sea-level-projections-from-the-IPCC-6th-Assessment-Report' target='_blank'>1995-2014 baseline period</Link>.
                </Box>
                <Box sx={sx.data_source}>
                    The base data is from <Link href='https://sealevel.nasa.gov/data_tools/17' target='_blank'>NASA Sea Level Change</Link>{' '}
                    with the vertical land movement data replaced with data from <Link href='https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2021JB022355' target='_blank'>Hammond et al. (2021)</Link>.
                </Box>
            </Box>,
            colormapName: 'redteal', // tealgrey also looks good
            clim: { min: -0.5, max: 0.5 },
            colormapLabel: 'Sea level rise',
            colormapUnits: '(m)',
            statsLabel: 'meters',
            chartLabel: 'meters',
        },
        tavg: {
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            bandLabel: 'Warming level',
            riskTagLabel: 'Temperature',
            riskTitle: 'Annual temperature',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Average annual temperature.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={NEX_URL} target='_blank'>NEX-GDDP-CMIP6</Link>.
                </Box>
            </Box>,
            colormapName: 'magma',
            clim: { min: -25, max: 30 },
            colormapLabel: 'Temperature',
            colormapUnits: '(°C)',
            statsLabel: 'ºC',
            chartLabel: 'Temperature (ºC)',
        },
        tc_rp: {
            bands: [2017.0, 2050.0],
            bandLabels: ['1980-2017', '2015-2050',],
            riskTagLabel: 'Tropical cyclones',
            bandLabel: 'Time period',
            riskTitle: 'Tropical cyclone risk',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Return period of Category 3+ tropical cyclones. The layer is based on generating thousands of years of simulated storm tracks within 100km of each location.
                    The resulting simulations include track locations and intensity, which can be used to make estimates of tropical cyclone approach probabilities for 1980-2017 and 2015-2050 under RCP8.5 conditions.
                </Box>
                <Box sx={sx.data_source}>
                    The data presented here was generated using the open-source STORM model and our Coastal Risk Framework.
                    For a more detailed discussion on how this data layer was created, please see our <Link href='https://woodwellrisk.github.io/risks/tropical-cyclones/' target='_blank'>methodology website.</Link>
                </Box>
            </Box>,
            colormapName: 'fire',
            clim: { min: 0.0, max: 100 },
            colormapLabel: 'Return period of Category 3+ storm',
            colormapUnits: '(years)',
            statsLabel: 'years',
            chartLabel: 'Return period (years)',
        },
        warm_nights: {
            bands: [1.5, 2.0, 2.5, 3.0, 3.5,],
            bandLabel: 'Warming level',
            riskTagLabel: 'Warm nights',
            riskTitle: 'Nights over 68°F',
            riskDescription:
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Heat stress. The number of days in a year with nightly minimum temperatures over 68°F (20°C). 
                    Increasing nighttime temperatures have implications for human health, agricultural yield, and the spread of pests and diseases.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={NEX_URL} target='_blank'>NEX-GDDP-CMIP6</Link>.
                </Box>
            </Box>,
            colormapName: 'fire',
            clim: { min: 0.0, max: 365.0 },
            colormapLabel: 'Number of nights per year',
            colormapUnits: '',
            statsLabel: 'nights',
            chartLabel: 'nights per year',
        },
        wdd: {
            bands: [1.5, 2.0, 2.5, 3.0, 3.5],
            bandLabel: 'Warming level',
            riskTagLabel: 'Widlfires',
            riskTitle: 'Widlfire danger days',
            riskDescription: 
            <Box className='risk-layer-description' sx={sx.data_description}>
                <Box>
                    Wildfire danger days. The number of days in a year at or more extreme than the worst 5% of days of fire weather index (FWI) in the base period of 1°C of climate warming (2000-2020). 
                    Non-vegetated regions are masked as wildfire is unlikely to occur in areas lacking fuel. 
                    FWI is based on meteorological variables only.
                </Box>
                <Box sx={sx.data_source}>
                    Base data from <Link href={NEX_URL} target='_blank'>NEX-GDDP-CMIP6</Link>.
                </Box>
            </Box>,
            colormapName: 'fire',
            clim: { min: 0.0, max: 75.0 },
            colormapLabel: 'Number of days per year',
            colormapUnits: '',
            statsLabel: 'danger days',
            chartLabel: 'days per year',
        },
    },

    riskBands: [1.5, 2.0, 2.5, 3.0, 3.5],
    setRiskBands: (riskBands) => set({ riskBands }),

    colormapName: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].colormapName
    },

    clim: () => {
        const {riskOptions, variable} = get()
        return [riskOptions[variable].clim.min, riskOptions[variable].clim.max]
    },

    riskTagLabels: () => {
        const {riskOptions, variables} = get()
        let tagLabels = {}
        variables.forEach((v) => {
            tagLabels[v] = riskOptions[v].riskTagLabel;
        })
        return tagLabels
    },

    riskTagLookup: () => {
        const {riskOptions, variables} = get()
        let tagLookup = {}
        variables.forEach((v) => {
            tagLookup[riskOptions[v].riskTagLabel] = v;
        })
        return tagLookup
    },

    riskTitle: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].riskTitle
    },

    riskDescription: () => {
        const { riskOptions, variable } = get()
        return riskOptions[variable].riskDescription
    },

    bandLabel: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].bandLabel
    },

    colormapLabel: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].colormapLabel;
    },

    colormapUnits: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].colormapUnits;
    },

    statsLabel: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].statsLabel
    },

    chartLabel: () => {
        const {riskOptions, variable} = get()
        return riskOptions[variable].chartLabel
    },

    // search options
    showSearch: false,
    setShowSearch: (showSearch) => set({ showSearch }),

    showSpinner: false,
    setShowSpinner: (showSpinner) => set({ showSpinner }),

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