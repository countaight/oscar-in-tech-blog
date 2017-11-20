import React, { Component } from 'react';
import Butter from 'buttercms';

const butter = Butter('2a0b7f190ae9e799758d91bb94cbb3b8d3ad7ffa')

class BlogPost extends Component {
	state = {
		loaded: false,
		post: {},
		mobile: window.innerWidth < 480
	}

	determineStyle = () => {
		if(window.innerWidth < 480) {
			this.setState({ mobile: true });
			return;
		}

		this.setState({ mobile: false })
	}

	componentWillMount() {
		const { slug } = this.props.match.params;

		butter.post.retrieve(slug)
		.then(resp => {
			this.setState({
				loaded: true,
				post: resp.data.data
			})
		})

		window.addEventListener('resize', this.determineStyle);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.determineStyle);
	}

	render() {
		const style = this.state.mobile ? mobileStyles : styles;

		if (!this.state.loaded) {
			return <div className="container">Post Loading...</div>
		}

		const { post } = this.state;

		return (
			<section>
				<h1 style={style.title}>{post.title}</h1>
				<p style={style.author}>by {post.author.first_name} {post.author.last_name}</p>
				<div style={style.postBody} dangerouslySetInnerHTML={{__html: post.body}} />
			</section>
		)
	}
}

const styles = {
	title: {
		fontFamily: 'Roboto',
		color: '#4E5358',
		fontSize: '50px',
		marginBottom: 0
	},
	author: {
		fontFamily: 'Source Sans Pro',
		color: '#333333',
		marginTop: 0
	},
	postBody: {
		fontFamily: 'Source Sans Pro',
		color: '#333333',
		fontSize: 24,
		width: '80vw',
		margin: '0 auto',
		textAlign: 'left'
	}
}

const mobileStyles = {
	...styles,
	postBody: {
		...styles.postBody,
		fontSize: 20,
		width: '90vw'
	}
}

export default BlogPost;