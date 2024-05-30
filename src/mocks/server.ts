import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  http.get('https://api.tvmaze.com/search/shows', async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    await delay(150);

    return HttpResponse.json([
      {
        show: {
          id: 1,
          name: `Test Show ${query}`,
          summary: 'A test show summary',
        },
      },
    ]);
  }),
];

// Enable API mocking before tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done
afterAll(() => server.close());

export const server = setupServer(...handlers);
