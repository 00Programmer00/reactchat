import React, { Component } from 'react';

export default class MessagesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            nickname: ''
        };

        this.connect = this.connect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
    }

    connect() {
        let socket = window.io('http://web.bidon-tech.com:65060');
        socket.on('connect', () => {
            console.log('connected');
            let currentUser = this.state.nickname;

            socket.emit('nickname', this.state.nickname, response => {
                response.map((message) => {
                    let messages = [];
                    response.map((message) => {
                        messages.push(message);
                    });
                    this.setState({messages});
                });
                console.log('chat history', response);
            });
        });
    }

    onChange(e){
        e.preventDefault();
        this.setState({nickname: e.target.value});
    }

    render(){
        const messages = this.state.messages.map((message, i) =>{
            return(
                <div key={i} className={"msg " + (message.nickname === this.state.nickname ? "msg--me" : "msg--them") } >
                    <blockquote >
                        {message.message}
                    </blockquote>
                </div>
            )
        });

        return(
            <div>
                <header className="contact">
                    <section className="contact--details" id="Head">
                        <h1 className="contact--details__name online">Flex-box Chat!</h1>
                        <input type="text" placeholder="Login..." id="Login" onChange={this.onChange}/>
                            <button onClick={this.connect} id="logbtn">Log in</button>
                    </section>
                </header>
                <section className="messages" id="messagesDiv">
                    <section id="messagesSection">
                        <h3 className="msg--date">Today</h3>
                        {messages}
                    </section>
                </section>
                <form action="">
                    <input type="text" placeholder="Your message" id="inputField"/>
                    <button id="Send" >Send</button>
                </form>
            </div>
        )
    }
}