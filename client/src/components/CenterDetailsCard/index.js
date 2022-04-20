import React from 'react';
import { Button, Card } from 'antd';
import { Trans } from '@lingui/macro';

export const CenterDetailsCard = ({ title, children, onActionClick, loading }) => {
  return (
    <Card
      hoverable
      type="inner"
      title={title}
      headStyle={{ backgroundColor: '#be3386', color: '#fff', fontWeight: 'bold' }}
      actions={[
        <Button onClick={onActionClick} className="call-center-btn" loading={loading}>
          <Trans>Center details</Trans>
        </Button>,
      ]}
    >
      {children}
    </Card>
  );
};

export default { CenterDetailsCard };
