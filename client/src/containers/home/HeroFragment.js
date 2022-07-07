import React from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { useIsSmallDevice } from '../../hooks/useIsSmallDevice';
import logo from '../../logo.svg';

const { Paragraph, Title, Text } = Typography;

const PRIMARY_COLOR = '#be3386';

const stepCard = {
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#fff',
  padding: '20px 20px',
  height: '100%',
};

const mobileCard = {
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  backgroundColor: PRIMARY_COLOR,
  color: '#fff',
  padding: '20px 20px',
};

export default () => {
  const isSmallDevice = useIsSmallDevice();

  return (
    <div className="hero-container">
      <Row type="flex" justify="center">
        <Row
          className="container hero-body"
          type="flex"
          justify="start"
          style={{ width: '100%', paddingBottom: 0 }}
        >
          <Col span={24}>
            <img width="200px" src={logo} style={{ marginBottom: '24px' }} />
            <Title level={2} style={{ marginTop: 0 }}>
              <Trans>Find an HIV TESTING CENTER in 3 easy steps! Here's how:</Trans>
            </Title>
          </Col>
        </Row>
        <Row
          className="container hero-body"
          type="flex"
          gutter={[
            { xs: 0, md: 20 },
            { xs: 20, sm: 20, md: 0 },
          ]}
          justify="space-between"
          align="stretch"
        >
          <Col sm={24} md={8}>
            <div style={stepCard}>
              <Title level={2}>
                <Trans>Step 1</Trans>:
              </Title>
              <Text>
                {isSmallDevice ? (
                  <Trans>
                    Activate your phone's location and search for the nearest HIV testing centre.
                  </Trans>
                ) : (
                  <Trans>
                    Choose if you want to search after the current location or if you want to
                    introduce a fixed address.
                  </Trans>
                )}
              </Text>
            </div>
          </Col>
          <Col sm={24} md={8}>
            <div style={stepCard}>
              <Title level={2}>
                <Trans>Step 2</Trans>:
              </Title>
              <Text>
                <Trans>
                  Select the center you want to go to on the map and Click on ”
                  <span style={{ color: PRIMARY_COLOR }}>See how to get there</span>”.
                </Trans>
              </Text>
            </div>
          </Col>
          <Col sm={24} md={8}>
            <div style={stepCard}>
              <Title level={2}>
                <Trans>Step 3</Trans>:
              </Title>
              <Text>
                {isSmallDevice ? (
                  <Trans>
                    Google/Apple Maps will show you the shortest way to get to the chosen center.
                  </Trans>
                ) : (
                  <Trans>
                    A new page in Google Maps will show you the shortest way to get to the chosen
                    center.
                  </Trans>
                )}
              </Text>
            </div>
          </Col>
          {isSmallDevice && (
            <Col span={24}>
              <div style={mobileCard}>
                <Title level={3} style={{ marginTop: 0, color: '#fff' }}>
                  <Trans>Add the app to your phone:</Trans>
                </Title>
                <Trans>
                  Click on the Settings button <Button icon="more" shape="circle" size="small" /> in
                  the browser you are using and choose ”Add to Homescreen” and our app will be
                  always one tap away.
                </Trans>
              </div>
            </Col>
          )}
        </Row>
        <Row className="container hero-body" type="flex" justify="start" style={{ width: '100%' }}>
          <Paragraph>
            <Trans>
              <Text strong>Centre HIV</Text> is the first application in Romania for HIV testing,
              where institutions from 11 counties in Romania that offer HIV testing are centralized.
              In the application we provide details such as the location of the institution, the
              work schedule, the cost of a test and details needed to test for HIV infection, how to
              test people under 16 and provide counseling for people who need more information.
            </Trans>
          </Paragraph>
        </Row>
      </Row>
    </div>
  );
};
