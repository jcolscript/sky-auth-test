import faker from 'faker';
import factory from 'factory-girl';

import User from '../src/app/models/User';

faker.locale = 'pt_BR';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phones: [
    {
      area: faker.random.number({ min: 10, max: 99 }),
      number: faker.random.number({ min: 81111111, max: 99999999 }),
    },
  ],
});

export default factory;
