import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    groups: i.entity({
      name: i.string(),
      createdAt: i.date(),
    }),
    members: i.entity({
      name: i.string(),
      createdAt: i.date(),
      restrictions: i.json(),
      cuisines: i.json(),
      price: i.json(),
    }),
  },
  links: {
    groupMembers: {
      forward: { on: "members", has: "one", label: "group" },
      reverse: { on: "groups", has: "many", label: "groupMembers" },
    },
  },
  rooms: {
    groups: {
      name: i.string(),
      createdAt: i.date(),
      presence: i.entity({
        name: i.string(),
        createdAt: i.date(),
        restrictions: i.json(),
        cuisines: i.json(),
        price: i.json(),
      }),
    },
  },
});

// This helps Typescript display better intellisense
type _AppSchema = typeof _schema;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
