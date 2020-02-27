import React from 'react'
import { Steps } from 'antd'

import './TicketsSteps.scss'

function TicketsSteps({ current = 0, stepsInfo=[{}]}) {

    let comp=[];
    stepsInfo.forEach((step) => {
        comp.push(
            <Steps.Step title={step.title} subTitle={step.subTitle} status={step.status} />
        )
    })

    return (
        <div className="TicketsSteps">
            <div className="TicketsSteps__steps">
                <Steps current={current} >
                    {comp}
                </Steps>
            </div>
        </div>

    );
}

export default TicketsSteps