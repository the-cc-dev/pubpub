import React from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

require('./dropdownButton.scss');

const propTypes = {
	label: PropTypes.string,
	icon: PropTypes.string,
	isRightAligned: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isSmall: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

const defaultProps = {
	label: undefined,
	icon: undefined,
	isDisabled: false,
	isRightAligned: false,
	isSmall: false,
};

const DropdownButton = function(props) {
	return (
		<Popover
			content={props.children}
			interactionKind={PopoverInteractionKind.CLICK}
			position={props.isRightAligned ? Position.BOTTOM_RIGHT : Position.BOTTOM_LEFT}
			popoverClassName="pt-minimal"
			transitionDuration={-1}
			inheritDarkTheme={false}
			tetherOptions={{
				constraints: [{ attachment: 'together', to: 'window' }]
			}}

		>
			{props.icon && !props.label
				? <button disabled={props.isDisabled} type="button" className={`dropdown-button pt-button ${props.icon} ${props.isSmall ? 'pt-small' : ''}`} />
				: <button disabled={props.isDisabled} type="button" className={`dropdown-button pt-button ${props.isSmall ? 'pt-small' : ''}`}>
					{props.icon &&
						<span className={`pt-icon-standard ${props.icon}`} />
					}
					{props.label.trim()}
					<span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
				</button>
			}
		</Popover>
	);
};

DropdownButton.defaultProps = defaultProps;
DropdownButton.propTypes = propTypes;
export default DropdownButton;
