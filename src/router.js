import {Switch} from 'react-router-dom'
import Main from 'layouts/Main'
import RouteWithLayout from 'components/shared/RouteWithLayout'

import Home from 'pages/Home'

const AppRouter = () => (
    <Switch>
        <RouteWithLayout layout={Main} exact path="/" component={Home} />
    </Switch>
)

export default AppRouter
