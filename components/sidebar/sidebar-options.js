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
  // 'Tropical Cyclones': 'Events per year',
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
      This layer corresponds to the probability of extreme drought, which we define as an event with a less than 10% chance of occurring under 1°C of global warming.
      Hyper-arid regions are masked out of this layer given drought cannot occur under permanently dry conditions.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
  'Hot Days': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      This layer shows the number of days per year regions are likely to see with temperatures over 90°F, relative to 1°C of global warming. 
      This is slightly different from the “summer days” metric Copernicus details on their <Link href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/sis-agroclimatic-indicators?tab=overview" target="_blank">Agroclimatic indicators</Link>{' '} 
      site, but can be thought of as a measure of heat stress.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
  'Lethal Heat': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      In very hot or very humid conditions, heat can become lethal to people exposed for extended periods of time.
      The 'warming level of emergence' is the warming level at which a location begins to see at least 1 day of lethal heat per year.
    </Box>
    <Box sx={sx.data_source}>
      To learn more about how this data layer was created, please see our <Link href="https://woodwellrisk.github.io/risk_heat/#lethal-heat-" target="_blank">methodology website.</Link>
    </Box>
  </Box>,
  'Precipitation': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      This layer shows average annual precipitation.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
    'Sea Level Rise': 
    <Box className='risk-layer-description' sx={sx.data_description}>
      <Box>
        This layer shows the future sea level change from the <Link href="https://www.ipcc.ch/assessment-report/ar6/" target="_blank">IPCC AR6</Link> report under the SSP5-8.5 medium confidence scenario. 
        Future sea level change shown in this layer represents the median model projections from 2020 to 2050, relative to a <Link href="https://podaac.jpl.nasa.gov/announcements/2021-08-09-Sea-level-projections-from-the-IPCC-6th-Assessment-Report" target="_blank">1995-2014 baseline period</Link>.
      </Box>
      <Box sx={sx.data_source}>
        The input data for this layer came from <Link href="https://sealevel.nasa.gov/data_tools/17" target="_blank">NASA Sea Level Change</Link>,
        though  the vertical land movement data in the sea level change dataset was replaced with data from <Link href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2021JB022355" target="_blank">Hammond et al. (2021)</Link>.
      </Box>
    </Box>,
  'Temperature': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      This layer shows average annual temperature.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
  'Tropical Cyclones':
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      This layer shows the return period of Category 3+ tropical cyclones, calculated by generating thousands of years of simulated storm tracks using the open-source STORM model.
      Using this simulated data, we can make estimates of tropical cyclone probabilities for 1980-2017 and 2015-2050 under RCP8.5 conditions.
    </Box>
    <Box sx={sx.data_source}>
      For a more detailed discussion on how this data layer was created, please see our <Link href="https://woodwellrisk.github.io/risk_tropical-cyclone/" target="_blank">methodology website.</Link>
    </Box>
  </Box>,
  'Warm Nights': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      This layer shows the number of days per year regions are likely to see with nightly minimum temperatures over 20°C, relative to 1°C of global warming. 
      This is what Copernicus calls “tropical nights” on their <Link href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/sis-agroclimatic-indicators?tab=overview" target="_blank">Agroclimatic indicators</Link> site. 
      Increasing nighttime temperatures have implications for human health, agricultural yield, and the spread of pests and diseases. 
      Nighttime temperatures seem to be rising at a faster rate than daytime temperatures, which is especially problematic as warm nights are often coupled with heatwaves.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
  'Wildfires': 
  <Box className='risk-layer-description' sx={sx.data_description}>
    <Box>
      This layer shows wildfire danger days, which we define as days with weather conditions more prone to wildfire than the top 5% of days under 1°C of global warming. 
      Non-vegetated regions are masked out of this layer given wildfire is unlikely to occur in them.
    </Box>
    <Box sx={sx.data_source}>
      This data layer was created using input data from the <Link href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6" target="_blank">NEX-GDDP-CMIP6</Link> dataset.
    </Box>
  </Box>,
}

const riskLayers = {
  'Drought': {
    values: { 'drought_1_5': true, 'drought_2_0': false, },
    colors: { 'drought_1_5': 'orange', 'drought_2_0': 'red', },
    labels: { 'drought_1_5': '1.5C', 'drought_2_0': '2.0C' },
  },
  'Hot Days': {
    values: { 'hot_days_1_5': true, 'hot_days_2_0': false, },
    colors: { 'hot_days_1_5': 'orange', 'hot_days_2_0': 'red', },
    labels: { 'hot_days_1_5': '1.5C', 'hot_days_2_0': '2.0C', },
  },
  'Lethal Heat': {
    values: { 'lethal_heat': true, },
    colors: { 'lethal_heat': 'red', },
    labels: { 'lethal_heat': 'Warming level of emergence', },
  },
  'Precipitation': {
    values: { 'precip_1_5': true, 'precip_2_0': false, 'precip_3_0': false, },
    colors: { 'precip_1_5': 'yellow', 'precip_2_0': 'orange', 'precip_3_0': 'red' },
    labels: { 'precip_1_5': '1.5C', 'precip_2_0': '2.0C', 'precip_3_0': '3.0C' },
  },
  'Temperature': {
    values: { 'tavg_1_5': true, 'tavg_2_0': false, 'tavg_3_0': false },
    colors: { 'tavg_1_5': 'yellow', 'tavg_2_0': 'orange', 'tavg_3_0': 'red' },
    labels: { 'tavg_1_5': '1.5C', 'tavg_2_0': '2.0C', 'tavg_3_0': '3.0C', },
  },
  // 'Tropical Cyclones': {
  //   values: { 'tc_epy_nt': true, 'tc_epy_lt': false, },
  //   colors: { 'tc_epy_nt': 'orange', 'tc_epy_lt': 'red', },
  //   labels: { 'tc_epy_nt': 'TC risk (1980-2017)', 'tc_epy_lt': 'TC risk (2015-2050)', },
  // },
  'Tropical Cyclones': {
    values: { 'tc_rp_nt': true, 'tc_rp_lt': false, },
    colors: { 'tc_rp_nt': 'orange', 'tc_rp_lt': 'red', },
    labels: { 'tc_rp_nt': '1980-2017', 'tc_rp_lt': '2015-2050', },
  },
  'Sea Level Rise': {
    values: { 'slr': true, },
    colors: { 'slr': 'red', },
    labels: { 'slr': 'Depth value', },
  },
  'Warm Nights': {
    values: { 'wn_1_5': true, 'wn_2_0': false, },
    colors: { 'wn_1_5': 'orange', 'wn_2_0': 'red', },
    labels: { 'wn_1_5': '1.5C', 'wn_2_0': '2.0C', },

  },
  'Wildfires': {
    values: { 'wdd_1_5': true, 'wdd_2_0': false, },
    colors: { 'wdd_1_5': 'orange', 'wdd_2_0': 'red', },
    labels: { 'wdd_1_5': '1.5C', 'wdd_2_0': '2.0C', },
  },
}

const climRanges = {
  drought_1_5: { min: 0.0, max: 0.5 },
  drought_2_0: { min: 0.0, max: 0.5 },
  hot_days_1_5: { min: 0.0, max: 365.0 },
  hot_days_2_0: { min: 0.0, max: 365.0 },
  lethal_heat: { min: 1.0, max: 4.0 },
  precip: { min: 0, max: 232.4 },
  precip_1_5: { min: 0, max: 4000 },
  precip_2_0: { min: 0, max: 4000 },
  precip_3_0: { min: 0, max: 4000 },
  tavg_1_5: { min: -30, max: 30 },
  tavg_2_0: { min: -30, max: 30 },
  tavg_3_0: { min: -30, max: 30 },
  // tc_epy_nt: { min: 0.0, max: 0.7 },
  // tc_epy_lt: { min: 0.0, max: 0.7 },
  tc_rp_nt: { min: 0.0, max: 100 },
  tc_rp_lt: { min: 0.0, max: 100 },
  slr: { min: 0.0, max: 0.5 },
  wdd_1_5: { min: 0.0, max: 50.0 }, // true max 70 days
  wdd_2_0: { min: 0.0, max: 50.0 }, // true max 70 days
  wn_1_5: { min: 0.0, max: 365.0 },
  wn_2_0: { min: 0.0, max: 365.0 },
}

const defaultColormaps = {
  drought_1_5: 'warm',
  drought_2_0: 'warm',
  hot_days_1_5: 'fire',
  hot_days_2_0: 'fire',
  lethal_heat: 'fire',
  precip_1_5: 'water',
  precip_2_0: 'water',
  precip_3_0: 'water',
  tavg_1_5: 'redteal',
  tavg_2_0: 'redteal',
  tavg_3_0: 'redteal',
  // tc_epy_nt: 'fire', // water also looks good
  // tc_epy_lt: 'fire', // water also looks good
  tc_rp_nt: 'fire', // water also looks good
  tc_rp_lt: 'fire', // water also looks good
  slr: 'water',
  wdd_1_5: 'fire',
  wdd_2_0: 'fire',
  wn_1_5: 'fire',
  wn_2_0: 'fire',
}

const defaultLabels = {
  drought_1_5: 'Probability of extreme drought',
  drought_2_0: 'Probability of extreme drought',
  hot_days_1_5: 'Number of days per year',
  hot_days_2_0: 'Number of days per year',
  lethal_heat: '°C',
  precip_1_5: 'Precipitation',
  precip_2_0: 'Precipitation',
  precip_3_0: 'Precipitation',
  tavg_1_5: 'Temperature',
  tavg_2_0: 'Temperature',
  tavg_3_0: 'Temperature',
  // tc_epy_nt: 'Events / year',
  // tc_epy_lt: 'Events / year',
  tc_rp_nt: 'Return period of Category 3+ storm',
  tc_rp_lt: 'Return period of Category 3+ storm',
  slr: 'Sea level rise',
  wdd_1_5: 'Number of days per year',
  wdd_2_0: 'Number of days per year',
  wn_1_5: 'Number of nights per year',
  wn_2_0: 'Number of nights per year',
}

const defaultUnits = {
  drought_1_5: '',
  drought_2_0: '',
  hot_days_1_5: '',
  hot_days_2_0: '',
  precip_1_5: '(mm)',
  precip_2_0: '(mm)',
  precip_3_0: '(mm)',
  tavg_1_5: '(°C)',
  tavg_2_0: '(°C)',
  tavg_3_0: '(°C)',
  // tc_epy_nt: '(Category 3+)',
  // tc_epy_lt: '(Category 3+)',
  tc_rp_nt: '(years)',
  tc_rp_lt: '(years)',
  slr: '(m)',
  wdd_1_5: '',
  wdd_2_0: '',
  wn_1_5: '',
  wn_2_0: '',
}

export {
  risks, riskTitles, defaultRiskColors, riskDescriptions,
  riskLayers, climRanges, defaultColormaps, defaultLabels, defaultUnits,
};