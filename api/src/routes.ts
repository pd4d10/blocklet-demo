import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { GetObjectCommand, PutObjectCommand, SpaceClient } from '@did-space/client';
import { streamToString } from '@did-space/core';
import { authService, wallet } from './libs/auth';

const PROFILE_KEY = 'profile.json';

const router = Router();

router.get('/user', middleware.user(), (req, res) => res.json(req.user ?? {}));

router.get('/profile', middleware.user(), async (req, res) => {
  const { user } = await authService.getUser(req.user!.did);
  if (!user.didSpace.endpoint) {
    return res.status(404).send('DID Spaces endpoint does not exist. Log in again to complete the authorization');
  }

  const spaceClient = new SpaceClient({ wallet, endpoint: user.didSpace.endpoint });
  try {
    const { data } = await spaceClient.send(new GetObjectCommand({ key: PROFILE_KEY }));
    return res.json({ profile: JSON.parse(await streamToString(data)) });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
});

router.put('/profile', middleware.user(), async (req, res) => {
  const { user } = await authService.getUser(req.user!.did);
  if (!user.didSpace.endpoint) {
    return res.status(404).send('DID Spaces endpoint does not exist. Log in again to complete the authorization');
  }

  const spaceClient = new SpaceClient({ wallet, endpoint: user.didSpace.endpoint });
  await spaceClient.send(new PutObjectCommand({ key: PROFILE_KEY, data: JSON.stringify(req.body.profile) }));

  return res.send();
});

export default router;
