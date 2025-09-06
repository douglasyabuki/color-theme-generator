export const downloadFile = (
  blobParts: BlobPart[],
  blobOptions: BlobPropertyBag,
  filename: string,
): void => {
  const blob = new Blob(blobParts, blobOptions);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
