import { Tag } from '@carbonplan/components'
import { saveAs } from "file-saver";

import useStore from '../../store/index'

const DownloadBarData = ({ data, fileType }) => {
    const variable = useStore((state) => state.variable);
    const band = useStore((state) => state.band);
    const crop = useStore((state) => state.crop);
    const riskTitle = useStore((state) => state.riskTitle)().toLowerCase();
    const chartLabel = useStore((state) => state.chartLabel)()
    const regionData = useStore((state) => state.regionData);
    const region = regionData['coordinates'];
    const now = new Date().toGMTString()

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
                'band': `${band}`,
                'extent': {
                    'lat': [minLat, maxLat],
                    'lon': [minLon, maxLon]
                },
                'xlabel': `bin`,
                'ylabel': `percent`,
                'data': data
            };

            if(!variable.startsWith('cf')) {
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
            if(variable.startsWith('cf')) { jsonString = jsonString.replaceAll("\"crop\"", "  \"crop\"") }
            jsonString = jsonString.replaceAll("\"band\"", "  \"band\"")
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
            saveAs(blob, `${variable}${variable.startsWith('cf') ? '-' + crop : ''}-bar-${band}.json`.replaceAll('_', '-'))

        } else if(fileType == 'CSV') {
            let csv = `# Attribution: Woodwell Risk (${new Date().getFullYear()}). Drought Monitor [data download]. https://woodwellrisk.github.io/drought-monitor/\n`;
            csv += `# Accessed: ${now}\n`;
            csv += `# Variable: ${riskTitle}\n`
            if(variable.startsWith('cf')) { csv += `# Crop: ${crop}\n` }
            csv += `# Band: ${band}\n`
            csv += `# Latitude min: ${minLat}\n`;
            csv += `# Latitude max: ${maxLat}\n`;
            csv += `# Longitude min: ${minLon}\n`;
            csv += `# Longitude max: ${maxLon}\n`;
            csv += `# Unit: ${chartLabel}\n`
            csv += `bin, percent\n`
            data.forEach((array) => {
            csv += `${array[0]}, ${array[1]}\n`;
            });
            console.log(csv);
    
            let blob = new Blob([csv], {
            type: "text/csv;charset=utf-8",
            });
    
            // saveAs(blob, `${variable}${variable.startsWith('cf') ? '-' + crop : ''}-bar-${band}.csv`.replaceAll('_', '-'))
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

export default DownloadBarData;