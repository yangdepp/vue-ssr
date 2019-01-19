import className from '../../assets/style/footer.less';

export default {
  data() {
    return {
      author: 'Yang'
    }
  },
  render() {
    return (
      <div id={className.footer}>
        <span> Written By {this.author}</span>
      </div>
    )
  }
}