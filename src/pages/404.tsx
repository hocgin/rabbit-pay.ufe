import {Redirect} from '@hocgin/ui'

export default () => {
  let style = {flex: 1, display: 'flex', alignItems: 'center'};
  return <div style={style}>
    <Redirect redirectUrl={'https://cdn.hocgin.top/404'}/>
  </div>
};
