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
]
