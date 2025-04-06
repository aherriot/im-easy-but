import { i } from "@instantdb/react";

const schema = i.schema({
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
});

export default schema;
