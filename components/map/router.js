import { useCallback, useEffect } from 'react'
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
    const variables = useStore((state) => state.variables)

    const setRiskThemes = useStore((state) => state.setRiskThemes)
    const riskOptions = useStore((state) => state.riskOptions)
    const setBand = useStore((state) => state.setBand)
    const zoom = useStore((state) => state.zoom)
    const setZoom = useStore((state) => state.setZoom)
    const center = useStore((state) => state.center)
    const setCenter = useStore((state) => state.setCenter)

    const verifySearchParams = useCallback((url) => {
        // check to see if there are other search params that shouldn't be there
        url.searchParams.forEach(function (value, key) {
            if (!['layer', 'zoom', 'center'].includes(key)) {
                url.searchParams.delete(key)
            }
        })
    })

    const getInitialLayer = useCallback((url) => {
        let initialLayer
        let tempLayer = url.searchParams.get("layer")

        if (tempLayer != null && typeof tempLayer == 'string' && variables.includes(tempLayer)) {
            initialLayer = tempLayer
        } else {
            initialLayer = 'drought'
        }

        url.searchParams.set('layer', initialLayer)
        return initialLayer
    })

    const getInitialZoom = useCallback((url) => {
        let initialZoom
        let tempZoom = url.searchParams.get("zoom")

        if (tempZoom != null && typeof parseFloat(tempZoom) == 'number' && parseFloat(tempZoom) > 0.0) {
            initialZoom = tempZoom
        } else {
            initialZoom = 1
        }

        url.searchParams.set('zoom', initialZoom)
        return initialZoom
    })

    const getInitialCenter = useCallback((url) => {
        let initialCenter

        // this makes sure that the center search param is in array format, so we don't need to check the type
        let tempCenter = url.searchParams.get("center")
        if(tempCenter == null) {
            url.searchParams.set('center', '-40,40')
            return [-40, 40]
        }

        tempCenter = tempCenter.split(',').map((d) => parseFloat(d))

        if (tempCenter.length == 2 && typeof tempCenter[0] == 'number' && !Number.isNaN(tempCenter[0]) && typeof tempCenter[1] == 'number' && !Number.isNaN(tempCenter[1])) {
            if(tempCenter[1] >= -90 && tempCenter[1] <= 90) {
                initialCenter = tempCenter.toString()
            } else {
                initialCenter = '-40,40'
            }
        } else {
            initialCenter = '-40,40'
        }

        url.searchParams.set('center', initialCenter)
        return initialCenter.split(',').map((d) => parseFloat(d))
    })

    useEffect(() => {
        const url = new URL(window.location)
        verifySearchParams(url)

        let savedLayer = getInitialLayer(url)
        let savedZoom = getInitialZoom(url)
        let savedCenter = getInitialCenter(url)

        setVariable(savedLayer)
        let riskBands = riskOptions[savedLayer].bands
        if (savedLayer == 'lethal_heat') {
            setBand(riskBands[riskBands.length - 1])
        } else {
            setBand(riskBands[0])
        }
        setZoom(savedZoom)
        setCenter(savedCenter)
        setRiskThemes({
            drought: savedLayer == 'drought',
            hot_days: savedLayer == 'hot_days',
            warm_nights: savedLayer == 'warm_nights',
            lethal_heat: savedLayer == 'lethal_heat',
            tc_rp: savedLayer == 'tc_rp',
            permafrost: savedLayer == 'permafrost',
            cf_irr: savedLayer == 'cf_irr',
            cf_rain: savedLayer == 'cf_rain',
            wdd: savedLayer == 'wdd',
            slr: savedLayer == 'slr',
            tavg: savedLayer == 'tavg',
            precip: savedLayer == 'precip',
            cdd: savedLayer == 'cdd',
            hdd: savedLayer == 'hdd',
        })

        if (map && savedZoom && savedCenter) {
            map.easeTo({
                center: savedCenter,
                zoom: parseFloat(savedZoom),
                duration: 0,
            })
        }

        router.replace(`${pathname}?layer=${url.searchParams.get('layer')}&zoom=${url.searchParams.get('zoom')}&center=${url.searchParams.get('center')}`)
        // prevent back button
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
        window.history.pushState(null, null, url);
        window.onpopstate = () => window.history.go(1)

    }, [window.onload]);

    useEffect(() => {
        const url = new URL(window.location)
        verifySearchParams(url)

        url.searchParams.set('layer', variable)
        router.replace(`${pathname}?layer=${url.searchParams.get('layer')}&zoom=${url.searchParams.get('zoom')}&center=${url.searchParams.get('center')}`)
    }, [variable])

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
            verifySearchParams(url)

            url.searchParams.set('zoom', zoom)
            url.searchParams.set('center', center)
            router.replace(`${pathname}?layer=${url.searchParams.get('layer')}&zoom=${url.searchParams.get('zoom')}&center=${url.searchParams.get('center')}`)
        }

    }, [zoom, center])

    return null
}

export default Router