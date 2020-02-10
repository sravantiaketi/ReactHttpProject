import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error : false
    }

    componentDidMount() {
        //invoke external service
    axios.get('/posts')
    .then(response => {
        const posts = response.data.slice(0, 4);
        //update the response with by adding author field
        const updatedPosts = posts.map(post => {
           return {
            ...post,
            author : 'Max'
           } 
        });
        this.setState({posts : updatedPosts});
    })
    .catch(
        error => {
            this.setState({error : true});
           }
    )
    }

    postSelectedHandler = (id) => {
        //navigating programatically
        this.props.history.push({pathname : '/posts/' + id});
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
             //   <Link to={'/posts'+post.id }  key={post.id}>
                <Post
                   
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
                    //</Link>
                );
            });
        }
        return (
            <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;