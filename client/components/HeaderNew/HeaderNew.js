import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar/Avatar';
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider, Button } from '@blueprintjs/core';
import { apiFetch, getResizedUrl } from 'utilities';

require('./headerNew.scss');

const propTypes = {
	communityData: PropTypes.object.isRequired,
	locationData: PropTypes.object.isRequired,
	loginData: PropTypes.object.isRequired,
};

class HeaderNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
		// 	redirect: '',
			isLoading: false,
		};
		this.handleLogout = this.handleLogout.bind(this);
		this.createPub = this.createPub.bind(this);
	}

	// componentDidMount() {
	// 	if (window.location.pathname !== '/') {
	// 		this.setState({
	// 			redirect: `?redirect=${window.location.pathname}${window.location.search}`
	// 		});
	// 	}
	// }

	handleLogout() {
		apiFetch('/api/logout')
		.then(()=> { window.location.href = '/'; });
	}

	createPub() {
		this.setState({ isLoading: true });
		return apiFetch('/api/pubs', {
			method: 'POST',
			body: JSON.stringify({
				communityId: this.props.communityData.id,
				defaultTagIds: this.props.communityData.defaultPubTags || [],
			})
		})
		.then((result)=> {
			window.location.href = result;
		})
		.catch((err)=> {
			console.error(err);
			this.setState({ isLoading: false });
		});
	}

	render() {
		let dynamicComponentClasses = '';
		let dynamicMainClasses = 'main';
		let dynamicHeroClasses = 'hero';
		if (this.props.communityData.heroAlign === 'center') {
			dynamicHeroClasses += ' centered';
		}
		const backgroundStyle = {};
		if (this.props.communityData.headerBackgroundImage) {
			backgroundStyle.backgroundImage = `url("${this.props.communityData.headerBackgroundImage}")`;
		}
		if (this.props.communityData.headerBackgroundColor) {
			backgroundStyle.backgroundColor = this.props.communityData.headerBackgroundColor;
		}
		return (
			<nav className={`header-new-component ${dynamicComponentClasses}`} style={backgroundStyle}>
				<div className={dynamicMainClasses}>
					<div className="container">
						<div className="row">
							<div className="col-12 main-content">
								<a href="/" className="logo-wrapper">
									<img src={this.props.communityData.smallLogo} />
								</a>
								<div className="buttons-wrapper">
									Login
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={dynamicHeroClasses}>
					<div className="container">
						<div className="row">
							<div className="col-12 hero-content">
								<div className="hero-copy">
									{this.props.communityData.heroTitle &&
										<div className="hero-title">{this.props.communityData.heroTitle}</div>
									}
									{this.props.communityData.heroLogo &&
										<div className="hero-logo">
											<img src={this.props.communityData.heroLogo} />
										</div>
									}
									{this.props.communityData.heroText &&
										<div className="hero-text">{this.props.communityData.heroText}</div>
									}
									<div className="hero-button">
										{this.props.communityData.heroPrimaryButton &&
											<Button
												text={this.props.communityData.heroPrimaryButton}
											/>
										}
										{this.props.communityData.heroSecondaryButton &&
											<Button
												minimal={true}
												text={this.props.communityData.heroSecondaryButton}
											/>
										}
									</div>
								</div>
								{this.props.communityData.heroImage &&
									<div className="hero-image">
										<img src={this.props.communityData.heroImage} />
									</div>
								}
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

// Header.defaultProps = defaultProps;
HeaderNew.propTypes = propTypes;
export default HeaderNew;
