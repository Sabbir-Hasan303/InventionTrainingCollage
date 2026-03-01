tippy(".hotspot", {
    trigger: "click",
    arrow: true,
    maxWidth: "300px",
    theme: "honeybee",
    appendTo: document.body,
    content(reference) {
      const id = reference.getAttribute("data-template");
      const template = document.getElementById(id);
      return template.innerHTML;
    }
  });
