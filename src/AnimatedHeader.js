import React, { Component } from 'react';
import posed from 'react-pose';

const CustomSelect = posed.span({
	open: {
		height: 316,
	},
	closed: {
		height: 0,
	},
});

const CustomOption = posed.span({
	open: {
		opacity: 1,
		height: 106,
		width: 'auto',
		transition: {
			height: { delay: 300 },
			opacity: { delay: 300 }
		}
	},
	closed: {
		opacity: 0,
		height: 0,
		width: 0,
		transition: {
			width: { duration: 1000 }
		}
	},
})

class AnimatedHeader extends Component {
	state = {
		verbs: { selectable: false, position: 0, options: ['designs', 'photographs', 'makes'] },
		nouns: {
			selectable: false,
			position: 0,
			designs: ['sites', 'graphics', 'flyers'],
			photographs: ['people', 'puppies', 'nature'],
			makes: ['origami', 'funnyfaces', 'friends'],
		},
	};
	timer = null;

	handleAnim = () => {
		if (!this.timer) {
			this.timer = setInterval(this.iterateVerbs, 3000);
		} else {
			clearInterval(this.timer);
			this.timer = null;
		};
	}

	iterateVerbs = () => {
	  const { verbs, nouns } = this.state;
	  const currentVerb = verbs.options[verbs.position];

	  if (nouns.position < nouns[currentVerb].length - 1) {
	  	this.setState({
	    	verbs,
	      nouns: { ...nouns, position: nouns.position + 1 }
	    });
	  } else {
	    this.setState({
	      verbs: { ...verbs, position: (verbs.position + 1) % 3 },
	      nouns: { ...nouns, position: 0 }
	    });
	  }
	}

	determineVisibility = ({ verb, noun }) => {
		const { verbs, nouns } = this.state;

		if (verb) {
			return verbs.options[verbs.position] === verb || verbs.selectable;
		};

		if (noun) {
			return nouns[verbs.options[verbs.position]][nouns.position] === noun || nouns.selectable;
		};
	}

	handleClick = (e) => {
		clearInterval(this.timer);
		this.timer = null;
		const { nouns, verbs } = this.state;

		if (e.target.classList[1] === 'verb') {
			const selection = e.target.innerHTML;
			const position = verbs.options.indexOf(selection);

			this.setState({ verbs: { ...verbs, position, selectable: !verbs.selectable } });
		} else {
			const selection = e.target.innerHTML;
			const position = nouns[verbs.options[verbs.position]].indexOf(selection);

			this.setState({ verbs, nouns: { ...nouns, position, selectable: !nouns.selectable } });
		};
	}

	componentDidMount() {
		this.timer = setInterval(this.iterateVerbs, 3000);
	}

	componentWillUnmount() {
		if(this.timer) { clearInterval(this.timer) };
	}

	render() {
		const { verbs, nouns } = this.state;
		return <div className='animated-header'>
			<span className="ox" onClick={this.handleAnim}>ox</span>
			<span className='custom-select'>
				<CustomSelect className='custom-selections' onClick={this.handleClick} pose={verbs.selectable ? 'open' : 'closed'}>
					{verbs.options.map((verb, i) => <CustomOption i={i} className="custom-selection verb" key={verb} pose={this.determineVisibility({ verb }) ? 'open' : 'closed'} withParent={false}>{verb}</CustomOption>)}
				</CustomSelect>
			</span>
			<span className='custom-select'>
				<CustomSelect className='custom-selections' onClick={this.handleClick} pose={nouns.selectable ? 'open' : 'closed'}>
					{nouns[verbs.options[verbs.position]].map(noun => <CustomOption className="custom-selection noun" key={noun} pose={this.determineVisibility({ noun }) ? 'open' : 'closed'} withParent={false}>{noun}</CustomOption>)}
				</CustomSelect>
			</span>
		</div>
	}
};

export default AnimatedHeader;