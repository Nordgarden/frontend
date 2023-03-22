import { Handler, HandlerEvent } from '@netlify/functions'

import fetch from './utils/fetch'
import getUrl from './utils/getUrl'
import type { IPost } from '~~/types/IContent'
import type { ISEO } from '~~/types/ISEO'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const slug = event.queryStringParameters?.slug
    const url = getUrl({
      slug,
      type: 'posts',
      fields: ['title', 'content', 'yoast_head_json', 'date'],
      image: true
    })

    const data = await fetch<
      {
        title: {
          rendered: string;
        };
        content: {
          rendered: string;
        };
        yoast_head_json: ISEO;
        date: string;
      }[]
    >(url)
    const body: IPost = {
      title: data[0].title.rendered,
      content: data[0].content.rendered,
      seo: data[0].yoast_head_json,
      date: data[0].date,
      featuredImage: null
    }

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}

export { handler }
