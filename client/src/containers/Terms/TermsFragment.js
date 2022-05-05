import React from 'react';
import { Trans } from '@lingui/macro';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Text, Title } = Typography;

export const TermsFragment = () => {
  return (
    <div style={{ padding: '32px  0' }}>
      <Title level={3}>
        <Trans>1. Platform Objective</Trans>
      </Title>
      <Paragraph>
        <Trans>
          The aim of the project{' '}
          <Text strong>Services from Norway for Young People in Romania - PILOT</Text> is to
          increase access to sexual and reproductive health education for young people aged 15-35 in
          disadvantaged areas, following the Norwegian model, adopting the slogan Active Citizens
          Fund Romania <Text strong>Working together for an inclusive Europe</Text>.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>2. Processed personal data</Trans>
      </Title>
      <Paragraph>
        <Trans>
          By filling in the forms provided in the pages of the platform we can collect the following
          data:
        </Trans>
      </Paragraph>
      <ul>
        <li>
          <Trans>Full name</Trans>
        </li>
        <li>
          <Trans>Email address</Trans>
        </li>
        <li>
          <Trans>Phone number</Trans>
        </li>
      </ul>
      <Title level={3}>
        <Trans>3. Purpose and basis</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Semper Musica Association processes the data of legal entities, public or private, and
          individuals only in order to provide them with information on the field distribution of
          HIV centers, relevant information for testing and other data useful to people with HIV.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>4. Duration of storage</Trans>
      </Title>
      <Paragraph>
        <Trans>
          The data provided is temporarily stored during the operation of the platform{' '}
          <Link to="/">centrehiv.edreptultau.ro</Link>.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>5. Data transfer to third parties</Trans>
      </Title>
      <Paragraph>
        <Trans>
          The data may be transmitted to other institutions or public authorities, as well as other
          competent state bodies, based on and within the limits of legal provisions, as a result of
          requests expressly made by them.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>6. Your rights</Trans>
      </Title>
      <Paragraph>
        <Trans>
          As a user of the platform <Link to="/">centrehiv.edreptultau.ro</Link>, according to Law
          no. 679/2016, as well as, starting with May 25, 2018, according to the General Regulation
          on data protection, you have the following rights:
        </Trans>
      </Paragraph>
      <ul>
        <li>
          <Trans>Right to information regarding data processing;</Trans>
        </li>
        <li>
          <Trans>
            The right to access the data provided, upon request and free of charge for one request
            per year;
          </Trans>
        </li>
        <li>
          <Trans>
            Right of intervention, rectification, deletion or portability of data, upon request and
            free of charge;
          </Trans>
        </li>
        <li>
          <Trans>
            The right to apply to the National Supervisory Authority For Personal Data Processing
            (based in Bucharest, sector 1, B-dul G-ral. Gheorghe Magheru,{' '}
            <Link to={{ pathname: 'https://www.dataprotection.ro/' }} target="_blank">
              www.dataprotection.ro
            </Link>
            ) or to justice, for the protection of any rights guaranteed by law;
          </Trans>
        </li>
        <li>
          <Trans>The right to opposition and automated individual decision-making;</Trans>
        </li>
        <li>
          <Trans>
            As of May 25, 2018, according to the General Data Protection Regulation, the right to
            restrict processing.
          </Trans>
        </li>
      </ul>
      <Title level={3}>
        <Trans>7. Security and privacy</Trans>
      </Title>
      <Paragraph>
        <Trans>
          The protection of the information during the processing of the collected data is a major
          concern of the Semper Musica Association, therefore all the data collected during the
          visits on <Link to="/">centrehiv.edreptultau.ro</Link> are processed according to the
          legal provisions in force in Romania. Semper Musica Association uses state-of-the-art
          technologies and takes all reasonable technical measures to transmit and store data in
          complete security and confidentiality.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          All data on the site is stored and processed on servers located in the European Union,
          which fall under the European legislation on personal data protection. No information
          provided on this site leaves the territory of the European Union.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          If we discover an incident regarding the security of data that poses a risk to the rights
          and freedoms of our users, we will notify the National Supervisory Authority For Personal
          Data Processing within 72 hours. If the security incident is likely to pose a high risk to
          your rights and freedoms, you will also be notified.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          It is strictly forbidden to use this Site in order to destroy or alter it, its content,
          its security or to discredit or harass <Link to="/">centrehiv.edreptultau.ro</Link> or the
          Semper Musica Association.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Semper Musica Association will apply all technical and organizational security measures to
          protect the data over which it has control against any situation of accidental or
          intentional manipulation, loss, destruction or access by an unauthorized person.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>8. Changes to the General Terms and Conditions of use of the Site</Trans>
      </Title>
      <Paragraph>
        <Trans>
          The "General Terms and Conditions of Use" constitutes, in its entirety, an agreement
          between you and the Semper Musica Association regarding the use of{' '}
          <Link to="/">centrehiv.edreptultau.ro</Link>.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Semper Musica reserves the right to revise and update the "General Terms and Conditions of
          Use" at any time, without prior notice or acceptance by users.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          If you have any questions about the information on this page, please email us at{' '}
          <a href="mailto:office@sempermusica.org">office@sempermusica.org</a>.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>9. About Semper Musica</Trans>
      </Title>
      <Paragraph>
        <Trans>
          The Semper Musica Association arose from the need to witness projects with real and
          tangible results, projects to which we can contribute for a change for the better! We want
          rapid and effective change through community involvement. When we say community
          involvement, we mean both us and you. We can't make a difference for the better without
          everyone contributing, so we hope to have you with us on the road to the change we want!
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>10. Contact Us</Trans>
      </Title>
      <Paragraph>
        <Trans>
          For any questions or concerns, as well as for the exercise of your rights related to the
          processing of data by Semper Musica, you can contact us at:
        </Trans>
      </Paragraph>
      <Paragraph>
        E-mail: <a href="office@sempermusica.org">office@sempermusica.org</a>
      </Paragraph>
    </div>
  );
};

export default { TermsFragment };
