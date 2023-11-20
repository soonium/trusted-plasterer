// fitter.ts
export default {
    name: 'fitter',
    title: 'Fitter',
    type: 'document',
    fields: [
        {
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
        },
        {
            name: 'fitterName',
            title: 'Fitter Name',
            type: 'string',
            validation: Rule => Rule.required().error('Fitter Name is required.'),
        },
        {
            name: 'phoneNumber',
            title: 'Phone Number',
            type: 'string',
            validation: Rule => Rule.regex(/^(0[1-9]{1}[0-9]{8,9})$/, 'Please enter a valid UK phone number.')
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: Rule => Rule.email().required().error('A valid email is required.'),
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: Rule => Rule.required().error('Location is required.'),
        },
        {
            name: 'mapURL',
            title: 'Map URL',
            type: 'url',
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'X', value: 'x' },
                                ],
                                layout: 'radio',
                            },
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        },
                    ],
                },
            ],
            validation: Rule => Rule.max(3).warning('You can only add up to 3 social links.'),
        },
        {
            name: 'areasServiced',
            title: 'Areas Serviced',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                        },
                        {
                            name: 'postcode',
                            title: 'Postcode',
                            type: 'string',
                            validation: Rule => Rule.regex(/^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?/, 'Please enter a valid UK postcode.'),
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'string',
                        }
                    ],
                },
            ],
            validation: Rule => Rule.unique().max(10).warning('You can only add up to 10 unique areas.'),
        },
    ],
    preview: {
        select: {
          title: 'fitterName',
          subtitle: 'location',
        },
    }
}