import React, { ReactElement } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';

import { ActionBar } from '../ActionBar/ActionBar';
import Author from '../Author';
import Developers from '../Developers';
import Dist from '../Dist/Dist';
import Engine from '../Engines/Engines';
import Install from '../Install';
import Repository from '../Repository/Repository';

import { DetailContext } from '../../pages/Version';

import { TitleListItem, TitleListItemText } from './styles';

const renderLatestDescription = (description, version, isLatest: boolean = true) => {
  return (
    <span>
      <div>{description}</div>
      {version ? <small>{`${isLatest ? 'Latest v' : 'v'}${version}`}</small> : null}
    </span>
  );
};

const renderCopyCLI = () => <Install />;
const renderMaintainers = () => <Developers type="maintainers" />;
const renderContributors = () => <Developers type="contributors" />;
const renderRepository = () => <Repository />;
const renderAuthor = () => <Author />;
const renderEngine = () => <Engine />;
const renderDist = () => <Dist />;
const renderActionBar = () => <ActionBar />;
const renderTitle = (packageName, packageVersion, packageMeta) => {
  const version = packageVersion ? packageVersion : packageMeta.latest.version;
  const isLatest = typeof packageVersion === 'undefined';

  return (
    <List className="detail-info">
      <TitleListItem alignItems="flex-start" button={true}>
        <TitleListItemText primary={<b>{packageName}</b>} secondary={renderLatestDescription(packageMeta.latest.description, version, isLatest)} />
      </TitleListItem>
    </List>
  );
};

function renderSideBar(packageName, packageVersion, packageMeta): ReactElement<HTMLElement> {
  return (
    <div className={'sidebar-info'}>
      <Card>
        <CardContent>
          {renderTitle(packageName, packageVersion, packageMeta)}
          {renderActionBar()}
          {renderCopyCLI()}
          {renderRepository()}
          {renderEngine()}
          {renderDist()}
          {renderAuthor()}
          {renderMaintainers()}
          {renderContributors()}
        </CardContent>
      </Card>
    </div>
  );
}

const DetailSidebar = () => {
  const { packageName, packageMeta, packageVersion } = React.useContext(DetailContext);

  return renderSideBar(packageName, packageVersion, packageMeta);
};

export default DetailSidebar;
