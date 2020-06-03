// live-server ./public --port=8080
// babel ./src/playground/counter-example.js -o ./public/scripts/app.js --presets=env,react -w

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            subTitle: 'Put your life in the hands of a computer', 
            options: props.options
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDeleteSingle = this.handleDeleteSingle.bind(this);
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json); 
            if(options) {
                this.setState(() => ({ options }));
            }
        } catch(e) {
            // Do nothing at all
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options); 
            localStorage.setItem('options', json);
        }
        console.log('componentDidUpdate');
    }
    componentWillUnmount() {
        console.log('consoleWillUnmount');
    }
    
    handleAdd(option) {
        if(!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        } 
        
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    }

    handleDelete() {
        this.setState(() => ({ options: [ ] }));
    }

    handleDeleteSingle(option) {
        this.setState((prevState) => ({ 
            options: prevState.options.filter((item) => {
                return item !== option;
            })
        }));
    }

    handlePick() {
        const randIndex = Math.floor(Math.random() * this.state.options.length); 
        alert(this.state.options[randIndex]);
    }

    render() {
        return (
            <div>
                <Header subTitle={this.state.subTitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDelete={this.handleDelete}
                    handleDeleteSingle={this.handleDeleteSingle}
                />
                <AddOption 
                    handleAdd={this.handleAdd}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision App'
};

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick} 
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            {
                props.options.map((option) => (
                    <Option 
                        key={option} 
                        text={option}
                        handleDeleteSingle={props.handleDeleteSingle}
                    />
                ))
            }
            <button onClick={props.handleDelete}>Remove All</button>
        </div>
    );   
}

const Option = (props) => {
    return (
        <div>
            {props.text}
            <button 
                onClick={(e) => {
                    props.handleDeleteSingle(props.text);
                }}
            >
                Remove
            </button>
        </div>
    );   
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        };
        this.handleAddOption = this.handleAddOption.bind(this);
    }
    
    handleAddOption(e) {
        e.preventDefault(); 

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAdd(option);
        this.setState(() => ({ error }));

        if(!error) {
           e.target.elements.option.value = '';
        }
    }
    
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name='option'></input>
                    <button>Add Option</button>
                </form>    
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp options={['devils den', 'second district']}/>, document.getElementById('app')); 