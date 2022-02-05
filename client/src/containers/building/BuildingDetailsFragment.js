import React, { useState } from 'react';
import BuildingDetails from '../../components/BuildingDetails';

import config from '../../config';

const { TESTING_CENTERS_URL } = config;

export default (props) => {
  const { onClose, incompleteDetails } = props;
  const [completeDetails, setCompleteDetails] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (incompleteDetails == null) return;
    if (completeDetails?.pk !== incompleteDetails?.pk) {
      const buildingURL = `${TESTING_CENTERS_URL}/${incompleteDetails.pk}/`;
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
  }, [incompleteDetails]);

  return <BuildingDetails onClose={onClose} details={completeDetails} isLoading={isLoading} />;
};
