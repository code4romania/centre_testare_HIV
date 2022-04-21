import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph } = Typography;

export const SupportFragment = () => {
  return (
    <div style={{ padding: '32px 0' }}>
      <Paragraph>
        <Trans>
          Every year, the numbers get worse. The alarming number of minors who become mothers and
          drop out of school is one of the few consequences in the lack of access to sexual health
          education in Romania. Information is power. Together we have the power to flatten the
          statistics of infections, unwanted pregnancies and we can ensure a healthier future for
          young people.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          The project Services for youth from Norway in Romania - PILOT comes precisely from this
          need for education. The project is aimed at young people in disadvantaged areas, young
          people who need this type of service.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          The project will provide access to free condoms for a later elected county, but this is
          just the beginning. Contraception and free methods of protection must be accessible to
          young people from disadvantaged areas throughout Romania. Our site provides information on
          local rapid testing centers for HIV and other sexually transmitted infections in 11
          counties. We want to expand the area of work and information with as much data as possible
          in the service of young people in Romania.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          We can only do this with the help of people who believe in the cause for which the project
          is fighting and who want to contribute to achieving the ultimate goal - a Romania with
          informed young people, who know their sexual and reproductive rights and who protect their
          health.
        </Trans>
      </Paragraph>
    </div>
  );
};

export default { SupportFragment };
