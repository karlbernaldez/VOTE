import circle from '@turf/circle';
import length from '@turf/length';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

function circleFromTwoVertexLineString(geojson) {
  const center = geojson.geometry.coordinates[0];
  const radiusInKm = length(geojson);

  return circle(center, radiusInKm); // Create circle from two vertex line
}

const CircleMode = {
  ...MapboxDraw.modes.draw_line_string, // Inherit the draw_line_string mode

  clickAnywhere: function (state, e) {
    if (state.currentVertexPosition === 1) {
      state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
      return this.changeMode('simple_select', { featureIds: [state.line.id] });
    }

    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
    if (state.direction === 'forward') {
      state.currentVertexPosition += 1;
      state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
    } else {
      state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat);
    }

    return null;
  },

  onStop: function (state) {
    this.activateUIButton();

    if (this.getFeature(state.line.id) === undefined) return;

    state.line.removeCoordinate('0');
    if (state.line.isValid()) {
      const lineGeoJson = state.line.toGeoJSON();
      const circleFeature = circleFromTwoVertexLineString(lineGeoJson);

      this.map.fire('draw.create', {
        features: [circleFeature]
      });
    } else {
      this.deleteFeature([state.line.id], { silent: true });
      this.changeMode('simple_select', {}, { silent: true });
    }
  },

  toDisplayFeatures: function (state, geojson, display) {
    if (geojson.geometry.coordinates.length < 2) return null;

    display({
      type: 'Feature',
      properties: { active: 'true' },
      geometry: { type: 'Point', coordinates: geojson.geometry.coordinates[0] }
    });

    geojson.properties.active = 'true';
    display(geojson);

    const displayMeasurements = getDisplayMeasurements(geojson);

    const currentVertex = {
      type: 'Feature',
      properties: {
        meta: 'currentPosition',
        radius: `${displayMeasurements.metric} ${displayMeasurements.standard}`,
        parent: state.line.id
      },
      geometry: { type: 'Point', coordinates: geojson.geometry.coordinates[1] }
    };

    display(currentVertex);

    const circleFeature = circleFromTwoVertexLineString(geojson);
    circleFeature.properties = { active: 'true' };

    display(circleFeature);

    return null;
  }
};

export default CircleMode;
