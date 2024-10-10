import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMapbox } from '@carbonplan/maps'

import useStore from '../store/index'

const Router = () => {
    const { map } = useMapbox()
    const router = useRouter()
    const setZoom = useStore((state) => state.setZoom)
    const setCenter = useStore((state) => state.setCenter)
    const zoomToBox = useStore((state) => state.zoomToBox)
    const setZoomToBox = useStore((state) => state.setZoomToBox)
    const zoomInitialized = useStore((state) => state.zoomInitialized)
    const setZoomInitialized = useStore((state) => state.setZoomInitialized)

    {/* 
    * The following three methods are modified from their original source:
    * https://github.com/carbonplan/forest-offsets-web/blob/ee51781bcbeb35172e29e051dc6387a1ec5b34cb/components/viewer.js#L129
    */}
    useEffect(() => {
        const { center, zoom } = router.query

        if (map && center && zoom && !zoomInitialized) {
            setZoomToBox({
                center: center.split(',').map((d) => parseFloat(d)),
                zoom: parseFloat(zoom),
            })
        }
    }, [map, router])

    useEffect(() => {
        if (map && zoomToBox) {
            const { center, zoom } = zoomToBox
            map.easeTo({
                center: center,
                zoom: zoom,
                duration: 0,
            })
            setZoomInitialized(true)
            setZoomToBox(null)
        }
    }, [zoomToBox])

    useEffect(() => {
        map.on('moveend', () => {
            const { pathname } = router

            let zoom = map.getZoom().toFixed(2)
            let center = [parseFloat(map.getCenter().lng.toFixed(2)), parseFloat(map.getCenter().lat.toFixed(2))]
            setZoom(zoom)
            setCenter(center)

            let suffix = `?center=${center[0]},${center[1]}&zoom=${zoom}`
            router.replace(pathname + suffix, null, { shallow: true })
        })
    }, [map])

    return null
}

export default Router