import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const RouteWithLayout = (props) => {
  const { layout: Layout, title, component: Component, connection, ...rest } = props

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout title={title}>
          <Component {...matchProps} connection={connection} />
        </Layout>
      )}
    />
  )
}

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
}

export default RouteWithLayout
