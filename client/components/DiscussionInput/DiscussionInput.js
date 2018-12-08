import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import Editor, { getText, getJSON } from '@pubpub/editor';
import { getResizedUrl } from 'utilities';

require('./discussionInput.scss');

const propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	showTitle: PropTypes.bool,
	isNew: PropTypes.bool,
	initialContent: PropTypes.object,
	submitIsLoading: PropTypes.bool,
	getHighlightContent: PropTypes.func,
	inputKey: PropTypes.string,
	activeDiscussionChannel: PropTypes.object.isRequired,
	leftButtons: PropTypes.node,
};

const defaultProps = {
	showTitle: false,
	initialContent: undefined,
	isNew: false,
	submitIsLoading: false,
	getHighlightContent: undefined,
	inputKey: undefined,
	leftButtons: undefined,
};

class DiscussionInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			editorChangeObject: undefined,
			// isPublic: true,
			submitDisabled: true,
			key: props.inputKey || new Date().getTime(),
		};
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onBodyChange = this.onBodyChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		// this.editorRef = undefined;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.submitIsLoading && !nextProps.submitIsLoading) {
			this.setState({
				key: new Date().getTime(),
				title: '',
				// body: '',
				editorChangeObject: undefined,
				submitDisabled: true,
			});
		}
	}

	onTitleChange(evt) {
		this.setState({ title: evt.target.value });
	}

	onBodyChange(changeObject) {
		this.setState({
			editorChangeObject: changeObject,
			submitDisabled: !getText(changeObject.view),
		});
	}

	onSubmit(evt) {
		evt.preventDefault();
		const highlights = this.state.editorChangeObject.view.state.doc.content.content.filter((item)=> {
			return item.type.name === 'highlightQuote';
		}).map((item)=> {
			return item.attrs;
		});
		this.props.handleSubmit({
			title: this.state.title,
			content: getJSON(this.state.editorChangeObject.view),
			text: getText(this.state.editorChangeObject.view),
			// isPublic: this.state.isPublic,
			highlights: highlights.length ? highlights : undefined,
		});
	}

	render() {
		return (
			<div className="discussion-input-component">
				{this.props.showTitle &&
					<input
						className="title-input"
						placeholder="Add Discussion Title..."
						value={this.state.title}
						onChange={this.onTitleChange}
					/>
				}
				<div className="input-text">
					<Editor
						key={this.state.key}
						placeholder="Type here..."
						onChange={this.onBodyChange}
						initialContent={this.props.initialContent}
						getHighlightContent={this.props.getHighlightContent}
						nodeOptions={{
							image: {
								onResizeUrl: getResizedUrl,
							},
						}}
					/>
				</div>
				<div className="buttons">
					<div className="buttons-left">
						{this.props.leftButtons}
					</div>
					<div className="buttons-right">
						<Button
							name="submit"
							type="submit"
							className="bp3-button bp3-intent-primary bp3-small"
							onClick={this.onSubmit}
							text={this.props.isNew || this.props.showTitle ? `Post to #${this.props.activeDiscussionChannel.title}` : 'Submit Reply'}
							disabled={this.state.submitDisabled}
							loading={this.props.submitIsLoading}
						/>
					</div>
				</div>
			</div>
		);
	}
}

DiscussionInput.propTypes = propTypes;
DiscussionInput.defaultProps = defaultProps;
export default DiscussionInput;
