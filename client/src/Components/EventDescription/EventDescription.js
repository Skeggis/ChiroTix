import React from 'react'
import { Typography, Row, Col, List, Tag, Skeleton } from 'antd'

import './EventDescription.scss'

function EventDescription({ description = '', speakers = [], tags = [], loading = true }) {

    let speakersItems = []
    for (let i = 0; i < 1; i++) {
        speakers.forEach(speaker =>
            speakersItems.push(<div className="EventDescription__speakerDiv">
                <a className="EventDescription__speakerDiv">
                    <img className="EventDescription__speakerImage" alt="" src={speaker.image} />
                    <h4>
                        {speaker.name}
                    </h4>
                </a>
            </div>
            )
        )
    }
    return (
        <div className="EventDescription">
            <div className="EventDescription__descriptionDiv">
                <h3>
                    Description:
                </h3>
                <p className="EventDescription__description">
                    {loading ? (
                        <Skeleton active />
                    ) : (
                            description
                        )}
                </p>
            </div>

            <h3>
                Speakers:
            </h3>
            <div className="EventDescription__speakersDiv">
                {loading ? (
                    [...Array(3)].map((e, i) => (
                        <Skeleton active avatar />
                    ))
                ) : (
                        speakersItems
                    )}
                {/* {speakers.map(speaker => <div className="EventDescription__speakerDiv">
                    <div className="EventDescription__speakerDiv">
                        <img className="EventDescription__speakerImage" alt="" src={speaker.image} />
                        <h4>
                            {speaker.name}
                        </h4>
                    </div>
                </div>
                )
                } */}
            </div>

            {!loading && (
                <div className="EventDescription__tagsDiv">

                    <div className="EventDescription_tags">
                        {tags.map(tag =>
                            <Tag color="geekblue">{tag.name}</Tag>
                        )
                        }
                    </div>

                </div>
            )}
        </div>

    );
}

export default EventDescription