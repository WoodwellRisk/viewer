import { useEffect, useRef } from "react";
import { useMapbox } from "@carbonplan/maps";
import mapboxgl from "mapbox-gl";

import useStore from "../store/index";

const updatePaintProperty = (map, id, key, value) => {
  if (map.getLayer(id)) {
    map.setPaintProperty(id, key, value);
  }
};

// https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
// https://docs.mapbox.com/help/tutorials/create-interactive-hover-effects-with-mapbox-gl-js/
// https://www.woodwellclimate.org/project/just-access/completed-assessments/
const JustAccess = ({ theme }) => {
  const { map } = useMapbox();
  const zoom = useStore((state) => state.zoom);
  const removed = useRef(false);

  let hoverPolygonId = null;
  let hoverPointId = null;

  useEffect(() => {
    map.on("remove", () => {
      removed.current = true;
    });
  }, []);

  const addJustAccessLayers = async () => {
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
    });

    fetch("https://storage.googleapis.com/risk-maps/vector/ja_polygons.geojson")
      .then((response) => response.json())
      .then((polygonData) => {
        try {
          if (!map.getSource("just-access-polygons-source")) {
            map.addSource("just-access-polygons-source", {
              type: "geojson",
              data: polygonData,
              generateId: true,
            });
          }

          map.addLayer({
            id: "just-access-fill",
            type: "fill",
            source: "just-access-polygons-source",
            paint: {
              "fill-color": theme.rawColors.primary,
              //   'fill-opacity': 0.3,
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                0.5,
                0.3,
              ],
            },
            slot: "bottom",
          });

          map.addLayer({
            id: "just-access-line",
            type: "line",
            source: "just-access-polygons-source",
            paint: {
              "line-color": theme.rawColors.primary,
              "line-width": 1.5,
            },
            slot: "bottom",
          });

          // https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
          map.on("mouseenter", "just-access-fill", (e) => {
            // change curser style
            map.getCanvas().style.cursor = "pointer";

            if (e.features.length > 0) {
              // hover effect
              if (hoverPolygonId !== null) {
                map.setFeatureState(
                  { source: "just-access-polygons-source", id: hoverPolygonId },
                  { hover: false }
                );
              }

              let polygonFeatures = map
                .queryRenderedFeatures(e.point)
                .filter((feature) => feature.geometry["type"] != "Point");
              hoverPolygonId = polygonFeatures[0].id;
              map.setFeatureState(
                { source: "just-access-polygons-source", id: hoverPolygonId },
                { hover: true }
              );
            }
          });

          map.on("mouseleave", "just-access-fill", () => {
            // change cursor style
            map.getCanvas().style.cursor = "";

            // remove hover effect
            if (hoverPolygonId !== null) {
              map.setFeatureState(
                { source: "just-access-polygons-source", id: hoverPolygonId },
                { hover: false }
              );
            }
            hoverPolygonId = null;
          });

          map.on("click", "just-access-fill", (e) => {
            // popup
            // https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
            // https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
            // https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
            let features = map.queryRenderedFeatures(e.point)
            let pointFeatures = features.filter((feature) => feature.geometry["type"] == "Point")
            let polygonFeatures = features.filter((feature) => feature.geometry["type"] != "Point")
            // there is at least one instance of when a point feature overlays a polygon feature
            // in this case, we want to be able to see the polygon feature's properties on click unless we click on the point
            if(pointFeatures.length == 0 && polygonFeatures.length > 0) {
              let name = polygonFeatures[0].properties.name;
              let url = polygonFeatures[0].properties.url;
              
              let htmlString = `<p>${name}</p>`
              if(url != 'none') {
                  if(name == 'Chiapas, Mexico') {
                      htmlString += `<a href='${url}' target='_blank'>Read the full assessment (Spanish)</a>`
                  } else {
                      htmlString += `<a href='${url}' target='_blank'>Read the full assessment</a>`
                  }
                  // htmlString += `<iframe src='${url}'></iframe>`
              }
  
              popup
                .setLngLat(e.lngLat)
                .setHTML(htmlString)
                .setMaxWidth(500)
                .addTo(map);
            }
          });
        } catch (error) {
          console.error(error);
        }
      });

    fetch("https://storage.googleapis.com/risk-maps/vector/ja_points.geojson")
      .then((response) => response.json())
      .then((pointsData) => {
        try {
          if (!map.getSource("just-access-points-source")) {
            map.addSource("just-access-points-source", {
              type: "geojson",
              data: pointsData,
              generateId: true,
            });
          }

          map.addLayer({
            id: "just-access-points",
            type: "circle",
            source: "just-access-points-source",
            paint: {
              "circle-color": theme.rawColors.primary,
              "circle-stroke-color": theme.rawColors.primary,
              // 'circle-opacity': 0.3,
              "circle-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                0.5,
                0.3,
              ],
              "circle-radius": zoom < 3 ? 2 : zoom < 4 ? 3 : zoom < 6 ? 5 : 7,
              "circle-stroke-width": 1.5,
            },
            slot: "top",
          });

          map.on("mouseenter", "just-access-points", (e) => {
            // change curser style
            map.getCanvas().style.cursor = "pointer";

            if (e.features.length > 0) {
              // hover effect
              if (hoverPointId !== null) {
                map.setFeatureState(
                  { source: "just-access-points-source", id: hoverPointId },
                  { hover: false }
                );
              }

              let pointFeatures = map.queryRenderedFeatures(e.point).filter((feature) => feature.geometry["type"] == "Point");
              hoverPointId = pointFeatures[0].id;
              map.setFeatureState(
                { source: "just-access-points-source", id: hoverPointId },
                { hover: true }
              );
            }
          });

          map.on("mouseleave", "just-access-points", () => {
            // change cursor style
            map.getCanvas().style.cursor = "";

            // remove hover effect
            if (hoverPointId !== null) {
              map.setFeatureState(
                { source: "just-access-points-source", id: hoverPointId },
                { hover: false }
              );
            }
            hoverPointId = null;
          });

          map.on("click", "just-access-points", (e) => {
            // popup
            let pointFeatures = map
              .queryRenderedFeatures(e.point)
              .filter((feature) => feature.geometry["type"] == "Point");
            let name = pointFeatures[0].properties.name;
            let url = pointFeatures[0].properties.url;
            console.log(pointFeatures[0])
            console.log(url)

            let htmlString = `<p>${name}</p>`
            if(url != 'none') {
                htmlString += `<a href='${url}' target='_blank'>Read the full assessment</a>`
                // htmlString += `<iframe src='${url}'></iframe>`
            }

            popup
              .setLngLat(e.lngLat)
              .setHTML(htmlString)
              .setMaxWidth(500)
              .addTo(map);
          });
        } catch (error) {
          console.error(error);
        }
      });
  };

  useEffect(() => {
    if (zoom < 4) {
      updatePaintProperty(map, "just-access-points", "circle-radius", 3);
    } else if (zoom < 6) {
      updatePaintProperty(map, "just-access-points", "circle-radius", 5);
    } else {
      updatePaintProperty(map, "just-access-points", "circle-radius", 7);
    }
  }, [zoom]);

  useEffect(() => {
    updatePaintProperty(map, "just-access-fill", "fill-color", theme.rawColors.primary);
    updatePaintProperty(map, "just-access-line", "line-color", theme.rawColors.primary);
    updatePaintProperty(
      map,
      "just-access-points",
      "circle-stroke-color",
      theme.rawColors.primary
    );
  }, [theme]);

  useEffect(() => {
    addJustAccessLayers();

    return () => {
      if (!removed.current) {
        map.removeLayer("just-access-fill");
        map.removeLayer("just-access-line");
        map.removeLayer("just-access-points");
      }
    };
  }, []);

  return null;
};

export default JustAccess;