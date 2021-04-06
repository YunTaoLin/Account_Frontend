import React from "react";
import styled from "styled-components";
import {$color_2} from '../../scss/styled'
const svg = `<svg
version="1.1"
id="loader-1"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
x="0px"
y="0px"
width="40px"
height="40px"
viewBox="0 0 50 50"
style="enable-background:new 0 0 50 50;"
xml:space="preserve"
>
<path
  fill="#000"
  d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
>
  <animateTransform
    attributeType="xml"
    attributeName="transform"
    type="rotate"
    from="0 25 25"
    to="360 25 25"
    dur="0.6s"
    repeatCount="indefinite"
  />
</path>
</svg>`

const index = () => {
  return (
    <ApiWait>
      <div className="loader loader--style2" title="1"
        dangerouslySetInnerHTML={{__html:svg}}
      >
        
      </div>
    </ApiWait>
  );
};

export default index;

const ApiWait = styled.div`
width:100vw;
    height:100vh;
    background-color: rgba(200,200,200,.8);
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
    svg{
        transform:scale(2);
    }
  svg path,
    svg rect{
    fill: ${$color_2};
    }
`;
