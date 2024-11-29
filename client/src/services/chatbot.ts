export interface NavigationFunction {
  name: string
  description: string
}

export const chatbotTools = [
  {
    type: 'function',
    function: {
      name: 'navigate_to_page',
      description: 'Navigate to a specific page in the Vuber application',
      parameters: {
        type: 'object',
        properties: {
          page: {
            type: 'string',
            enum: [
              '/track',
              '/profile',
              '/order',
              '/faq',
              '/contact-us',
              '/about',
              '/signup',
              '/signin',
              '/',
            ],
            description: 'The page to navigate to',
          },
        },
        required: ['page'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'track_order',
      description: 'Track the status of an order by its ID',
      parameters: {
        type: 'object',
        properties: {
          order_id: {
            type: 'number',
            description: 'The ID of the order to track',
          },
        },
        required: ['order_id'],
      },
    },
  },
]
