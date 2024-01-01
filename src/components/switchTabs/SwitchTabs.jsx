/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import './switchTab.scss'

const SwitchTabs = ({data, onTabChange}) => {
    
    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    // --------------------------------------------------

    const activeTab = (tab, index)=>{

        setLeft(index * 100);

        setTimeout(()=>{
            setSelectedTab(index);
        },300);

        onTabChange(tab, index);
    }

    // --------------------------------------------------

  return (
    <div className='switchTabs'>
        <div className="tabItems">
            {
                data?.map((tab,index)=>(
                    <span key={index} 
                        className={`tabItem ${selectedTab === index ? "active" : ""} `}
                        onClick={()=>activeTab(tab, index)}
                    >
                        {tab}

                    </span>
                ))
            }
            
            <span className="movingBg" style={{left: left}}>

            </span>
        </div>
    </div>
  )
}

export default SwitchTabs