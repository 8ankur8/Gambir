import styled from 'styled-components'

const TopLeft = styled.div`
  position: absolute;
  top: 6vw;
  left: 6vw;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  color: #999999;
  font-size: min(5vw, 3em);
  line-height: 0.9em;
`

const BottomLeft = styled.div`
  position: absolute;
  bottom: 6vw;
  color: #999999;
  left: 6vw;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: min(15vw, 20em);
  line-height: 0.9em;
`

const BottomRight = styled.div`
  position: absolute;
  bottom: 6vw;
  right: 6vw;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  text-align: right;
`

const LeftMiddle = styled.div`
  position: absolute;
  bottom: 50%;
  color: #999999;
  right: 6vw;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
`

const Bar = styled.div`
  position: absolute;
  top: ${(props) => (props.vertical ? '0px' : '50%')};
  left: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '150px')};
  height: ${(props) => (props.vertical ? '150px' : '2px')};
  background: #999999;
`

const Hamburger = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 6vw;
  right: 6vw;
  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: #999999;
    margin-bottom: 6px;
  }
`

export default function Underlay() {
  return (
    <div>
      <TopLeft>
        NoCapMeta
      </TopLeft>
      <BottomLeft>M</BottomLeft>
      <LeftMiddle>A flight of Reality</LeftMiddle>
      <Hamburger>
        <div />
        <div />
        <div />
      </Hamburger>
      <Bar />
      <Bar vertical />
    </div>
  )
}
