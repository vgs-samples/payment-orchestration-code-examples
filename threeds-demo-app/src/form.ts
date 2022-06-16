export const createForm = (
  container: HTMLElement,
  action: string,
  target: string,
  params: Record<string, string>
): HTMLFormElement => {
  const form = document.createElement("form");
  form.action = action;
  form.target = target;
  form.method = "POST";
  form.style.display = "none";
  for (const [name, value] of Object.entries(params)) {
    const input = document.createElement("input");
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  container.appendChild(form);
  return form;
};
