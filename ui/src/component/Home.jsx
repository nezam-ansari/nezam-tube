import react, { useState } from 'react';
import styled from 'styled-components';
import VideoDetails from './VideoDetail';
import image from '../background1.jpg';
import { Watch } from 'react-loader-spinner'


const Container = styled.div`
width: 100%;
height: 100vh;
background: url(${image});
background-size: cover;
`;

const SubContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const InputSection = styled.div`
width: 50%;
display: flex;
@media screen and (max-width: 780px) {
    width: 80%;
  }
`;

const InputBox = styled.input`
width: 80%;
height: 60px;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
padding: 0 10px;
font-size: 18px;
@media screen and (max-width: 780px) {
  }
`;

const DownloadButton = styled.button`
height: 64px;
width: 20%;
font-size: 30px;
background-color: #f30d37;
border-bottom-right-radius: 5px;
border-top-right-radius: 5px;
color: #fbf9f9;
font-family: sans-serif;
@media screen and (max-width: 780px) {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
`;

const Heading = styled.h1`
font-size: 40px;
font-family: sans-serif;
color: #fdfcfc;
margin: 10px;
`;

const VideoInfo = styled.div`
width: 60%;
margin-top: 40px;
@media screen and (max-width: 780px) {
    width: auto;
  }
`;

const Logo = styled.div`
width: 90%;
font-size: 25px;
color: #fdfcfc;
font-family: sans-serif;
text-align: left;
margin: 20px;
`;

const Home = () => {
    const [link, setLink] = useState('');
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(false);

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    }

    const handleOnClick = (e) => {
        setLoading(true);
        fetch(`http://localhost:4000/video-detail?URL=${link}`, {
            method: 'GET'
        }).then(res => res.json())
            .then(json => {
                setDetail(json);
                setLoading(false);
            });
    }

    return (
        <Container>
            <SubContainer>
            <Logo>
                <i className="fas fa-download" style={{ marginRight: 10, color: '#f90808' }} />
                nezam-tube
            </Logo>
                <Heading>Online Youtube Video Downloader</Heading>
                <InputSection>
                    <InputBox placeholder='Paste your video link here' onChange={handleLinkChange} />
                    <DownloadButton onClick={handleOnClick}>Go
                        <i className="fas fa-arrow-right" style={{ marginLeft: 10 }} />
                    </DownloadButton>
                </InputSection>
                <VideoInfo>
                    {loading && <Watch
                        height="180"
                        width="180"
                        radius="48"
                        color="#f30d37"
                        ariaLabel="watch-loading"
                        wrapperStyle={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgb(84 83 83 / 70%)', zIndex: 9999, justifyContent: 'center', alignItems: 'center'}}
                        wrapperClassName=""
                        visible={true}
                    />}
                    {Object.keys(detail).length > 0 && <VideoDetails link={link} detail={detail} />}
                </VideoInfo>
            </SubContainer>
        </Container>
    )
}

export default Home;