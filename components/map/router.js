import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
// import { useMapbox } from '@carbonplan/maps'

const Router = ({ variable, setVariable }) => {
    const router = useRouter()
    const [layerInitialized, setLayerInitialized] = useState(false)    
    const [layer, setLayer] = useState(null)
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
        setLayer(variable)
        localStorage.setItem("variable", variable)
      }, [variable])

    useEffect(() => {
        console.log("page refresh!")
        console.log(localStorage.getItem("variable"))
        setVariable(localStorage.getItem("variable"))
        // this is almost working, but I think that I will need to call
        // the methods in sidebar/layers for this to work properly: handleRiskChange, handleBandChange
        // maybe these layers can be abstracted / exported out so that they can be used in multiple files?
    }, [window.onload]);

    useEffect(() => {
        const { pathname } = router
        let suffix = `?layer=${layer}/`
        router.replace(pathname + suffix, null, { shallow: true })
        // window.history.replaceState(pathname + suffix, '')
    }, [layer])

    return null
}

export default Router