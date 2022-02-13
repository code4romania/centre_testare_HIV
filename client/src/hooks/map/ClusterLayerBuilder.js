import { HereMapDomIcons } from '../../utils';

const { H } = window;

export default {
  buildClusterLayer: (data, onClusterClick, onNoiseClick) => {
    const dataPoints = data.map((item) => {
      return new H.clustering.DataPoint(item.lat, item.lng, 1, item);
    });
    const clusteredDataProvider = new H.clustering.Provider(dataPoints, {
      clusteringOptions: {
        eps: 32,
        minWeight: 3,
      },
    });
    const defaultTheme = clusteredDataProvider.getTheme();
    const customTheme = {
      getClusterPresentation: (cluster) => {
        const clusterMarker = defaultTheme.getClusterPresentation.call(defaultTheme, cluster);
        return clusterMarker;
      },
      getNoisePresentation: (noisePoint) => {
        const { centerDomIcon } = HereMapDomIcons;
        const noiseMarker = new H.map.DomMarker(noisePoint.getPosition(), {
          icon: centerDomIcon,
          min: noisePoint.getMinZoom(),
        });
        noiseMarker.setData(noisePoint);
        return noiseMarker;
      },
    };
    clusteredDataProvider.setTheme(customTheme);
    clusteredDataProvider.addEventListener('tap', (event) => {
      if (event.target.getData().getData) {
        onNoiseClick(event.target);
      } else {
        onClusterClick(event.target);
      }
    });
    return new H.map.layer.ObjectLayer(clusteredDataProvider);
  },
  unhighlightMarker: (marker) => {
    marker.setIcon(HereMapDomIcons.centerDomIcon);
  },
  highlightMarker: (marker) => {
    marker.setIcon(HereMapDomIcons.selectedCenterDomIcon);
  },
};
