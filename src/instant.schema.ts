import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    groups: i.entity({
      name: i.string(),
      ownerId: i.string(),
      geoId: i.string(),
      createdAt: i.date(),
    }),
    restrictions: i.entity({
      // The ID of the guest this restriction belongs to
      guestId: i.string(),
      // The type of restriction: cuisine, dietary, or price
      restrictionType: i.string<"cuisine" | "diet" | "price">(),
      /**
       * The ID of the entity the restriction applies to.
       * Either a specific cuisine, dietary restriction, or price range
       * */
      referenceId: i.string(),
    }),
  },
  links: {
    groupRestrictions: {
      forward: { on: "restrictions", has: "one", label: "group" },
      reverse: { on: "groups", has: "many", label: "restrictions" },
    },
  },
  rooms: {
    group: {
      presence: i.entity({
        name: i.string(),
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
