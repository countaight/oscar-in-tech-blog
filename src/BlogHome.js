import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Butter from 'buttercms';

import logo from './logo.svg';
import fbbutton from './facebook.svg';

const butter = Butter(BUTTER_API_KEY)

class BlogHome extends Component {
	state = {
		loaded: false,
		resp: {data: []},
		author: ''
	}

	componentWillMount() {
		butter.post.list({page: 1, page_size: 5})
			.then(resp => {
					this.setState({
						resp: resp.data
					});
				}
			)
			.catch(err => console.log(err));

		butter.author.retrieve('oscar-delgadillo')
			.then(resp => {
				this.setState({
					loaded: true,
					author: resp.data
				})
			})
			.catch(err => console.log(err));
	}

	render() {
		if (!this.state.loaded) {
			return <div className="container">Loading...</div>
		}

		return (
			<div>
				<ul>
					{this.state.resp.data.map(post => {
						const image = post.featured_image || logo
						return (
							<li key={post.slug} className="blog-list-post">
								<div className="thumbnail" style={{backgroundImage: `url(${image})`}} alt={post.slug} />
								<div className="blog-post-description">
									<Link className="blog-post-link" to={`/page/${post.slug}`}>{post.title}</Link>
									<p className="blog-post-summary">{post.summary}</p>
								</div>
							</li>
						)
					})}
				</ul>
				<a href={this.state.author.data.facebook_url}><img className="fb-icon" src={fbbutton} alt="facebook" /></a>
			</div>
		)
	}
}

export default BlogHome;