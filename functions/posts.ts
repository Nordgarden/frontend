import { Handler, HandlerEvent } from '@netlify/functions'

import fetch from './utils/fetch'
import getUrl from './utils/getUrl'
import type { IPostListItem } from '~~/types/IContent'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const page = event.queryStringParameters?.page
    const url = getUrl({
      page,
      type: 'posts',
      fields: ['title', 'excerpt', 'date', 'slug'],
      image: true
    })

    const data = await fetch<
      {
        title: {
          rendered: string;
        };
        excerpt: {
          rendered: string;
        };
        except: string;
        date: string;
        slug: string;
      }[]
    >(url)
    const body: IPostListItem[] = data.map((item) => {
      return {
        title: item.title.rendered,
        slug: item.slug,
        excerpt: item.excerpt.rendered,
        date: item.date
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } catch (error) {
    let message = 'Error'
    if ((error instanceof Error)) {
      message = error.message
    }
    return {
      statusCode: 400,
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}

export { handler }
