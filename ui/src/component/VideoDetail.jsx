import React, { useState } from 'react';
import { Circles } from 'react-loader-spinner';
import styled from 'styled-components';

const Container = styled.div`
height: 400px;
box-shadow: 5px 10px 16px 0px;
padding: 20px;
background-color: #030036;
@media screen and (max-width: 780px) {
   height:100%;
  }
`;

const SubContainer = styled.div`
display: flex;
flex-direction: row;
position: relative;
@media screen and (max-width: 780px) {
    flex-direction: column;
  }
`;

const DetailSection = styled.div`
width: 40%;
@media screen and (max-width: 780px) {
    width: 100%;
  }
`;

const FormatTable = styled.div`
width: 60%;
overflow-y: scroll;
height: 400px;
@media screen and (max-width: 780px) {
    width: 100%;
  }
`;

const Thumbnail = styled.img`
width: 300px;
height: 250px;
@media screen and (max-width: 780px) {
    width: 100%;
    height: 100%;
  }
`;

const Heading = styled.h2``;

const Title = styled.h2`
font-size: 18px;
color: #fffcfc;
padding: 15px;
font-family: sans-serif;
@media screen and (max-width: 780px) {
    font-size: 35px;
  }
`;

const Table = styled.table`
font-family: arial, sans-serif;
border-collapse: collapse;
width: 100%;
`;

const TR = styled.tr`
border: 1px solid #dddddd;
padding: 8px;
height: 60px;
display:flex;
justify-content: space-around;
`;

const TD = styled.td`
display: flex;
justify-content: space-between;
align-items: center;
width:100%;
`;

const Youtube = styled.div`
display: flex;
align-items: center;
`;

const DownloadButton = styled.button`
width: 150px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
background-color: #f9f8f8;
color: #f90808;
border-radius: 5px;
cursor: pointer;
`;

const VideoFormate = styled.div`
font-weight: 600;
color: #ffffff;
`;

const VideoDetails = ({ detail, link }) => {
    const [loading, setLoading] = useState(false);
    const { thumbnail, videoFormat, videoDetails } = detail;
    const { title } = videoDetails;
    const handleDownload = (value) => {
        setLoading(true);
        fetch(`http://localhost:4000/download?URL=${link}&itag=${value.itag}`, {
            method: 'GET'
        }).then(response => {
            window.location.href = response.url
            setLoading(false);
        })
            .catch(err => console.log(err));
    }

    return (
        <Container>
                {loading && <Circles color="#00BFFF" 
                height={80} 
                width={80} 
                wrapperStyle={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgb(84 83 83 / 70%)', zIndex: 9999, justifyContent: 'center', alignItems: 'center'}}/>}
            <SubContainer>
                <DetailSection>
                    <Thumbnail src={thumbnail} alt={'image'} />
                    <Title>{title}</Title>
                </DetailSection>
                <FormatTable>
                    <Table>
                        <TR>
                            <Youtube>
                                <i className="fab fa-youtube" style={{ color: '#f30d37', fontSize: '30px' }} />
                                <th style={{ color: '#ffffff', fontSize: '25px', marginLeft: 10 }}> Video</th>
                            </Youtube>
                        </TR>
                        {videoFormat && videoFormat.map(val => {
                            return <TR>
                                <TD>
                                    <VideoFormate>
                                        <span>{val.qualityLabel?.slice(0, -1)}</span>.{val.container}
                                        {!val.hasAudio && <i className="fas fa-volume-mute" style={{ marginLeft: 10, color: '#f30d37' }} />}
                                    </VideoFormate>
                                    <DownloadButton onClick={() => handleDownload(val)}>
                                        <i className="fas fa-download" style={{ marginRight: 10 }} />
                                        Download
                                    </DownloadButton>
                                </TD>
                            </TR>
                        })}
                    </Table>
                </FormatTable>
            </SubContainer>
        </Container>
    )
}

export default VideoDetails;