import { useEffect } from 'react'
import { useMapbox } from '@carbonplan/maps'

import useStore from '../store/index'

const LayerOrder = () => {
    const { map } = useMapbox()
    const variable = useStore((state) => state.variable)
    const zoom = useStore((state) => state.zoom)
    const showStatesZoom = useStore((state) => state.showStatesZoom)
    const place = useStore((state) => state.place)
    const showSearchLayer = useStore((state) => state.showSearchLayer)
    const showStatesOutline = useStore((state) => state.showStatesOutline)
    const showCountriesOutline = useStore((state) => state.showCountriesOutline)

    useEffect(() => {
        if(showCountriesOutline && showStatesOutline && zoom >= showStatesZoom) {
            let layers = map.getStyle().layers;
            let states = layers.filter((layer) => layer.source == 'states')[0]
            let countries = layers.filter((layer) => layer.source == 'countries')[0]
            
            if(countries.length != 0) {
                map.moveLayer(states.id, countries.id)
            }
        }
      }, [showStatesOutline])

      useEffect(() => {
        if(showSearchLayer && (showCountriesOutline || showStatesOutline)) {
            let layers = map.getStyle().layers;
            console.log(layers)
            let states = layers.filter((layer) => layer.source == 'states')[0]
            let countries = layers.filter((layer) => layer.source == 'countries')[0]
            let searchLayer = layers.filter((layer) => layer.source.startsWith('search-layer'))[0]

            if(searchLayer && showCountriesOutline) {
                map.moveLayer(countries.id, searchLayer.id)
            } 
            if (searchLayer && showStatesOutline && zoom >= showStatesZoom) {
                map.moveLayer(states.id, searchLayer.id)
            }
        }
      }, [place, showStatesOutline, showCountriesOutline])

      useEffect(() => {
        let layers = map.getStyle().layers; 

        if(variable != 'slr' && !variable.startsWith('tc')) {
            let oceanFill = layers.filter((layer) => layer.source == 'ocean-fill')[0]
            let ocean = layers.filter((layer) => layer.source == 'ocean')[0]
            
            if(oceanFill.length != 0) {
                map.moveLayer(oceanFill.id, ocean.id)
            }
        }
        if(variable == 'slr') {
            let landFill = layers.filter((layer) => layer.source == 'land-fill')[0]
            let ocean = layers.filter((layer) => layer.source == 'ocean')[0]
            
            if(landFill.length != 0) {
                map.moveLayer(landFill.id, ocean.id)
            }
        }
      }, [variable])

      return null
}

export default LayerOrder