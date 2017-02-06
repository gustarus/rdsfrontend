import style from './style.styl';

let isFrameTriggered = false;
export default class extends React.Component {

  constructor(options) {
    super(options);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    this.delegate();
  }

  componentWillUpdate() {
    this.undelegate();
  }

  componentDidUpdate() {
    this.delegate();
  }

  componentWillUpdate() {
    this.undelegate();
  }

  render() {
    return <div className={style.container}>
      <div/>
    </div>;
  }

  delegate() {
    if (!isFrameTriggered) { // if this is first time method call
      isFrameTriggered = true;
      var tag = document.createElement('script');

      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        this.delegatePlayer();
        this.delegateResize();
      };
    } else {
      this.delegatePlayer();
      this.delegateResize();
    }
  }

  undelegate() {
    this.undelegateResize();
    this.undelegatePlayer();
  }

  delegatePlayer() {
    this.initializePlayer();
    this.resizePlayer();
  }

  undelegatePlayer() {
    this.player.destroy();
  }

  delegateResize() {
    window.addEventListener('resize', this.onWindowResize);
  }

  undelegateResize() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onPlayerReady(e) {
    this.player.setVolume(0);
    this.player.setPlaybackQuality(this.props.quality);
  }

  onPlayerStateChange(e) {
    switch (e.data) {
      case YT.PlayerState.BUFFERING:
        break;

      case YT.PlayerState.PLAYING:
        break;

      case YT.PlayerState.ENDED:
        this.player.seekTo(this.props.start);
        this.player.playVideo();
        break;
    }
  }

  onWindowResize(e) {
    this.resizePlayer();
  }

  initializePlayer() {
    let el = ReactDOM.findDOMNode(this);
    this.player = new YT.Player(el.children[0], {
      videoId: this.props.id,
      playerVars: {
        start: this.props.start,
        end: this.props.end,
        autoplay: 1,
        autohide: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        showinfo: 0,
        loop: 1
      },

      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      }
    });
  }

  resizePlayer() {
    let el = ReactDOM.findDOMNode(this);

    let width = el.clientWidth;
    let height = el.clientWidth / this.props.ratio;

    if (height < el.clientHeight) {
      let k = el.clientHeight / height;
      width = width * k;
      height = height * k;
    }

    el.style.top = height > el.clientHeight ? `${(el.clientHeight - height) / 2}px` : 0;
    el.style.left = width > el.clientWidth ? `${(el.clientWidth - width) / 2}px` : 0;

    this.player.setSize(width, height);
  }
}
