import React from 'react'
import pages from '../pages/index'
import Header from '../parts/header/'
function RouterConfig(isAuth) {
    return [
        {
            path: '/', element: <Header />, children: pages(isAuth)
        }
    ]


}

export default RouterConfig
