import { Tag } from '@carbonplan/components'
import { saveAs } from "file-saver";

import useStore from '../../store/index'

const DownloadBarData = ({ data, fileType }) => {
    const risk = useStore((state) => state.risk);
    const band = useStore((state) => state.band);
    const riskBands = useStore((state) => state.riskBands)
    const crop = useStore((state) => state.crop);
    const riskTitle = useStore((state) => state.riskTitle)().toLowerCase();
    const bandLabel = useStore((state) => state.bandLabel)().toLowerCase()
    const chartLabel = useStore((state) => state.chartLabel)()
    const regionData = useStore((state) => state.regionData);
    const region = regionData['coordinates'];
    const now = new Date().toGMTString()

    const handleDownloadClick = () => {
        let minLat = Math.min(...region["lat"]);
        let maxLat = Math.max(...region["lat"]);
        let minLon = Math.min(...region["lon"]);
        let maxLon = Math.max(...region["lon"]);

        let bands = Object.keys(data).sort()

        if(fileType == 'JSON') {
            let dataString = ''
            bands.forEach((band, index) => {
                // console.log(index)
                if(index != bands.length - 1) {
                    dataString += `    "${band}": ${JSON.stringify(data[band], NaN, null).replaceAll(",", ", ").replaceAll(",]", ", ]")},\n`
                } else {
                    // can't have trailing comma on last entry
                    dataString += `    "${band}": ${JSON.stringify(data[band], NaN, null).replaceAll(",", ", ").replaceAll(",]", ", ]")}\n`
                }
            })

            let json = {
                "attribution": `Woodwell Risk (${new Date().getFullYear()}). Data viewer [data download]. https://woodwellrisk.github.io/viewer/`,
                'accessed': now,
                'variable': `${riskTitle}`,
                'crop': `${crop}`,
                'bands': riskBands,
                'units': `${chartLabel}`,
                'extent': {
                    'lat': [minLat, maxLat],
                    'lon': [minLon, maxLon]
                },
                'xlabel': `bins`,
                'ylabel': `percent`,
                'data': '',
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
            jsonString = jsonString.replaceAll("\"bands\"", "  \"bands\"")
            if(bandLabel == 'time period' || risk == 'slr') {
                jsonString = jsonString.replaceAll("\"bands\"", "\"time periods\"")
            } else {
                jsonString = jsonString.replaceAll("\"bands\"", "\"warming levels\"")
            }
            jsonString = jsonString.replaceAll("  \"units\"", "\"units\"")
            jsonString = jsonString.replaceAll("\"extent\"", "  \"extent\"")
            jsonString = jsonString.replaceAll(", \"lon\"", "\n    \"lon\"")
            jsonString = jsonString.replaceAll("\"lat\"", "    \"lat\"")
            jsonString = jsonString.replaceAll("\"xlabel\"", "  \"xlabel\"")
            jsonString = jsonString.replaceAll("\"ylabel\"", "  \"ylabel\"")
            jsonString = jsonString.replaceAll("\"data\"", "  \"data\"")
            jsonString = jsonString.replaceAll(",", ", ")
            jsonString = jsonString.replaceAll(", \n", ",\n")
            jsonString = jsonString.replaceAll('\"data": \"\"', `\"data": {\n${dataString}}`)
            jsonString = jsonString.replaceAll("}}", "  }\n}")
            jsonString = jsonString.replaceAll("\"\"}", "\"\"\n}")
            // console.log(jsonString)

            // https://developer.mozilla.org/en-US/docs/Web/API/Blob
            let blob = new Blob([jsonString], {
                type: "application/json",
            })
            // https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
            saveAs(blob, `${risk}-bar.json`.replaceAll('_', '-'))

        } else if(fileType == 'CSV') {
            let csvMetadata = {
                '@context': ["http://www.w3.org/ns/csvw", {"@language": "en"}],
                'attribution': `Woodwell Risk (${new Date().getFullYear()}). Drought Monitor [data download]. https://woodwellrisk.github.io/drought-monitor/`,
                'accessed': `${now}`,
                'variable': `${riskTitle}`,
                'bands': riskBands,
                'crop': `${crop}`,
                'units': `${chartLabel}`,
                'xlabel': `bins`,
                'ylabel': `percent`,
                'extent': {
                    'lat': [minLat, maxLat],
                    'lon': [minLon, maxLon]
                },
            }

            if(!risk.startsWith('cf')) {
                delete csvMetadata['crop'];
            }

            csvMetadata = JSON.stringify(csvMetadata, NaN, 2)

            if(bandLabel == 'time period' || risk == 'slr') {
                csvMetadata = csvMetadata.replaceAll("\"bands\"", "\"time periods\"")
            } else {
                csvMetadata = csvMetadata.replaceAll("\"bands\"", "\"warming levels\"")
            }
            
            {/* 
                Below is the old CSV header metadata code. I liked it better when the metadata and data 
                were all in one file, but because the header length changes, it might be unwieldy for people
                analyzing the data. Still, I may go back to this version, so I am keeping this here.

                let csv = `# Attribution: Woodwell Risk (${new Date().getFullYear()}). Drought Monitor [data download]. https://woodwellrisk.github.io/drought-monitor/\n`;
                csv += `# Accessed: ${now}\n`;
                csv += `# Variable: ${riskTitle}\n`
                if(variable.startsWith('cf')) { csv += `# Crop: ${crop}\n` }
                if(risk == 'lethal_heat' || risk == 'slr') {
                    csv += `# Description: ${bandLabel}\n`
                } else {
                    csv += `# ${bandLabel.slice(0, 1).toUpperCase() + bandLabel.slice(1,)}: ${band}\n`
                }
                csv += `# Units: ${chartLabel}\n`
                csv += `# Latitude min: ${minLat}\n`;
                csv += `# Latitude max: ${maxLat}\n`;
                csv += `# Longitude min: ${minLon}\n`;
                csv += `# Longitude max: ${maxLon}\n`;
            */}

            let csv = ''
            csv += `${(bandLabel == 'time period' || risk == 'slr') ? 'year' : 'warming level'}, bins, percent\n`
            bands.forEach(band => {
                data[band].forEach((array) => {
                    csv += `${band}, ${array[0]}, ${array[1]}\n`;
                });
            })
    
            let blob = new Blob([csv], {
                type: "text/csv;charset=utf-8",
            });
            saveAs(blob, `${risk}-bar.csv`.replaceAll('_', '-'))

            let metadataBlob = new Blob([csvMetadata], {
                type: "application/csvm+json",
            });
            saveAs(metadataBlob, `${risk}-bar-metadata.json`.replaceAll('_', '-'))

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