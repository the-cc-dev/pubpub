import React from 'react';
import { storiesOf } from '@storybook/react';
import PubDraftHeader from 'components/PubDraftHeader/PubDraftHeader';
import { pubData, locationData } from '../data';

storiesOf('Components/PubDraftHeader', module)
.add('default', () => (
	<div className="container">
		<PubDraftHeader
			pubData={pubData}
			locationData={locationData}
			setOverlayPanel={()=>{}}
		/>
	</div>
));
