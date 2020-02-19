import React from 'react'
import {Row, Col, Typography} from 'antd'
import {
    FacebookIcon, FacebookShareButton,
    TwitterIcon, TwitterShareButton,
    WhatsappIcon, WhatsappShareButton,
    EmailIcon, EmailShareButton,
    PinterestIcon, PinterestShareButton
} from 'react-share'
import {useMedia} from 'react-use'

import './ShareButtons.scss'

function ShareButtons({url=''}){

    const mobile = useMedia('(max-width: 900px)')
    return (
        // <div className="ShareButtons__shareDiv">
        //         <Row>
        //             <Col span={4}>
        //                 <FacebookShareButton url={url} className="ShareButtons__shareButton">
        //                     <FacebookIcon size={32} round={true} className="ShareButtons__pointer"/>
        //                     <Typography.Text className="ShareButtons__shareText ShareButtons__pointer" >Share</Typography.Text>
        //                 </FacebookShareButton>

        //             </Col>
        //             <Col span={4}>
        //                 <TwitterShareButton url={url} className="ShareButtons__shareButton">
        //                     <TwitterIcon size={32} round={true} className="ShareButtons__pointer"/>
        //                     <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Tweet</Typography.Text>
        //                 </TwitterShareButton>
        //             </Col>
        //             <Col span={4}>
        //                 <WhatsappShareButton url={url} className="ShareButtons__shareButton">
        //                     <WhatsappIcon size={32} round={true} className="ShareButtons__pointer"/>
        //                     <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">WhatsApp</Typography.Text>
        //                 </WhatsappShareButton>
        //             </Col>
        //             <Col span={1}></Col>
        //             <Col span={4}>
        //                 <PinterestShareButton url={url} className="ShareButtons__shareButton">
        //                     <PinterestIcon size={32} round={true} className="ShareButtons__pointer"/>
        //                     <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Pinterest</Typography.Text>
        //                 </PinterestShareButton>
        //             </Col>
        //             <Col span={1}></Col>
        //             <Col span={4}>
        //                 <EmailShareButton url={url} className="ShareButtons__shareButton">
        //                     <EmailIcon size={32} round={true} className="ShareButtons__pointer"/>
        //                     <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Send</Typography.Text>
        //                 </EmailShareButton>
        //             </Col>
                    
        //         </Row>
        //     </div>

        <div style={{display: 'flex', justifyContent: mobile ? 'flex-start' : 'center', flexWrap: 'wrap'}}>
                        <FacebookShareButton url={url} className="ShareButtons__shareButton ShareButtons__shareDiv">
                            <FacebookIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer" >Share</Typography.Text>
                        </FacebookShareButton>
                        <TwitterShareButton url={url} className="ShareButtons__shareButton ShareButtons__shareDiv">
                            <TwitterIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Tweet</Typography.Text>
                        </TwitterShareButton>
                        <WhatsappShareButton url={url} className="ShareButtons__shareButton ShareButtons__shareDiv">
                            <WhatsappIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">WhatsApp</Typography.Text>
                        </WhatsappShareButton>
                        <EmailShareButton url={url} className="ShareButtons__shareButton ShareButtons__shareDiv">
                            <EmailIcon size={32} round={true} className="ShareButtons__pointer"/>
                            <Typography.Text className="ShareButtons__shareText ShareButtons__pointer">Send</Typography.Text>
                        </EmailShareButton>
        </div>
    );
}

export default ShareButtons