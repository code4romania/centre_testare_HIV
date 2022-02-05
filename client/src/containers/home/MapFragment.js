import React from 'react';
import HereMapInteractive from '../../components/HereMapInteractive';

import config from '../../config';

const { BUILDINGS_URL } = config;

export default () => {
  const [testingCenters, setTestingCenters] = React.useState([]);

  React.useEffect(() => {
    fetch(`${BUILDINGS_URL}/`)
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
