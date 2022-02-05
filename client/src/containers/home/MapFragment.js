import React from 'react';
import HereMapInteractive from '../../components/HereMapInteractive';

import config from '../../config';

const { TESTING_CENTERS_URL } = config;

export default () => {
  const [testingCenters, setTestingCenters] = React.useState([]);

  React.useEffect(() => {
    fetch(`${TESTING_CENTERS_URL}/`)
      .then((res) => res.json())
      .then((locations) => {
        setTestingCenters(locations);
      })
      .catch(() => {
        setTestingCenters([]);
      });
  }, []);

  return (
    <div>
      <HereMapInteractive points={testingCenters} />
    </div>
  );
};
