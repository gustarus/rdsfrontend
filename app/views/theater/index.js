import style from './style.styl'

export default class extends React.Component {

  render() {
    return <div className={style.container}>{this.props.children}</div>;
  }
}
