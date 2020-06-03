class Counter extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            name: 'Ian'
        };
        this.handleAddOne = this.handleAddOne.bind(this); 
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('count'); 
            const count = JSON.parse(json); 

            if(!isNaN(count)) {
                this.setState(() => ({ count }));
            }
        } catch(e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.count !== this.state.count) {
            const json = JSON.stringify(this.state.count); 
            localStorage.setItem('count', json);
        } 
    }
    
    handleAddOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });
    }

    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        });
    }

    handleReset() {
        // this.setState((prevState) => {
        //     return {
        //         count: 0
        //     }
        // });
        this.setState({
            count: 0
        });
    }
    
    render() {
        return (
            <div>
                {this.state.name}
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));

// let count = 0;
// const addOne = () => {
//     count += 1;
//     renderCounterApp() 
//     return count
// }
// const minusOne = () => {
//     count -= 1;
//     renderCounterApp() 
//     return count
// }
// const reset = () => {
//     count = 0;
//     renderCounterApp()  
//     return count
// }

// const template2 = ( 
//     <div>
//         <h1>Count: {count}</h1>
//         <button onClick={addOne}>+1</button>
//         <button onClick={minusOne}>-1</button>
//         <button onClick={reset}>0</button>
//     </div>
// );
// console.log(template2)

// const appRoot = document.getElementById('app');
// const testRoot = document.getElementById('test');

// ReactDOM.render(template, appRoot); 

// const renderCounterApp = () => {
//     const template2 = ( 
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>0</button>
//         </div>
//     );

//     ReactDOM.render(template2, testRoot); 
// };
// renderCounterApp()


