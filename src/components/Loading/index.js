import React from 'react';
import styled from 'styled-components'
import title from '../../asset/title.png'
import loadingimg from '../../asset/Thin fading line.gif'
import { connect } from "react-redux";
const Index = (props) => {
    return (
        <Loading style={{opacity:( props.data.loadingStatus.loading?1:0),
            visibility:( props.data.loadingStatus.loading?'visible':'hidden')
          }}>
            <div className="title">
                <img src={title} alt=""/>   
            </div>
            <div className="loading">
                <img src={loadingimg} alt=""/>
            </div>
        </Loading>
    )
}

export default connect (
    state => ({data: state }), 
  )(Index);

const Loading = styled.div`
    width:100vw;
    height:100vh;
    background-color: #fefefe;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:99999999;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    transition:.3s;
    .title{
        width:70%;
        img{
            width:100%;
        }
    }
    .loading{
        width:60%;
        margin-bottom:10vh;
        img{
            width:100%;
        }
    }
`
