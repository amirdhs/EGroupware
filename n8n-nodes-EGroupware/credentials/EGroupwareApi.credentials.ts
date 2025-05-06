import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class EGroupwareApi implements ICredentialType {
	name = 'eGroupwareApi';
	displayName = 'EGroupware API';
	properties = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string' as NodePropertyTypes,
			default: '',
			placeholder: 'https://your-egroupware-instance/egroupware/groupdav.php',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string' as NodePropertyTypes,
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
