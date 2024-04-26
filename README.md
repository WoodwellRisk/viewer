[mit license]: https://badgen.net/badge/license/MIT/blue
![MIT License][]

# Woodwell Risk data viewer
The purpose of this site is to increase public access to climate risk data while showcasing some of the datasets the Risk group uses to communicate climate risk to the communities and external partners it works with.

## Data sources
### Water stress
- Drought index [[NEX-GDDP-CMIP6]](https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6)
- Annual precipitation [[NEX-GDDP-CMIP6]](https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6)

### Wildfires
- Wildfire danger days [[NEX-GDDP-CMIP6]](https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6)

### Temperature
- Annual  mean temperature [[NEX-GDDP-CMIP6]](https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6)
- Hot days (days over 90°F) [[NEX-GDDP-CMIP6]](https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6)
- Lethal heat [Woodwell]
- Warm nights (nights over 20°C) [[NEX-GDDP-CMIP6]](https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6)

### Coastal risk
- Sea level rise depth value [[NASA](https://sealevel.nasa.gov/data_tools/17), [Hammond et al. (2021)](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2021JB022355)]
- Tropical cyclone return period [[STORM]](https://www.nature.com/articles/s41597-020-0381-2)


## Processing steps
### Vector data
Our boundary files came from Natural Earth. So far, we have used:
- 10m land and ocean boundaries [[link]](https://www.naturalearthdata.com/downloads/10m-physical-vectors/)
- 10m country- and state-level boundaries [[link]](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/).

All `SHP` files were converted to `GeoJSON` format in [GeoPandas](https://geopandas.org/en/stable/docs/reference/api/geopandas.GeoDataFrame.to_file.html). From there, we used [`Tippecanoe`](https://github.com/mapbox/tippecanoe) to convert the `GeoJSON` files to Mapbox `.mbtiles` format and used the Mapbox tool [`mbutil`](https://github.com/mapbox/mbutil) to convert those tiles to `.pbf` format. 

### Raster data
For back-end data analysis/transformation of `NetCDF` and `TIF` files, we used Python and R. Those rasters were then converted to Zarr pyramids using CarbonPlan's [ndpyramid](https://github.com/carbonplan/ndpyramid/tree/main) package.

## Acknowledgements
This site's interface and functionality rely heavily on code developed by [CarbonPlan](https://carbonplan.org/). Specifically, we used the [`maps`](https://github.com/carbonplan/maps), [`components`](https://github.com/carbonplan/components), and [`layouts`](https://github.com/carbonplan/layouts) libraries. We took inspiration from CarbonPlan's [forest risks](https://github.com/carbonplan/forest-risks-web) code repository to create an updated and modified user interface for this data viewer. You can read more about CarbonPlan's research and software development work [here](https://carbonplan.org/research).
