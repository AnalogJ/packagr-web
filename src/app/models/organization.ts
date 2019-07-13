export class Organization {
  id: string = ''; //internal SCM id (number or name)
  slug: string = ''; // url/api safe identifier for SCM (usually derived from name)
  name: string = ''; // display name
  description: string = '';
  installationId: string = '';
  installationUrl: string = '';
  imageUrl: string = '';
  url: string = '';
  type: string = '';
  updatedAt: string = '';
}
