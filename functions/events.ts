import { Handler } from '@netlify/functions'

import fetch from './utils/fetch'
import { IEvent, IEventResponse } from '~~/types/IEvent'

const url =
  'https://rest.bandsintown.com/artists/Nordgarden/events?app_id=TerjeNordgardenWebsite'
const handler: Handler = async (_) => {
  const data = await fetch<IEventResponse[]>(url)
  let body: IEvent[] = []

  if (data) {
    body = data.map((event) => {
      return {
        name: event.lineup.name,
        date: new Date(event.datetime).toString(),
        venue:
          event.venue.name !== 'Unknown venue' ? event.venue.name : undefined,
        city: event.venue.city !== 'Unknown' ? event.venue.city : undefined,
        url: event.url
      }
    })
  }
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export { handler }
