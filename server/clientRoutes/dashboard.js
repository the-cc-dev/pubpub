import React from 'react';
import Promise from 'bluebird';
import Dashboard from 'containers/Dashboard/Dashboard';
import Html from '../Html';
import app from '../server';
import { Pub, Version, Discussion, PubTag, Tag } from '../models';
import { hostIsValid, renderToNodeStream, getInitialData, handleErrors, generateMetaComponents } from '../utilities';
import { findCollection } from '../queryHelpers';

app.get(['/dashboard', '/dashboard/:mode', '/dashboard/:mode/:slug'], (req, res, next)=> {
	if (!hostIsValid(req, 'community')) { return next(); }
	if (!req.params.mode) {
		return res.redirect('/dashboard/pubs');
	}
	return getInitialData(req)
	.then((initialData)=> {
		if (!initialData.loginData.isAdmin) { throw new Error('User Not Admin'); }

		const slug = initialData.locationData.params.slug || '';
		const mode = initialData.locationData.params.mode;
		const activeItem = {};
		if (mode === 'activity') { activeItem.title = 'Activity'; }
		if (mode === 'team') { activeItem.title = 'Team'; }
		if (mode === 'details') { activeItem.title = 'Details'; }
		if (mode === 'tags') { activeItem.title = 'Tags'; }
		if (mode === 'pubs') { activeItem.title = 'Pubs'; }
		if (mode === 'page') { activeItem.title = 'New Page'; }
		// if (mode === 'collection') { activeItem.title = 'New Collection'; }

		const pageId = initialData.communityData.pages.reduce((prev, curr)=> {
			if (mode === 'pages' && !req.params.slug && !curr.slug) { return curr.id; }
			if (curr.slug === req.params.slug) { return curr.id; }
			return prev;
		}, undefined);

		if (!pageId && !activeItem.title) { throw new Error('Page Not Found'); }

		const findCollectionData = activeItem.title
			? activeItem
			: findCollection(pageId, true, initialData);

		// TODO - need to filter this for manager permissions
		const findPubs = mode === 'pubs'
			? Pub.findAll({
				where: { communityId: initialData.communityData.id },
				include: [
					{
						model: Version,
						required: false,
						as: 'versions',
						attributes: ['id', 'isPublic', 'isCommunityAdminShared', 'createdAt']
					},
					{
						required: false,
						separate: true,
						model: Discussion,
						as: 'discussions',
						attributes: ['id', 'createdAt', 'pubId']
					},
					{
						model: PubTag,
						as: 'pubTags',
						required: false,
						separate: true,
						include: [{
							model: Tag,
							as: 'tag',
						}],
					},
				]
			})
			: [];
		return Promise.all([
			initialData,
			findCollectionData,
			findPubs,
		]);
	})
	.then(([initialData, collectionData, pubsData])=> {
		const newInitialData = {
			...initialData,
			collectionData: collectionData,
			pubsData: pubsData
		};
		return renderToNodeStream(res,
			<Html
				chunkName="Dashboard"
				initialData={newInitialData}
				headerComponents={generateMetaComponents({
					initialData: initialData,
					title: `${collectionData.title} · Dashboard`,
					unlisted: true,
				})}
			>
				<Dashboard {...newInitialData} />
			</Html>
		);
	})
	.catch(handleErrors(req, res, next));
});
