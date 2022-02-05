import React, { useState } from 'react';
import BuildingDetails from '../BuildingDetails';

import config from '../../config';

const { BUILDINGS_URL } = config;

export default (props) => {
  const { onClose, incompleteDetails } = props;
  const [completeDetails, setCompleteDetails] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // @TODO update to new API endpoints and schema
  React.useEffect(() => {
    if (incompleteDetails == null) return;
    if (completeDetails?.general_id !== incompleteDetails?.general_id) {
      const buildingURL = `${BUILDINGS_URL}/${incompleteDetails.general_id}/`;
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setCompleteDetails(null);
          const res = await fetch(buildingURL);
          const data = await res.json();
          setCompleteDetails(data);
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [completeDetails, incompleteDetails]);

  return <BuildingDetails onClose={onClose} details={completeDetails} isLoading={isLoading} />;
};
