/* eslint-disable react/prop-types */
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImg/Img';
import avtar from '../../../images/avatar.png'
import { useSelector } from "react-redux";
import './cast.scss'

const Cast = ({data, loading}) => {

    // console.log('topCast Data', data?.length);

    const {url} = useSelector((state)=>state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

  return (
    <div className='castSection'>
        <ContentWrapper>
            {
                data?.length > 0 ? ( <div className="sectionHeading">Top Cast</div>) : (<> </>)
            }

            {
                !loading ? (
                    <div className="listItems">
                        {
                            data?.map((item)=>{
                                let imgUrl = item.profile_path ? url.profile + item.profile_path : avtar
                                return(
                                    <div key={item.id} className='listItem'>
                                        <div className="profileImg">
                                            <Img src={imgUrl} />
                                        </div>
                                        <div className="name">{item.name}</div>
                                        <div className="character">{item.character}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )
            }
        </ContentWrapper>
    </div>
  )
}

export default Cast