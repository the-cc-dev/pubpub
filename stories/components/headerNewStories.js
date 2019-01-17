import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderNew from 'components/HeaderNew/HeaderNew';
import { locationData, loginData } from '../data';

require('components/HeaderNew/headerNew.scss');

const wrapperStyle = { margin: '2em 1em', border: '1px solid #CCC' };

const communityData = {

};

storiesOf('Components/HeaderNew', module)
.add('default', () => (
	<div>
		<div style={wrapperStyle}>
			<HeaderNew
				communityData={{
					...communityData,
					hideSmallLogo: false,
					title: 'Hiptest',
					headerBackgroundImage: undefined,
					headerBackgroundColor: undefined,
					smallLogo: 'http://localhost:8000/logo1.png',
					heroImage: 'http://localhost:8000/image1.png',
					heroTitle: 'Get to market faster with continuous testing',
					heroLogo: undefined,
					heroText: 'From idea to production, test your product continuously with Behavior Driven Development and Agile test management.',
					heroPrimaryButton: 'Start your free trial',
					heroSecondaryButton: 'Explore stuff',
					heroAlign: undefined,
				}}
				locationData={locationData}
				loginData={loginData}
			/>
		</div>
		<div style={wrapperStyle}>
			<HeaderNew
				communityData={{
					...communityData,
					hideSmallLogo: false,
					title: 'WHITEOUT',
					headerBackgroundImage: 'http://localhost:8000/bg2.jpg',
					headerBackgroundColor: undefined,
					smallLogo: 'http://localhost:8000/logo2.png',
					heroImage: undefined,
					heroTitle: undefined,
					heroLogo: 'http://localhost:8000/heroLogo2.png',
					heroText: undefined,
					heroPrimaryButton: undefined,
					heroSecondaryButton: undefined,
					heroAlign: 'center',
				}}
				locationData={locationData}
				loginData={loginData}
			/>
		</div>
		<div style={wrapperStyle}>
			<HeaderNew
				communityData={{
					...communityData,
					hideSmallLogo: false,
					title: 'Timepal',
					headerBackgroundImage: undefined,
					headerBackgroundColor: undefined,
					smallLogo: 'http://localhost:8000/logo3.png',
					heroImage: undefined,
					heroTitle: 'Automatic and manual time-tracking finally united',
					heroLogo: undefined,
					heroText: 'Stressless timekeeping became a reality',
					heroPrimaryButton: 'Download Free Trial',
					heroSecondaryButton: undefined,
					heroAlign: 'center',
				}}
				locationData={locationData}
				loginData={loginData}
			/>
		</div>
		<div style={wrapperStyle}>
			<HeaderNew
				communityData={{
					...communityData,
					hideSmallLogo: false,
					title: 'toggl',
					headerBackgroundImage: undefined,
					headerBackgroundColor: '#d4a3e1',
					smallLogo: 'http://localhost:8000/logo4.png',
					heroImage: 'http://localhost:8000/heroLogo4.png',
					heroTitle: 'Where did time go?',
					heroLogo: undefined,
					heroText: 'Turn your team on to productivity with Toggl the time tracker.',
					heroPrimaryButton: 'Sign Up',
					heroSecondaryButton: 'Find out more',
					heroAlign: 'center',
				}}
				locationData={locationData}
				loginData={loginData}
			/>
		</div>
	</div>
));
