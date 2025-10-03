import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { useMapbox } from '@carbonplan/maps'

import useStore from '../store/index'

const Router = () => {
    const { map } = useMapbox()
    const router = useRouter()
    const pathname = usePathname()

    const categories = useStore((state) => state.categories)()
    const category = useStore((state) => state.category)
    const setCategory = useStore((state) => state.setCategory)
    const setCategoryNavigation = useStore((state) => state.setCategoryNavigation)
    const associatedRisks = useStore((state) => state.associatedRisks)
    const risk = useStore((state) => state.risk)
    const setRisk = useStore((state) => state.setRisk)
    const setRiskBands = useStore((state) => state.setRiskBands)
    const setBand = useStore((state) => state.setBand)
    const setBandIndex = useStore((state) => state.setBandIndex)
    const riskOptions = useStore((state) => state.riskOptions)
    const setRiskNavigation = useStore((state) => state.setRiskNavigation)
    const zoom = useStore((state) => state.zoom)
    const setZoom = useStore((state) => state.setZoom)
    const center = useStore((state) => state.center)
    const setCenter = useStore((state) => state.setCenter)


    const verifySearchParams = useCallback((url) => {
        // check to see if there are other search params that shouldn't be there
        url.searchParams.forEach(function (value, key) {
            if (!['category', 'layer', 'zoom', 'center'].includes(key)) {
                url.searchParams.delete(key)
            }
        })
    })

    const getInitialCategoryAndLayer = useCallback((url) => {
        let initialCategory, initialLayer;
        let tempCategory = url.searchParams.get('category')
        let tempLayer = url.searchParams.get('layer')

        if (tempCategory != null && typeof tempCategory == 'string' && categories.includes(tempCategory.replace('-', ' '))) {
            initialCategory = tempCategory.replace('-', ' ')

            // if the category is valid, we still need to validate that the layer is associated with that category 
            if(tempLayer != null && typeof tempLayer == 'string' && associatedRisks[initialCategory].includes(tempLayer)) {
                initialLayer = tempLayer
            } else {
                // if the category exists, but the pairing [category, layer] does not, then default to the first layer in that category
                initialLayer = associatedRisks[initialCategory][0]
            }
        } else {
            // if neither the category is not valid, then default to first category and layer for landing page
            initialCategory = 'water stress'
            initialLayer = 'drought'
        }

        url.searchParams.set('category', initialCategory.replace(' ', '-'))
        url.searchParams.set('layer', initialLayer)

        return [initialCategory, initialLayer];
    })

    const getInitialZoom = useCallback((url) => {
        let initialZoom
        let tempZoom = url.searchParams.get('zoom')

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
        let tempCenter = url.searchParams.get('center')
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

        let [savedCategory, savedLayer] = getInitialCategoryAndLayer(url)
        let savedZoom = getInitialZoom(url)
        let savedCenter = getInitialCenter(url)

        let categoryNavigation = {}
        categories.forEach(c => {
            categoryNavigation[c] = c == savedCategory;
        })
        setCategoryNavigation(categoryNavigation)
        setCategory(savedCategory)
       
        let riskNavigation = {}
        associatedRisks[savedCategory].forEach((r) => {
            riskNavigation[r] = r == savedLayer;
        })
        setRiskNavigation(riskNavigation)

        let bands = riskOptions[savedLayer].bands
        let bandIndex
        if (savedLayer == 'lethal_heat') {
          bandIndex = riskOptions[savedLayer].bands.length - 1
        } else {
          bandIndex = 0
        }
        setRiskBands(bands)
        setBandIndex(bandIndex)
        setBand(riskOptions[savedLayer].bands[bandIndex])
        setRisk(savedLayer)

        setZoom(savedZoom)
        setCenter(savedCenter)

        if (map && savedZoom && savedCenter) {
            map.easeTo({
                center: savedCenter,
                zoom: parseFloat(savedZoom),
                duration: 0,
            })
        }

        router.replace(`${pathname}?category=${url.searchParams.get('category')}&layer=${url.searchParams.get('layer')}&zoom=${url.searchParams.get('zoom')}&center=${url.searchParams.get('center')}`)
        // prevent back button
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
        window.history.pushState(null, null, url);
        window.onpopstate = () => window.history.go(1)

    }, [window.onload]);

    useEffect(() => {
        map.on('moveend', () => {
            let zoom = map.getZoom().toFixed(2)
            let center = [parseFloat(map.getCenter().lng.toFixed(2)), parseFloat(map.getCenter().lat.toFixed(2))]
            setZoom(zoom)
            setCenter(center)
        })
    }, [])

    useEffect(() => {
        const url = new URL(window.location)
        verifySearchParams(url)

        url.searchParams.set('category', category.replace(' ', '-'))
        url.searchParams.set('layer', risk)
        url.searchParams.set('zoom', zoom)
        url.searchParams.set('center', center)

        router.replace(`${pathname}?category=${url.searchParams.get('category')}&layer=${url.searchParams.get('layer')}&zoom=${url.searchParams.get('zoom')}&center=${url.searchParams.get('center')}`)
    }, [category, risk, zoom, center])

    return null
}

export default Router