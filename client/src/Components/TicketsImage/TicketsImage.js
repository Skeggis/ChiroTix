import React, { Fragment } from 'react'

import './TicketsImage.scss'
import Loader from '../Loader/Loader'

function TicketsImage({ imageUrl = '', title = '', subTitle = '', loading = false }) {




    return (
        <Fragment>

            <div className="TicketsImage">
                <div className='TicketsImage__test'>

                    <div className='TicketsImage__defaultImage' style={{ backgroundImage: `url(${imageUrl})` }} >
                    </div>
                </div>
                <div className="TicketsImage__content">
                    {loading ? (
                        <div>
                            <Loader />
                        </div>
                    ) : (
                            <Fragment>

                                <h1 className="TicketsImage__eventName">
                                    {title}
                                </h1>
                                <h3 className="TicketsImage__date">
                                    {subTitle}
                                </h3>
                            </Fragment>
                        )}
                </div>
            </div>
        </Fragment>
    );
}

export default TicketsImage