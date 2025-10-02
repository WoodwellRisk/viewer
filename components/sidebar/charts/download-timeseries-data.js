import { Tag } from '@carbonplan/components'
import { saveAs } from "file-saver";

import useStore from '../../store/index'

const DownloadTimeseriesData = ({ data, fileType }) => {
    const risk = useStore((state) => state.risk);
    const crop = useStore((state) => state.crop);
    const riskTitle = useStore((state) => state.riskTitle)().toLowerCase();
    const bandLabel = useStore((state) => state.bandLabel)().toLowerCase()
    const chartLabel = useStore((state) => state.chartLabel)().toLowerCase()
    const regionData = useStore((state) => state.regionData);
    const region = regionData['coordinates'];
    const now = new Date().toGMTString()

    // const formattedData = data.map((d) => { 
    //     let temp = {}
    //     temp[`${bandLabel}`] = d[0];
    //     temp[`${chartLabel}`] = d[1];
    //     return temp;
    // })
    // console.log(formattedData)

    const handleDownloadClick = () => {
        let minLat = Math.min(...region["lat"]);
        let maxLat = Math.max(...region["lat"]);
        let minLon = Math.min(...region["lon"]);
        let maxLon = Math.max(...region["lon"]);

        if(fileType == 'JSON') {
            let json = {
                "attribution": `Woodwell Risk (${new Date().getFullYear()}). Data viewer [data download]. https://woodwellrisk.github.io/viewer/`,
                'accessed': now,
                'variable': `${riskTitle}`,
                'crop': `${crop}`,
                'extent': {
                    'lat': [minLat, maxLat],
                    'lon': [minLon, maxLon]
                },
                'xlabel': `${bandLabel}`,
                'ylabel': `${chartLabel}`,
                'data': data,
            };

            if(!risk.startsWith('cf')) {
                delete json['crop'];
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
            jsonString = jsonString.replaceAll("\"variable\"", "  \"variable\"")
            if(risk.startsWith('cf')) { jsonString = jsonString.replaceAll("\"crop\"", "  \"crop\"") }
            jsonString = jsonString.replaceAll("\"extent\"", "  \"extent\"")
            jsonString = jsonString.replaceAll(", \"lon\"", "\n    \"lon\"")
            jsonString = jsonString.replaceAll("\"lat\"", "    \"lat\"")
            jsonString = jsonString.replaceAll("\"xlabel\"", "  \"xlabel\"")
            jsonString = jsonString.replaceAll("\"ylabel\"", "  \"ylabel\"")
            jsonString = jsonString.replaceAll("\"data\"", "  \"data\"")
            jsonString = jsonString.replaceAll(",", ", ")
            jsonString = jsonString.replaceAll(", \n", ",\n")
            // console.log(jsonString)
            
            // https://developer.mozilla.org/en-US/docs/Web/API/Blob
            let blob = new Blob([jsonString], {
                type: "application/json",
            })
            // https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
            saveAs(blob, `${risk}${risk.startsWith('cf') ? '-' + crop : ''}-timeseries.json`.replaceAll('_', '-'))

        } else if(fileType == 'CSV') {
            let csv = `# Attribution: Woodwell Risk (${new Date().getFullYear()}). Drought Monitor [data download]. https://woodwellrisk.github.io/drought-monitor/\n`;
            csv += `# Accessed: ${now}\n`;
            csv += `# Variable: ${riskTitle}\n`
            if(risk.startsWith('cf')) { csv += `# Crop: ${crop}\n` }
            csv += `# Latitude min: ${minLat}\n`;
            csv += `# Latitude max: ${maxLat}\n`;
            csv += `# Longitude min: ${minLon}\n`;
            csv += `# Longitude max: ${maxLon}\n`;
            csv += `${bandLabel}, ${chartLabel}\n`;
            data.forEach((array) => {
            csv += `${array[0]}, ${array[1]}\n`;
            });
            // console.log(csv);
    
            let blob = new Blob([csv], {
            type: "text/csv;charset=utf-8",
            });
    
            saveAs(blob, `${risk}${risk.startsWith('cf') ? '-' + crop : ''}-timeseries.csv`.replaceAll('_', '-'))
        } else {
            console.log('Unsupported file type. Please choose JSON or CSV.')
        }
    }

    return (
        <>
            <Tag onClick={handleDownloadClick}>{fileType}</Tag>
        </>
    )
}

export default DownloadTimeseriesData;