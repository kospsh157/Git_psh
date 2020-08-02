const root = document.getElementById('root');

class Test extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedNumber: 1
    }
    
    this.handleClick = this.handleClick.bind(this); // 앞의 this와 (this)는 무엇을 가르키는지?
  }
  
  handleClick(e){
    const isDivTag = e.target.tagName.toLowerCase() === 'div' ? true : false
    let target = null;
    if(isDivTag){
      target = e.target;
    }else{
      target = e.target.parentElement;
    }
    
    target.getElementsByTagName('input')[0].checked = true;
    this.setState({
      selectedNumber: target.getElementsByTagName('input')[0].value
    });
  }
  
  render(){
    return (
      <div>
        <div>
          {this.props.title}
        </div>
        <form>
          <div onClick={this.handleClick}>
            <input type="radio" name="test" value="1"/>
            <label for="1">1</label> 
          </div>
          <div onClick={this.handleClick}>
            <input type="radio" name="test" value="2"/>
            <label for="2">2</label> 
          </div>
          <div onClick={this.handleClick}>
            <input type="radio" name="test" value="3"/>
            <label for="3">3</label> 
          </div>
          <div onClick={this.handleClick}>
            <input type="radio" name="test" value="4"/>
            <label for="4">4</label> 
          </div>
        </form>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(){
    super();
    
    this.state = {
      title: 'hello'
    }
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    this.setState({
      title: 'hi'
    })
  }
  
  render(){
    return (
      <div>
        <button onClick={this.handleClick}>click me</button>
       <Test title={this.state.title}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, root);const root = document.getElementById('root');

class Test extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedNumber: 1
    }
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    const isDivTag = e.target.tagName.toLowerCase() === 'div' ? true : false
    let target = null;
    if(isDivTag){
      target = e.target;
    }else{
      target = e.target.parentElement;
    }
    
    target.getElementsByTagName('input')[0].checked = true;
    this.setState({
      selectedNumber: target.getElementsByTagName('input')[0].value
    });
  }
  
  render(){
    return (
      <div>
        <div>
          {this.props.title}
        </div>
        <form>
          <div onClick={this.handleClick}>
            <input type="radio" name="test" value="1"/>
            <label for="1">1</label> 
          </div>
          <div onClick={this.handleClick}>
            <input type="radio" name="test" value="2"/>
            <label for="2">2</label> 
          </div>
          <div onClick={this.handleClick}>
            <input type="radio" name="test" value="3"/>
            <label for="3">3</label> 
          </div>
          <div onClick={this.handleClick}>
            <input type="radio" name="test" value="4"/>
            <label for="4">4</label> 
          </div>
        </form>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(){
    super();
    
    this.state = {
      title: 'hello'
    }
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    this.setState({
      title: 'hi'
    })
  }
  
  render(){
    return (
      <div>
        <button onClick={this.handleClick}>click me</button>
       <Test title={this.state.title}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, root);