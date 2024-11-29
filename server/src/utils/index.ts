export function convertBase64(buffer: Buffer, mimetype: string): string {
  if (!buffer || !mimetype) {
    throw new Error(
      "Buffer and MIME type are required to create a Base64 string."
    );
  }

  const base64String = buffer.toString("base64");

  return `data:${mimetype};base64,${base64String}`;
}
