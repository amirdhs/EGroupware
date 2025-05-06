import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class EGroupware implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'EGroupware',
    name: 'eGroupware',
    group: ['transform'],
    version: 1,
    description: 'Interact with EGroupware API',
    defaults: {
      name: 'EGroupware',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'Create Contact',
            value: 'createContact',
          },
        ],
        default: 'createContact',
        description: 'The operation to perform.',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the contact',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        description: 'Email address of the contact',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number of the contact',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const name = this.getNodeParameter('name', i) as string;
      const email = this.getNodeParameter('email', i) as string;
      const phone = this.getNodeParameter('phone', i) as string;

      const body = {
        name,
        email,
        phone,
      };

      const response = await this.helpers.request({
        method: 'POST',
        uri: 'https://your-egroupware-instance/egroupware/groupdav.php/addressbook/',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body,
        json: true,
        auth: {
          user: 'your-username',
          pass: 'your-password',
        },
      });

      returnData.push({ json: response });
    }

    return [returnData];
  }
}
