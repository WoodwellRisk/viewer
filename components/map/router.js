import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import { useMapbox } from '@carbonplan/maps'

const Router = ({ variable, setVariable }) => {
    const router = useRouter()
    const [currentLayer, setCurrentLayer] = useState(null)
    // () => {
    //     return localStorage.getItem("variable") !== null ? localStorage.getItem("variable") : 'drought'
    // })
    // const [layerString, setLayerString] = useState(`?layer=${variable}/`)
    // const searchParams = useSearchParams()
    // console.log("Search params: ", searchParams)

    let lookup = {
        'drought': 'Drought',
        'hot_days': 'Hot Days',
        'lethal_heat_3d': 'Lethal Heat',
        'precip': 'Precipitation',
        'slr_3d': 'Sea Level Rise',
        'tavg': 'Temperature',
        'tc_rp': 'Tropical Cyclones',
        'warm_nights': 'Warm Nights',
        'wdd': 'Wildfires',
    }

    useEffect(() => {
        setCurrentLayer(variable)
        localStorage.setItem("variable", variable)
      }, [variable])

    useEffect(() => {
        console.log("page refresh!")
        console.log(localStorage.getItem("variable"))
        // setVariable(localStorage.getItem("variable"))
        // console.log(Object.keys(localStorage));
        // console.log(Object.entries(localStorage));
        // this is almost working, but I think that I will need to call
        // the methods in sidebar/layers for this to work properly: handleRiskChange, handleBandChange
        // maybe these layers can be abstracted / exported out so that they can be used in multiple files?
    }, [window.onload]);

    useEffect(() => {
        const { pathname } = router
        let suffix = `?layer=${currentLayer}/`
        router.replace(pathname + suffix, null, { shallow: true })
        // window.history.replaceState(pathname + suffix, '')
    }, [currentLayer])

    return null
}

export default Router