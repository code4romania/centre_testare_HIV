import React, { useState } from 'react';
import { CenterDetails } from '../CenterDetails';

import config from '../../config';
import { mapKeysToCamelCase } from '../../utils';

const { CENTER_URL } = config;

export default (props) => {
  const { onClose, incompleteDetails } = props;
  const [completeDetails, setCompleteDetails] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (incompleteDetails == null) return;
    if (completeDetails?.pk !== incompleteDetails?.pk) {
      const buildingURL = `${CENTER_URL}${incompleteDetails.pk}/`;
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setCompleteDetails(null);
          const res = await fetch(buildingURL);
          const data = await res.json();
          const mappedData = mapKeysToCamelCase(data);
          setCompleteDetails(mappedData);
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [completeDetails, incompleteDetails]);

  return <CenterDetails onClose={onClose} details={completeDetails} isLoading={isLoading} />;
};
