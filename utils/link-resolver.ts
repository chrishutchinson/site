export const linkResolver = (doc: { type: string; uid: string }) => {
  if (doc.type === "post") {
    return `/journal/entry/${doc.uid}`;
  }

  // Backup for all other types
  return "/";
};
