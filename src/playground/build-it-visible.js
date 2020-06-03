class Visible extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            visible: false
        }
        this.handleToggle = this.handleToggle.bind(this); 
    }

    handleToggle() { 
        this.setState((prevState) => {
            return {
                visible: !prevState.visible
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggle}>{this.state.visible ? 'Hide' : 'Show'}</button>
                {this.state.visible ? <p>Lorem Ipsum</p> : <p></p>}
            </div>
        );
    }
}

ReactDOM.render(<Visible />, document.getElementById('app'));