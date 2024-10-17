import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { useMapbox } from '@carbonplan/maps'

import useStore from '../store/index'

const Router = () => {
    const { map } = useMapbox()
    const router = useRouter()
    const pathname = usePathname()

    const variable = useStore((state) => state.variable)
    const setVariable = useStore((state) => state.setVariable)
    const setRiskThemes = useStore((state) => state.setRiskThemes)
    const riskLayers = useStore((state) => state.riskLayers)
    const band = useStore((state) => state.band)
    const setBand = useStore((state) => state.setBand)
    const zoom = useStore((state) => state.zoom)
    const setZoom = useStore((state) => state.setZoom)
    const center = useStore((state) => state.center)
    const setCenter = useStore((state) => state.setCenter)

    useEffect(() => {
        const url = new URL(window.location)
        let savedLayer = url.searchParams.get("layer") != null ? url.searchParams.get("layer") : 'drought'
        // let savedBand = url.searchParams.get("band") != null ? url.searchParams.get("band") : '1.5'
        // if (savedLayer != 'lethal_heat_3d') {
        //     let keys = Object.keys(riskLayers[savedLayer].bands);
        //     console.log(keys)
        //     if (keys.includes(savedBand)) {
        //         ...
        //     } else {
        //         ...
        //     }
        // } else { // else layer is equal to lethal_heat_3d
        //     ...
        // }
        let savedZoom = url.searchParams.get("zoom") != null ? url.searchParams.get("zoom") : 1
        let savedCenter = url.searchParams.get("center") != null ? url.searchParams.get("center") : '-40, 40'
        savedCenter = savedCenter.split(',').map((d) => parseFloat(d))

        setVariable(savedLayer)
        if (savedLayer != 'lethal_heat_3d') {
            let riskBands = Object.keys(riskLayers[savedLayer].bands)
            setBand(parseFloat(Object.keys(riskLayers[savedLayer].bands)[0]))
          } else {
            let riskBands = riskLayers[savedLayer].bands
            setBand(riskBands[riskBands.length - 1])
          }
        // setBand(savedBand)
        setZoom(savedZoom)
        setCenter(savedCenter)

        setRiskThemes({
            drought: savedLayer == 'drought',
            hot_days: savedLayer == 'hot_days',
            lethal_heat_3d: savedLayer == 'lethal_heat_3d',
            precip: savedLayer == 'precip',
            slr_3d: savedLayer == 'slr_3d',
            tavg: savedLayer == 'tavg',
            tc_rp: savedLayer == 'tc_rp',
            warm_nights: savedLayer == 'warm_nights',
            wdd: savedLayer == 'wdd',
        })

        if (!url.searchParams.has("layer")) {
            url.searchParams.set("layer", savedLayer)
        }
        // if (!url.searchParams.has("band")) {
        //     url.searchParams.set("band", savedBand)
        // }
        if (!url.searchParams.has("zoom")) {
            url.searchParams.set("zoom", savedZoom)
        }
        if (!url.searchParams.has("center")) {
            url.searchParams.set("center", savedCenter)
        }

        if (map && savedZoom && savedCenter) {
            map.easeTo({
                center: savedCenter,
                zoom: parseFloat(savedZoom),
                duration: 0,
            })
        }

        router.replace(`${pathname}?${url.searchParams}`)
        // prevent back button
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
        window.history.pushState(null, null, url);
        window.onpopstate = () => window.history.go(1)

    }, [window.onload]);

    useEffect(() => {
        const url = new URL(window.location)
        url.searchParams.set('layer', variable)
        router.push(`${pathname}?${url.searchParams}`)
    }, [variable])

    // useEffect(() => {
    //     console.log(band)
    //     // const url = new URL(window.location)
    //     // url.searchParams.set('band', parseFloat(band).toFixed(1))
    //     // router.push(`${pathname}?${url.searchParams}`)
    // }, [band])

    useEffect(() => {
        map.on('moveend', () => {
            let zoom = map.getZoom().toFixed(2)
            let center = [parseFloat(map.getCenter().lng.toFixed(2)), parseFloat(map.getCenter().lat.toFixed(2))]
            setZoom(zoom)
            setCenter(center)
        })
    }, [])

    useEffect(() => {
        if (center && zoom) {
            const url = new URL(window.location)
            url.searchParams.set('zoom', zoom)
            url.searchParams.set('center', center)
            router.push(`${pathname}?${url.searchParams}`)
        }

    }, [zoom, center])

    return null
}

export default Router