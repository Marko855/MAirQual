import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true
        };
    }

    componentDidMount() {
        // Fetch the list of users from the server
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data, loading: false });
            });
    }

    render() {
        const { users, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h1>Hello, world!</h1>
                <p>Welcome to your new single-page application.</p>
                <h2>List of Users:</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <strong>{user.name}</strong> - {user.email}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
