<<<<<<< HEAD
import { Handler, HandlerEvent } from '@netlify/functions'

import fetch from './utils/fetch'
import getUrl from './utils/getUrl'
import type { IPage } from '~~/types/IContent'
import type { ISEO } from '~~/types/ISEO'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const id = event.queryStringParameters?.id

    const url = getUrl({
      id,
      type: 'pages',
      fields: ['title', 'content', 'yoast_head_json']
    })
=======
import { Handler, HandlerEvent } from "@netlify/functions";

import fetch from "./utils/fetch";
import getUrl from "./utils/getUrl";
import type { IPage } from "~~/types/IContent";
import type { ISEO } from "~~/types/ISEO";

const handler: Handler = async (event: HandlerEvent) => {
  try {
    const id = event.queryStringParameters?.id;

    const url = getUrl({
      id,
      type: "pages",
      fields: ["title", "content", "yoast_head_json"],
    });
>>>>>>> master

    const data = await fetch<{
      title: {
        rendered: string;
      };
      content: {
        rendered: string;
      };
      yoast_head_json: ISEO;
<<<<<<< HEAD
    }>(url)
    const body: IPage = {
      title: data.title.rendered,
      content: data.content.rendered,
      seo: data.yoast_head_json
    }
=======
    }>(url);
    const body: IPage = {
      title: data.title.rendered,
      content: data.content.rendered,
      seo: data.yoast_head_json,
    };
>>>>>>> master

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
<<<<<<< HEAD
        'Content-Type': 'application/json'
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error, couldnt connect.' }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}

export { handler }
=======
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error, couldnt connect." }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export { handler };
>>>>>>> master
