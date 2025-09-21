import { request, type APIRequestContext } from 'playwright';
import { faker } from '@faker-js/faker';

export async function registerUser() {
  const requestContext: APIRequestContext = await request.newContext();

  const email = faker.internet.email();
  const password = faker.internet.password();

  const response = await requestContext.post(
    'https://api.club-administration.qa.qubika.com/api/auth/register',
    {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password,
        roles: ['ROLE_ADMIN']
      }
    }
  );

  if (response.status() !== 201) {
    const text = await response.text();
    await requestContext.dispose();
    throw new Error(
      `Failed to create user. Expected 201, but got ${response.status()}.\nResponse: ${text}`
    );
  }
  
  console.log(`Registered user: ${email}`);
  await requestContext.dispose();
  return { email, password};
}
