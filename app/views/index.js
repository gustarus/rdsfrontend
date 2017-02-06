import Theater from './theater'
import Video from './video'
import Logo from './logo'

export default class extends React.Component {

  render() {
    return (
      <Theater>
        <Video id="R5l4MghKGEA" ratio={1.777777} start={27} end={236}/>
        <Logo/>
      </Theater>
    );
  }
}
