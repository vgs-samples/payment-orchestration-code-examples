export const createIframe = (
  container: HTMLElement,
  name: string,
  callback: () => void
): HTMLIFrameElement => {
  const iframe = document.createElement("iframe");
  iframe.name = name;
  iframe.onload = callback;
  container.appendChild(iframe);
  return iframe;
};
