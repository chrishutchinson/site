export const linkResolver = (doc: { type: string; uid: string }) => {
  return `/journal/entry/${doc.uid}`;
};
