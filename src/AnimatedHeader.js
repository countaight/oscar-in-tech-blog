import React, { Component } from 'react';

class AnimatedHeader extends Component {
	state = {
		verbs: { selectable: false, selected: 'designs', options: ['designs', 'photographs', 'makes'] },
		nouns: {
			designs: ['sites', 'graphics'],
			photographs: ['people', 'puppies', 'nature'],
			makes: ['origami', 'funny faces', 'friends'],
		},
	}

	handleClick = (e) => {
		const newVerbs = this.state.verbs;
		newVerbs.selectable = !newVerbs.selectable;

		this.setState({ verbs: newVerbs });
	}

	clickSelection = (e) => {
		const selection = e.target.innerHTML;
		const newVerbs = this.state.verbs;
		newVerbs.selected = selection;

		this.setState({ verbs: newVerbs });
	}

	render() {
		const { verbs, nouns } = this.state;
		return <div>
		<span>ox</span>
		<span className='custom-select'>
			<span className='custom-selections' onClick={this.handleClick}>
				{!verbs.selectable && <span>{verbs.selected}</span>}
				{verbs.selectable && verbs.options.map(verb => <span className="custom-selection" key={verb} onClick={this.clickSelection}>{verb}</span>)}
			</span>
		</span>
		<span className='custom-select'>
			<select>
				{nouns[verbs.selected].map(noun => <option key={noun} value={noun}>{noun}</option>)}
			</select>
		</span>
		</div>
	}
};

export default AnimatedHeader;