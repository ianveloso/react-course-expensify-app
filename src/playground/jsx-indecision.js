const appRoot = document.getElementById('app');

console.log('App.js is running!');

const app = {
    title: 'Indecision App',
    subtitle: 'Let us make the hard choices',
    options: []
}

const onFormSubmit = (e) => {
    e.preventDefault(); 

    const option = e.target.elements.option.value;
    
    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        
        render()
    }
};

const onRemove = () => {
    app.options = []
    render()
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);   
}

const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {(app.subtitle) && <h2>{app.subtitle}</h2>}
            <p>{(app.options && app.options.length > 0) ? 'Here are your options' : 'No options'}</p>
            <ol>
                {
                    app.options.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type='text' name='option'/>
                <button>Add Option</button>
            </form>
            <button onClick={onRemove}>Remove All</button>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do</button>
        </div>
        );
    
    ReactDOM.render(template, appRoot);
}

const user = {
    name: 'Ian',
    age: '26', 
    location: 'Philadelphia'
}

var template2 = (
<div>
    <h1>{user.name ? user.name : 'Unknown'}</h1>
    <p>Age: {user.age >= 18 ? user.age : 'Underaged'}</p>
    <p>Location: {user.location || 'Unknown'}</p>
</div>
);

render()