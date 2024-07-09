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

const risks = [
  'Drought', 'Hot Days', 'Lethal Heat', 'Precipitation', 'Sea Level Rise',
  'Temperature', 'Tropical Cyclones', 'Warm Nights', 'Wildfires',
]

const riskTitles = {
  'Drought': 'Extreme drought',
  'Hot Days': 'Days over 90°F',
  'Lethal Heat': 'Lethal heat',
  'Precipitation': 'Annual precipitation',
  'Sea Level Rise': 'Sea level rise',
  'Temperature': 'Annual temperature',
  'Tropical Cyclones': 'Return period',
  'Warm Nights': 'Nights over 20°C',
  'Wildfires': 'Widlfire danger days',
}

const defaultRiskColors = {
  'Drought': 'red',
  'Hot Days': 'red',
  'Lethal Heat': 'red',
  'Precipitation': 'blue',
  'Sea Level Rise': 'blue',
  'Temperature': 'red',
  'Tropical Cyclones': 'gray',
  'Warm Nights': 'red',
  'Wildfires': 'orange',
}

const riskDescriptions = {
  'Drought': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      Probability of extreme drought. The likelihood of an event with a 10% or less chance of occurrence in the base period of 1°C of climate warming (2000-2020). 
      Hyper-arid regions are masked as drought cannot occur under permanently dry conditions. Drought is defined as a temporary negative anomaly in local water balance conditions.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
  'Hot Days': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      The number of days in a year with a daily maximum temperature over 90°F.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
  'Lethal Heat': 
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
  'Precipitation': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      Average annual precipitation.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
    'Sea Level Rise': 
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
  'Temperature': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      Average annual temperature.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
  'Tropical Cyclones':
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
  'Warm Nights': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      Heat stress. The number of days in a year with nightly minimum temperatures over 20°C. Increasing nighttime temperatures have implications for human health, agricultural yield, and the spread of pests and diseases.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
  'Wildfires': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      Wildfire danger days. The number of days in a year at or more extreme than the worst 5% of days of fire weather index (FWI) in the base period of 1°C of climate warming (2000-2020). 
      Non-vegetated regions are masked as wildfire is unlikely to occur in areas lacking fuel. FWI is based on meteorological variables only.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
}

const riskLayers = {
  'Drought': {
    variable: 'drought',
    values: { '1.5': true, '2.0': false, },
    colors: { '1.5': 'orange', '2.0': 'red', },
    labels: { '1.5': '1.5C', '2.0': '2.0C' },
  },
  'Hot Days': {
    variable: 'hot_days',
    values: { '1.5': true, '2.0': false, },
    colors: { '1.5': 'orange', '2.0': 'red', },
    labels: { '1.5': '1.5C', '2.0': '2.0C', },
  },
  'Lethal Heat': {
    variable: 'lethal_heat_3d',
    values: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0,],
    labels: { 'lethal_heat_3d': 'Warming level of emergence', },
  },
  'Precipitation': {
    variable: 'precip',
    values: { '1.5': true, '2.0': false, },
    colors: { '1.5': 'yellow', '2.0': 'orange', },
    labels: { '1.5': '1.5C', '2.0': '2.0C', },
  },
  'Temperature': {
    variable: 'tavg',
    values: { '1.5': true, '2.0': false, },
    colors: { '1.5': 'yellow', '2.0': 'orange', },
    labels: { '1.5': '1.5C', '2.0': '2.0C', },
  },
  'Tropical Cyclones': {
    variable: 'tc_rp',
    values: { '2017.0': true, '2050.0': false, },
    colors: { '2017.0': 'orange', '2050.0': 'red', },
    labels: { '2017.0': '1980-2017', '2050.0': '2015-2050', },
  },
  'Sea Level Rise': {
    variable: 'slr_3d',
    values: { '2050.0' : true, },
    colors: { '2050.0' : 'red', },
    labels: { '2050.0' : 'Depth value', },
  },
  'Warm Nights': {
    variable: 'warm_nights',
    values: { '1.5': true, '2.0': false, },
    colors: { '1.5': 'orange', '2.0': 'red', },
    labels: { '1.5': '1.5C', '2.0': '2.0C', },

  },
  'Wildfires': {
    variable: 'wdd',
    values: { '1.5': true, '2.0': false, },
    colors: { '1.5': 'orange', '2.0': 'red', },
    labels: { '1.5': '1.5C', '2.0': '2.0C', },
  },
}

const climRanges = {
  drought: { min: 0.0, max: 0.5 },
  hot_days: { min: 0.0, max: 365.0 },
  lethal_heat_3d: { min: 1.0, max: 4.0 },
  precip: { min: 0, max: 4000 },
  tavg: { min: -30, max: 30 },
  tc_rp: { min: 0.0, max: 100 },
  slr_3d: { min: -0.5, max: 0.5 },
  wdd: { min: 0.0, max: 50.0 }, // true max 70 days
  warm_nights: { min: 0.0, max: 365.0 },
}

const defaultColormaps = {
  drought: 'warm',
  hot_days: 'fire',
  lethal_heat_3d: 'fire',
  precip: 'water',
  tavg: 'redteal',
  tc_rp: 'fire', // water also looks good
  slr_3d: 'redteal', // tealgrey, redteal also looks good
  wdd: 'fire',
  warm_nights: 'fire',
}

const defaultLabels = {
  drought: 'Probability of extreme drought',
  hot_days: 'Number of days per year',
  lethal_heat_3d: '°C',
  precip: 'Precipitation',
  tavg: 'Temperature',
  tc_rp: 'Return period of Category 3+ storm',
  slr_3d: 'Sea level rise',
  wdd: 'Number of days per year',
  warm_nights: 'Number of nights per year',
}

const defaultUnits = {
  drought: '',
  hot_days: '',
  lethal_heat_3d: '',
  precip: '(mm)',
  tavg: '(°C)',
  tc_rp: '(years)',
  slr_3d: '(m)',
  wdd: '',
  warm_nights: '',
}

export {
  risks, riskTitles, defaultRiskColors, riskDescriptions,
  riskLayers, climRanges, defaultColormaps, defaultLabels, defaultUnits,
};