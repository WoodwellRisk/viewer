import { IconButton } from 'theme-ui'
import { ArrowThin } from '@carbonplan/icons'
import { saveAs } from 'file-saver'

const DownloadButton =  ({ time, data, region }) => {

    const handleDownloadClick = (fileType) => {
        // https://stackoverflow.com/questions/32647149/why-is-math-max-returning-nan-on-an-array-of-integers
        let minLat = Math.min(...region['lat'])
        let maxLat = Math.max(...region['lat'])
        let minLon = Math.min(...region['lon'])
        let maxLon = Math.max(...region['lon'])

        if(fileType == 'JSON') {
            let json = {
                "attribution": `Woodwell Risk (${new Date().getFullYear()}). Drought Monitor [data download]. https://woodwellrisk.github.io/drought-monitor/`,
                'accessed': new Date().toGMTString(),
                'time': time,
                'extent': {
                    'lat': [minLat, maxLat],
                    'lon': [minLon, maxLon]
                },
                'data': data
            }
    
            let jsonString = JSON.stringify(json, NaN, '')
            jsonString = jsonString.replaceAll("\",", "\",\n")
            jsonString = jsonString.replaceAll("{", "{\n")
            jsonString = jsonString.replaceAll("},", "},\n")   
            jsonString = jsonString.replaceAll("]}", "]\n}")
            jsonString = jsonString.replaceAll("]]}", "]]\n}")
            jsonString = jsonString.replaceAll(":[", ": [")
            jsonString = jsonString.replaceAll(":{", ": {")
            jsonString = jsonString.replaceAll(":\"", ": \"")
            jsonString = jsonString.replaceAll("[[", "[\n    [")
            jsonString = jsonString.replaceAll("]]", "]\n  ]")
            jsonString = jsonString.replaceAll("],", "],\n    ")
            jsonString = jsonString.replaceAll("},", "  },")
    
            jsonString = jsonString.replaceAll("\"attribution\"", "  \"attribution\"")
            jsonString = jsonString.replaceAll("\"accessed\"", "  \"accessed\"")
            jsonString = jsonString.replaceAll("\"time\"", "  \"time\"")
            jsonString = jsonString.replaceAll("\"extent\"", "  \"extent\"")
            jsonString = jsonString.replaceAll(", \"lon\"", "\n    \"lon\"")
            jsonString = jsonString.replaceAll("\"lat\"", "    \"lat\"")
            jsonString = jsonString.replaceAll("\"data\"", "  \"data\"")
            jsonString = jsonString.replaceAll(",", ", ")
            jsonString = jsonString.replaceAll(", \n", ",\n")
            console.log(jsonString)
            
            // https://developer.mozilla.org/en-US/docs/Web/API/Blob
            let blob = new Blob([jsonString], {
                type: "application/json",
            })
            // https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
            // saveAs(blob, `bar-chart-${time}.json`)

        } else if(fileType == 'CSV') {
            let csv = `# Attribution: Woodwell Risk (${new Date().getFullYear()}). Drought Monitor [data download]. https://woodwellrisk.github.io/drought-monitor/\n`
            csv += `# Accessed: ${new Date().toGMTString()}\n`
            csv += `# Time: ${time}\n`
            csv += `# Latitude min: ${minLat}\n`
            csv += `# Latitude max: ${maxLat}\n`
            csv += `# Longitude min: ${minLon}\n`
            csv += `# Longitude max: ${maxLon}\n`
            csv += 'water imbalance percentile, percent of data\n'
            data.forEach(array => {
                csv += `${array[0]}, ${array[1]}\n`
            })
            console.log(csv)

            let blob = new Blob([csv], {
                type: "text/csv;charset=utf-8",
            })
            // saveAs(blob, `bar-chart-${time}.csv`)

        } else {
            console.log("Unsupported file type. Please choose JSON or CSV.")
        }
    }

    return(
        <>
            <IconButton 
                aria-label='Download data button' 
                sx={{ 
                    stroke: 'primary', 
                    cursor: 'pointer', 
                    width: 30, 
                    height: 30,
                    border: '1px solid',
                    borderColor: 'primary',
                    borderRadius: '5px',
                    transition: 'color 0.15s',
                    '@media (hover: hover) and (pointer: fine)': {
                        '&:hover': { 
                            color: 'secondary',
                            borderColor: 'secondary',
                            borderWidth: '2px',
                        },
                    },
                }}
                onClick={() => handleDownloadClick('CSV')}
                >
                    <ArrowThin sx={{ 
                        transform: 'rotate(90deg)',
                        strokeWidth: 1.5, 
                        width: 22, 
                        height: 22,
                        }} 
                    />
            </IconButton>
        </>
    )
}

export default DownloadButton