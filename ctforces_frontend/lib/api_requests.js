import fetch from 'isomorphic-unfetch';
import { api_url } from '../config';
import redirect from '../lib/redirect';
import getCookie from './get_cookie';

export async function get(path, data, ctx) {
    try {
        let query = data
            ? Object.keys(data)
                  .map(
                      k =>
                          encodeURIComponent(k) +
                          '=' +
                          encodeURIComponent(data[k])
                  )
                  .join('&')
            : '';
        if (query !== '') {
            query = '?' + query;
        }
        let result = await fetch(`${api_url}/${path}/${query}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            qs: data
        });
        if (result.status == 404) {
            redirect('404', ctx);
        } else {
            return result;
        }
    } catch (e) {
        redirect('oops', ctx);
    }
}

export async function post(path, data, ctx) {
    try {
        let result = await fetch(`${api_url}/${path}/`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        if (result.status == 404) {
            redirect('404', ctx);
        } else {
            return result;
        }
    } catch (e) {
        redirect('oops', ctx);
    }
}
