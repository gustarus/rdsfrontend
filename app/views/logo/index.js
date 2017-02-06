import icon from './index.svg'
import style from './style.styl'

export default class extends React.Component {

  render() {
    return <div className={style.container} dangerouslySetInnerHTML={{__html: icon}}/>;
  }
}
