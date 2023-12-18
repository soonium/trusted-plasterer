

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
            validation: (Rule: any) => Rule.required().error('Fitter Name is required.'),
        },
        {
            name: 'phoneNumber',
            title: 'Phone Number',
            type: 'string',
            validation: (Rule: any) => Rule.regex(/^(0[1-9]{1}[0-9]{8,9})$/, 'Please enter a valid UK phone number.')
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule: any) => Rule.email().required().error('A valid email is required.'),
        },
        {
          name: 'fitterMugShot',
          title: 'Fitter Mug Shot',
          type: 'image',
          validation: (Rule: any) => Rule.custom((field: any, context: any) => {
            if (field.asset) {
              return context.fetch(`*[reference("${field.asset._ref}")][0]`).then((asset: any) => {
                const sizeInMb = asset.size / 1024 / 1024;
                if (sizeInMb > 2) { // Limit file size to 2MB
                  return 'File size is too large. Please upload an image less than 2MB.';
                }
                return true;
              });
            }
            return true;
          })
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule: any) => Rule.required().error('Location is required.'),
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
            validation: (Rule: any) => Rule.max(3).warning('You can only add up to 3 social links.'),
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
                            validation: (Rule: any) => Rule.regex(/^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?/, 'Please enter a valid UK postcode.'),
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'string',
                        }
                    ],
                },
            ],
            validation: (Rule: any) => Rule.unique().max(10).warning('You can only add up to 10 unique areas.'),
        },
    ],
    preview: {
        select: {
          title: 'fitterName',
          subtitle: 'location',
        },
    }
}