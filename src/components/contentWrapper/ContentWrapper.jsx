/* eslint-disable react/prop-types */
import './style.scss';
const ContentWrapper = ({children}) => {
  return (
    <div className='content_Wrapper'>
        {children}
    </div>
  )
}

export default ContentWrapper