import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { GetObjectCommand, PutObjectCommand, SpaceClient } from '@did-space/client';
import { streamToString } from '@did-space/core';
import { authService, wallet } from './libs/auth';
import { Profile } from '../../common/types';
import rules from '../../common/rules';

const PROFILE_KEY = 'profile.json';

const router = Router();

router.get('/user', middleware.user(), (req, res) => res.json(req.user ?? {}));

router.get('/profile', middleware.user(), async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const { user } = await authService.getUser(req.user.did);
  if (!user.didSpace.endpoint) {
    return res.status(404).send('DID Spaces endpoint does not exist');
  }

  const spaceClient = new SpaceClient({ wallet, endpoint: user.didSpace.endpoint });
  try {
    const { data } = await spaceClient.send(new GetObjectCommand({ key: PROFILE_KEY }));
    return res.json(JSON.parse(await streamToString(data)));
  } catch (error) {
    if (error.message.includes('404')) {
      // first time, set default profile
      const defaultProfile: Profile = {
        username: 'test',
        email: 'test@test.com',
        phone: '1234567890',
      };

      await spaceClient.send(new PutObjectCommand({ key: PROFILE_KEY, data: JSON.stringify(defaultProfile) }));
      return res.json(defaultProfile);
    }

    console.error(error);
    return res.status(400).send(error.message);
  }
});

router.put('/profile', middleware.user(), async (req, res) => {
  // validate
  for (const [key, regex] of Object.entries(rules)) {
    if (!regex.test(req.body[key])) {
      return res.status(400).send(`Invalid ${key}`);
    }
  }

  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const { user } = await authService.getUser(req.user.did);
  if (!user.didSpace.endpoint) {
    return res.status(404).send('DID Spaces endpoint does not exist');
  }

  const spaceClient = new SpaceClient({ wallet, endpoint: user.didSpace.endpoint });
  await spaceClient.send(new PutObjectCommand({ key: PROFILE_KEY, data: JSON.stringify(req.body) }));

  return res.send();
});

export default router;
