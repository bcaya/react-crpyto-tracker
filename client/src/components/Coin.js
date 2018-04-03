import React, { Fragment } from 'react';
import { 
  Grid, 
  Card, 
  Header, 
  Segment,
  Loader,
  Dimmer,
  Container, 
  Divider, 
} from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
} from 'recharts'; 

class Coin extends React.Component {
  state = { coin: {} }

  componentDidMount() {
    const {
      dispatch,
      match: { params: { id }}
    } = this.props;
    axios.get(`/api/coins/${id}`)
      .then(({ data, headers }) => {
        dispatch(setHeaders(headers))
        this.setState({ coin: data })
      })
  }

  render() {
    const { coin } = this.state;
    return (
      <Fragment>
        { coin.id ?
         <Container>
          <Divider hidden/>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={6}>
                <Card>
                  <Card.Content header={coin.name} />
                  <Card.Content
                    description={`$${coin.price_usd}`}
                  />
                  <Card.Content
                    description={`${coin.price_btc} BTC`}
                  />
                  <Card.Content extra>
                    <p>Rank: {coin.rank}</p>
                    <p>Symbol: {coin.symbol}</p>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header as={"h1"}>
                  {coin.name} Historical Data 
                </Header>
                <AreaChart 
                  height={400}
                  width={800}
                  data={this.formatData()}
                >
                <XAxis dataKey="time" />
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip/>
                <Area 
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  fill="##D5E3A4"
                  />
                </AreaChart>
              </Grid.Column>
            </Grid.Row>
          </Grid>
         </Container> 
          :
          <Segment style={{ height: '100vh' }}>
            <Dimmer active>
              <Loader size="huge" />
            </Dimmer>
          </Segment>
        }
      </Fragment>
    )
  }
}

export default connect()(Coin)