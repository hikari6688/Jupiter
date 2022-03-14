import { lazy } from 'react';
const Org = lazy(() => import('../views/auth/org/index'));
const OrgUpdate = lazy(() => import('../views/auth/org/update/index'));
const OrgAdd = lazy(() => import('../views/auth/org/add/index'));
const Role = lazy(() => import('../views/auth/role/index'));
const App = lazy(() => import('../views/system/app/index'));
export const ComponentsMap: Object = {
  Org: Org,
  OrgAdd: OrgAdd,
  OrgUpdate: OrgUpdate,
  Role: Role,
  App: App,
};
