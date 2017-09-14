import React, { Component } from 'react';

export default class MessagesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            nickname: '',
            status: true,
            input: ''
        };

        this.connect = this.connect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    componentDidMount(){
    }

    connect() {
       this.socket = window.io('http://web.bidon-tech.com:65060');
        this.setState({status: false});
        this.socket.on('connect', () => {
            console.log('connected');
            let currentUser = this.state.nickname;

            this.socket.emit('nickname', this.state.nickname, response => {
                response.map((message) => {
                    let messages = [];
                    response.map((message) => {
                        messages.push(message);
                    });
                    this.setState({messages});
                });
            });


            this.socket.on('message', message => {
                this.setState({messages: [...this.state.messages, message]});
            });

        });
    }

    onChange(e){
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});
    }

    onChangeInput(e){
        e.preventDefault();
        this.setState({input : e.target.value});
    }

    addMessage(e){
        e.preventDefault();
            this.socket.emit('message', this.state.input);
            this.setState({input: ''});
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

                        { this.state.status ? <input type="text" name="nickname" placeholder="Login..." id="Login" onChange={this.onChange}/> : null }
                        { this.state.status ? <button onClick={this.connect} id="logbtn">Log in</button> : null }
                        { this.state.status ? null : <h1>Hello in our chat: {this.state.nickname}</h1> }

                    </section>
                </header>
                <section className="messages" id="messagesDiv">
                    <section id="messagesSection">
                        <h3 className="msg--date">Today</h3>
                        {messages}
                    </section>
                </section>
                <form action="">
                    <input type="text" onChange={this.onChangeInput} value={this.state.input} placeholder="Your message" id="inputField"/>
                    <button id="Send" onClick={this.addMessage}>Send</button>
                </form>
            </div>
        )
    }
}