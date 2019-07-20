import React from 'react'
import ReactDOM from 'react-dom'
import largeNumber from 'large-number'
import logo from './images/logo.png'
import './search.less'
import '../common/common.js'

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Text: null,
    }
    this.loadComponent = this.loadComponent.bind(this)
  }

  loadComponent() {
    console.log('12222222')
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      })
    })
  }

  render() {
    const { Text } = this.state
    const addResult = largeNumber(
      '999999999999999999999999999999999999999999999999999999',
      '1'
    )
    return (
      <div className="search-text">
        {Text ? <Text /> : null}
        {addResult}
        搜索文字的内容
        <img alt="" src={logo} onClick={this.loadComponent} />
      </div>
    )
  }
}

ReactDOM.render(<Search />, document.getElementById('root'))
